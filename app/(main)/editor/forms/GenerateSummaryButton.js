import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { generateSummary } from "@/lib/server/generateAIActions";
import { WandSparkles, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const GenerateSummaryButton = ({resumeData, onSummaryGenerated}) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        // Block for non premium users

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