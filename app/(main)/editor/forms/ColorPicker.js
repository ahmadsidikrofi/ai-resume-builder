import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import { TwitterPicker } from "react-color";

const ColorPicker = ({ color, onChange }) => {
    const [showPopover, setShowPopover] = useState(false)
    return (
        <Popover open={showPopover} onOpenChange={setShowPopover}>      
            <PopoverTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                    title="Change resume color"
                    onClick={() => setShowPopover(true)}
                >
                    <PaletteIcon className="size-5"/>
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