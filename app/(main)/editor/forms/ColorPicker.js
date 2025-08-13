import usePremiumModal from "@/app/hooks/usePremiumModal";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import { TwitterPicker } from "react-color";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import { canUseCustomizationTools } from "@/lib/permissions";

const ColorPicker = ({ color, onChange }) => {
    const [showPopover, setShowPopover] = useState(false)
    const premiumModal = usePremiumModal()
    const subscriptionLevel = useSubscriptionLevel()
    return (
        <Popover open={showPopover} onOpenChange={setShowPopover}>      
            <PopoverTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                    title="Change resume color"
                    onClick={() => {
                        // Block for non premium users
                        // Jika tidak diberi return, maka kode setelah if akan tetap dijalankan
                        // Jika diberi return, maka kode setelah if tidak akan dijalankan jika kondisi if terpenuhi
                        if (!canUseCustomizationTools(subscriptionLevel)) {
                            premiumModal.setOpen(true)
                            return
                        }
                        setShowPopover(true)
                    }}
                    className="dark:bg-black dark:hover:bg-dark"
                >
                    <PaletteIcon className="size-5 dark:text-white dark:hover:text-white"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="border-none bg-transparent shadow-none" align="end">
                <TwitterPicker 
                    color={color} onChange={onChange} triangle="top-right"
                />
            </PopoverContent>
        </Popover>
    );
}
 
export default ColorPicker;