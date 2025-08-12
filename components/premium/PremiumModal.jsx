"use client"

import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import usePremiumModal from "@/app/hooks/usePremiumModal";

const PremiumModal = () => {
    const premiumFeatures = ["AI tools", "Up to 3 resumes"]
    const premiumPlusFeatures = ["Infinite resumes", "Design customization"]
    const {open, setOpen} = usePremiumModal()

    return (
      <Dialog open={open} onOpenChange={setOpen}>
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
                    <li key={premium} className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      {premium}
                    </li>
                  ))}
                </ul>
                <Button className="bg-slate-800">Get Premium</Button>
              </div>
              <div className="border-l border-2 border-green-400 mx-6" />
              <div className="flex flex-col w-1/2 space-y-5">
                <h3 className="text-center text-lg font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  Premium Plus
                </h3>
                <ul className="list-inside space-y-2">
                  {premiumPlusFeatures.map((premiumPlus) => (
                    <li key={premiumPlus} className="flex items-center gap-2">
                      <Check className="size-4 text-green-500" />
                      {premiumPlus}
                    </li>
                  ))}
                </ul>
                <Button variant="premium">Get Premium Plus</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
}
 
export default PremiumModal;