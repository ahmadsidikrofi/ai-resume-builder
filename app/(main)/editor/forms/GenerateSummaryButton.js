import usePremiumModal from "@/app/hooks/usePremiumModal";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { generateSummary } from "@/lib/server/generateAIActions";
import { WandSparkles, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import { canUseAITools } from "@/lib/permissions";

const GenerateSummaryButton = ({resumeData, onSummaryGenerated}) => {
    const [isLoading, setIsLoading] = useState(false)
    const premiumModal = usePremiumModal()
    const subscriptionLevel = useSubscriptionLevel()

    const handleClick = async () => {
        // Block for non premium users
        if (!canUseAITools(subscriptionLevel)) {
            premiumModal.setOpen(true)
            return
        }
        try {
            setIsLoading(true)
            const aiResponse = await generateSummary(resumeData)
            onSummaryGenerated(aiResponse)
            
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
        <LoadingButton
            variant="outline"
            type="button"
            isLoading={isLoading}
            onClick={handleClick}
        >
            <WandSparkles className="size-4"/>
            Generate (AI)
        </LoadingButton>
     );
}
 
export default GenerateSummaryButton;