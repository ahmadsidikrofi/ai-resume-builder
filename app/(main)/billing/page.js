import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import GetSubscriptionButton from "./GetSubscriptionButton";
import { formatDate } from "date-fns";
import ManageSubscriptionButton from "./ManageSubscriptionButton";

const Page = async () => {
    const { userId  } = await auth()
    if (!userId) {
        return null
    }

    const subscription = await prisma.userSubscription.findUnique({
        where: { userId }
    })

    const priceInfo = subscription ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"]
    }) : null

    return ( 
        <div className="max-w-7xl space-y-6 px-3 py-6 mx-auto w-full">
            <h1 className="text-2xl font-bold">Billing</h1>
            <p>
                Your current plan: {" "}
                <span className="font-semibold">{priceInfo ? priceInfo.product.name : "Free"}</span>
            </p>
            {subscription ? (
                <> 
                    {subscription.stripeCancelAtPeriodEnd && (
                        <p className="text-destructive">
                            Your subscription will be canceled on {" "}
                            {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
                        </p>
                    )}
                    <ManageSubscriptionButton />
                </>
            ) : (
                <GetSubscriptionButton />
            )}
        </div>
    );
}
 
export default Page;