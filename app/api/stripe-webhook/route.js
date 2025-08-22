import stripe from "@/lib/stripe"
import { env } from "@/env"
import { clerkClient } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

export async function POST(req) {
    try {
        const payload = await req.text()
        const signature = req.headers.get('stripe-signature')
        if (!signature) {
            return new Response(`Signature is missing`, { status: 400 })
        }

        const event = stripe.webhooks.constructEvent(payload, signature, env.STRIPE_WEBHOOK_SECRET)
        console.log(`Received Event: ${event.type}`, event.data.object);

        switch (event.type) {
            case "checkout.session.completed":
                await handleSessionComplete(event.data.object)
                break
            case "customer.subscription.created":
            case "customer.subscription.updated":
                await handleSubscriptionCreatedOrUpdated(event.data.object.id)
                break
            case "customer.subscription.deleted":
                await handleSubscriptionDeleted(event.data.object)
                break
            default:
                console.log("Unhandled event type: ", event.type);
                break
        }

        return new Response("Event received", { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response(`Internal server error: ${error.message}`, { status: 500 })
    }
}

// Helper untuk menghitung current period end jika Stripe tidak menyediakannya
function computeSubscriptionPeriodEndUnix(subscription) {
    if (subscription.current_period_end) {
        return subscription.current_period_end
    }

    // Ambil anchor/start sebagai basis
    const baseUnix = subscription.billing_cycle_anchor || subscription.start_date || subscription.created
    if (!baseUnix) {
        return Math.floor(Date.now() / 1000)
    }

    // Tentukan interval dan count dari price atau plan (legacy)
    const priceRecurring = subscription.items?.data?.[0]?.price?.recurring
    const interval = priceRecurring?.interval || subscription.plan?.interval || "month"
    const intervalCount = priceRecurring?.interval_count || subscription.plan?.interval_count || 1

    const baseDate = new Date(baseUnix * 1000)
    switch (interval) {
        case "day":
            baseDate.setUTCDate(baseDate.getUTCDate() + intervalCount)
            break
        case "week":
            baseDate.setUTCDate(baseDate.getUTCDate() + (7 * intervalCount))
            break
        case "month":
            baseDate.setUTCMonth(baseDate.getUTCMonth() + intervalCount)
            break
        case "year":
            baseDate.setUTCFullYear(baseDate.getUTCFullYear() + intervalCount)
            break
        default:
            baseDate.setUTCMonth(baseDate.getUTCMonth() + intervalCount)
            break
    }

    return Math.floor(baseDate.getTime() / 1000)
}

async function handleSessionComplete(session) { // Stripe.Checkout.Session
    const userId = session.metadata?.userId
    if (!userId) {
        throw new Error("User ID is missing in session metadata")
    }

    await (await clerkClient()).users.updateUserMetadata(userId, {
        privateMetadata: {
            stripeCustomerId: session.customer
        }
    })
}

async function handleSubscriptionCreatedOrUpdated(subscriptionId) { // string
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    if (subscription.status === "active" || subscription.status === "trialing" || subscription.status === "past_due") {
        const periodEndUnix = computeSubscriptionPeriodEndUnix(subscription)
        const priceId = subscription.items?.data?.[0]?.price?.id || subscription.plan?.id || subscription.plan?.id
        // Pastikan userId selalu ada: metadata atau fallback melalui cus?tomer
        const metadataUserId = subscription.metadata?.userId
        const existingByCustomer = await prisma.userSubscription.findFirst({
            where: { stripeCustomerId: subscription.customer }
        })
        const userId = metadataUserId || existingByCustomer?.userId
        if (!userId) {
            throw new Error("Cannot resolve userId for subscription update")
        }
        await prisma.userSubscription.upsert({
            where: { userId },
            create: {
                userId,
                stripeCustomerId: subscription.customer,
                stripeSubscriptionId: subscription.id,
                stripePriceId: priceId,
                stripeCurrentPeriodEnd: new Date(periodEndUnix * 1000),
                stripeCancelAtPeriodEnd: Boolean(subscription.cancel_at_period_end)
            },
            update: {
                stripePriceId: priceId,
                stripeCurrentPeriodEnd: new Date(periodEndUnix * 1000),
                stripeCancelAtPeriodEnd: Boolean(subscription.cancel_at_period_end)
            }
        })
    } else {
        await prisma.userSubscription.deleteMany({
            where: { stripeCustomerId: subscription.customer }
        })
    }
}

async function handleSubscriptionDeleted(subscription) { // Stripe.Subscription
    await prisma.userSubscription.deleteMany({
        where: {
            stripeCustomerId: subscription.customer
        }
    })
}