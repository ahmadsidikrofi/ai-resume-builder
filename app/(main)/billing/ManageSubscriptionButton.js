'use client'

import LoadingButton from "@/components/LoadingButton";
import createCustomerPortalSession from "@/lib/server/billingAction";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ManageSubscriptionButton = () => {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        try {
            setIsLoading(true)
            const redirectUrl = await createCustomerPortalSession()
            window.location.href = redirectUrl
        } catch (error) {
            console.log(error);
            toast("Something went wrong", {
                description: "There is something not right here, let's check it out",
                style: {background: "#fca5a5" },
                icon: <X />
            })    
        } finally {
            setIsLoading(false)
        }
    }
    return ( 
        <LoadingButton isLoading={isLoading} onClick={handleClick}>
            Manage Subscription
        </LoadingButton>
     );
}
 
export default ManageSubscriptionButton;