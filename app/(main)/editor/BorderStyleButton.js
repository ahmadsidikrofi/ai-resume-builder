import usePremiumModal from "@/app/hooks/usePremiumModal";
import { Button } from "@/components/ui/button";
import { Squircle, Square, Circle } from "lucide-react";
import { useSubscriptionLevel } from "../SubscriptionLevelProvider";
import { canUseCustomizationTools } from "@/lib/permissions";

export const BorderStyles = {
    SQUARE: 'square',
    CIRCLE: 'circle',
    SQUIRCLE: 'squircle'
}

const borderStyles = Object.values(BorderStyles)

const BorderStyleButton = ({ borderStyle, onChange }) => {
    const premiumModal = usePremiumModal()
    const subscriptionLevel = useSubscriptionLevel()
    
    const handleClick = () => {
        const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0
        const nextIndex = (currentIndex + 1) % borderStyles.length
        onChange(borderStyles[nextIndex])
    }

    const Icon = borderStyle === "square" ? 
    Square : borderStyle === "circle" ?
    Circle : Squircle

    return ( 
        <Button
            variant="outline"
            size="icon"
            title="Change border style"
            onClick={() => {
                // Block for non premium users
                if (!canUseCustomizationTools(subscriptionLevel)) {
                    premiumModal.setOpen(true)
                    return
                }
                handleClick
            }}
            className="dark:bg-black dark:hover:bg-dark"
        >
            <Icon className="size-5 dark:text-white dark:hover:text-dark"/>
        </Button>
    );
}
 
export default BorderStyleButton;