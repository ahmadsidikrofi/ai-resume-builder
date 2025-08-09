import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { PaletteIcon } from "lucide-react";
import { useState } from "react";

const ColorPicker = ({ color, onChange }) => {
    const [showPopover, setShowPopover] = useState(false)
    return (
        <Popover open={showPopover} onOpenChange={setShowPopover}>      
            <PopoverTrigger asChild>
                <Button>
                    <PaletteIcon className="size-5"/>
                </Button>
            </PopoverTrigger>
        </Popover>
    );
}
 
export default ColorPicker;