'use client'

import usePremiumModal from "@/app/hooks/usePremiumModal";
import { Button } from "@/components/ui/button";

const GetSubscriptionButton = () => {
    const premiumModal = usePremiumModal()
    return (
        <Button onClick={() => premiumModal.setOpen(true)}
            className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-colors duration-500"
        >
            Get Premium Subscription
        </Button>
    );
}
 
export default GetSubscriptionButton;