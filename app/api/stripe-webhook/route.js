import stripe from "@/lib/stripe"
import { env } from "@/env"
import { clerkClient } from "@clerk/nextjs/server"

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

async function handleSessionComplete(session) { // Stripe.Checkout.Session
    const userId = session.metadata?.userId
    if (!userId) {
        throw new Error("User ID is missing in session metadata")
    }

    await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
            stripeCustomerId: session.customer
        }
    })
}

async function handleSubscriptionCreatedOrUpdated(subscriptionId) { // string
    console.log("handleSubscriptionCreatedOrUpdated");
}

async function handleSubscriptionDeleted(subscription) { // Stripe.Subscription
    console.log("handleSubscriptionDeleted");
}