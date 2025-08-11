import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const LoadingButton = ({ isLoading, disabled, className, ...props }) => {
    return ( 
        <Button
            disabled={isLoading || disabled}
            className={cn("flex items-center gap-2 w-fit", className)}
            {...props}
        >
            {isLoading && <Loader2 className="size-5 animate-spin"/>}
            {props.children}
        </Button>
     );
}
 
export default LoadingButton;