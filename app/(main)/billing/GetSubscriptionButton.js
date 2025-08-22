'use client'

import usePremiumModal from "@/app/hooks/usePremiumModal";
import { Button } from "@/components/ui/button";

const GetSubscriptionButton = () => {
    const premiumModal = usePremiumModal()
    return ( 
        <Button onClick={() => premiumModal.setOpen(true)}>
            Get Premium Subscription
        </Button>
    );
}
 
export default GetSubscriptionButton;