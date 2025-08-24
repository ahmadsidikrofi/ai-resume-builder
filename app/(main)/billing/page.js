import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import GetSubscriptionButton from "./GetSubscriptionButton";
import { formatDate } from "date-fns";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bot, Calendar, CheckCircle, CreditCard, Crown } from "lucide-react";

const Page = async () => {
    const { userId } = await auth()
    if (!userId) {
        return null
    }

    const subscription = await prisma.userSubscription.findUnique({
        where: { userId }
    })

    const priceInfo = subscription ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"]
    }) : null

    const isActive = subscription && !subscription.stripeCancelAtPeriodEnd

    const typeOfPlan = priceInfo?.product?.name

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        Billing & Subscription
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Manage your subscription and billing information
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Current plan card */}
                    <Card className="relative overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full -translate-y-16 translate-x-16" />
                        <CardHeader className="relative">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                                    Current Plan
                                </CardTitle>
                                {priceInfo && (
                                    <Badge 
                                        className={`bg-gradient-to-r text-white border-0
                                            ${typeOfPlan === "Resumind Pro Plus Quarterly" ? 
                                                "from-rose-500 to-violet-500" : typeOfPlan === "Resumind Pro Quarterly" ? 
                                                "from-violet-700 to-blue-400" : "from-indigo-500 to-violet-500"
                                            }`
                                        }>
                                        <Crown className="w-3 h-3 mr-1" />
                                        {priceInfo ? priceInfo?.product.name : "Freemium"}
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="relative space-y-4">
                            <div className="flex items-center space-x-3">
                                <div 
                                    className={`w-12 h-12 bg-gradient-to-br 
                                        ${typeOfPlan === "Resumind Pro Plus Quarterly" ? 
                                            "from-rose-500 to-violet-500" : typeOfPlan === "Resumind Pro Quarterly" ? 
                                            "from-violet-700 to-blue-300" : "from-indigo-500 to-violet-500"
                                        } rounded-xl flex items-center justify-center`
                                    }
                                >
                                    <Crown className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                                        {priceInfo ? priceInfo.product.name : "Free Plan"}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {priceInfo
                                            ? "Premium features unlocked"
                                            : "Basic features only"}
                                    </p>
                                </div>
                            </div>

                            {subscription && (
                                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Renewal Date
                                        </span>
                                    </div>
                                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                                        {formatDate(
                                            subscription.stripeCurrentPeriodEnd,
                                            "MMMM dd, yyyy"
                                        )}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Status card */}
                    <Card className="relative overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full -translate-y-16 translate-x-16" />
                        <CardHeader className="relative">
                            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Subscription Status</CardTitle>
                        </CardHeader>
                        <CardContent className="relative space-y-4">
                            {subscription ? (
                                <>
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive
                                                    ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                                                    : "bg-gradient-to-br from-red-500 to-orange-500"
                                                }`}
                                        >
                                            {isActive ? (
                                                <CheckCircle className="w-6 h-6 text-white" />
                                            ) : (
                                                <AlertTriangle className="w-6 h-6 text-white" />
                                            )}
                                        </div>
                                        <div>
                                            <h3
                                                className={`font-semibold text-lg ${isActive ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
                                                    }`}
                                            >
                                                {isActive ? "Active" : "Canceling"}
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                {isActive ? "Your subscription is active" : "Subscription will end soon"}
                                            </p>
                                        </div>
                                    </div>

                                    {subscription.stripeCancelAtPeriodEnd && (
                                        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
                                            <div className="flex items-start space-x-3">
                                                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-red-800 dark:text-red-300 mb-1">Subscription Ending</h4>
                                                    <p className="text-sm text-red-700 dark:text-red-400">
                                                        Your subscription will be canceled on{" "}
                                                        <span className="font-semibold">
                                                            {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Crown className="w-8 h-8 text-slate-500 dark:text-slate-400" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">No Active Subscription</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Upgrade to unlock premium features</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 max-w-md mx-auto">
                    {subscription ? <ManageSubscriptionButton /> : <GetSubscriptionButton />}
                </div>
                {!subscription && (
                    <div className="mt-12 text-center">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Unlock Premium Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                            {[
                                { icon: Crown, title: "More Resumes", desc: "Create and design much more resumes" },
                                { icon: Bot, title: "AI-powered summary", desc: "Get AI to help you like professional" },
                                { icon: CreditCard, title: "Priority Support", desc: "Get help when you need it most" },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                                >
                                    <feature.icon className="w-8 h-8 text-violet-600 dark:text-violet-400 mx-auto mb-3" />
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* <div className="bg-white dark:bg-neutral-900 shadow-md rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 space-y-4">
                <h1 className="text-2xl font-bold mb-4">Billing</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your current plan:
                    <span className="ml-1 font-semibold text-violet-600 dark:text-violet-400">
                        {priceInfo ? priceInfo.product.name : "Free"}
                    </span>
                </p>

                {subscription && (
                    <>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Renewal Date:{" "}
                            <span className="font-medium">
                                {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
                            </span>
                        </p>

                        {subscription.stripeCancelAtPeriodEnd && (
                            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm">
                                Your subscription will be canceled on{" "}
                                <b>
                                    {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
                                </b>
                            </div>
                        )}
                    </>
                )}

                <div className="pt-4">
                    {subscription ? (
                        <ManageSubscriptionButton />
                    ) : (
                        <GetSubscriptionButton />
                    )}
                </div>
            </div> */}
        </div>
    );
}

export default Page;