import { cache } from "react";
import prisma from "./prisma";
import { env } from "@/env";

export const getUserSubscriptionLevel = cache(async (userId) => {
    const subscription = await prisma.userSubscription.findUnique({
        where: { userId }
    })

    if (!subscription || subscription.stripeCurrentPeriodEnd < new Date()) {
        return "free"
    }

    // Log untuk debugging
    console.log("Subscription found:", {
        userId,
        stripePriceId: subscription.stripePriceId,
        proPriceId: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
        proPlusPriceId: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY
    });

    if (subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY) {
        return "pro"
    }
    if (subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY) {
        return "pro_plus"
    }

    throw new Error("Invalid subscription")
})