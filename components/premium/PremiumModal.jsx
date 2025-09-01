"use client"

import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import usePremiumModal from "@/app/hooks/usePremiumModal";
import { useState } from "react";
import { createCheckoutSession } from "@/lib/server/checkoutAction";
import { env } from "@/env";

const PremiumModal = () => {
    const premiumFeatures = ["AI tools", "Up to 3 resumes"]
    const premiumPlusFeatures = ["Infinite resumes", "Design customization", "AI-powered summary"]
    const {open, setOpen} = usePremiumModal()
    const [loading, setLoading] = useState(false)

    const handlePremiumClick = async (priceId) => {
      try {
        setLoading(true)
        const redirectUrl = await createCheckoutSession(priceId)
        window.location.href = redirectUrl
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    return (
      <Dialog 
        open={open} 
        onOpenChange={(open) => {
          if (!loading) {
            setOpen(open)
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-semibold">
              Resume Builder AI Premium
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <p>Get a premium subscription to unlock more features.</p>
            <div className="flex">
              <div className="flex flex-col w-1/2 space-y-5">
                <h3 className="text-center text-lg font-bold">Premium</h3>
                <ul className="list-inside space-y-2">
                  {premiumFeatures.map((premium) => (
                    <li key={premium} className="flex items-center gap-2 text-nowrap max-sm:text-sm">
                      <Check className="size-4 text-violet-500" />
                      {premium}
                    </li>
                  ))}
                </ul>
                <Button
                  className="bg-slate-600 hover:bg-slate-900 mt-8"
                  onClick={() =>
                    handlePremiumClick(
                      env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
                    )
                  }
                  disabled={loading}
                >
                  Get Premium
                </Button>
              </div>
              <div className="border-l border-2 border-violet-400 mx-6" />
              <div className="flex flex-col w-1/2 space-y-5">
                <h3 className="text-center text-lg font-bold bg-gradient-to-r from-violet-600 to-blue-400 bg-clip-text text-transparent">
                  Premium Plus
                </h3>
                <ul className="list-inside space-y-2">
                  {premiumPlusFeatures.map((premiumPlus) => (
                    <li key={premiumPlus} className="flex items-center gap-2 text-nowrap max-sm:text-sm">
                      <Check className="size-4 text-violet-500" />
                      {premiumPlus}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="premium"
                  onClick={() =>
                    handlePremiumClick(
                      env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY
                    )
                  }
                  disabled={loading}
                >
                  Get Premium Plus
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
}
 
export default PremiumModal;