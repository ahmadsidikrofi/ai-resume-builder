import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import { FileUserIcon, Loader2, PencilLine } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = ({ 
    currentStep, 
    setCurrentStep, 
    showSmallResumePreview, 
    setShowSmallResumePreview,
    isSaving
}) => {
    const previousStep = steps.find(
        (_, index) => steps[index + 1]?.key === currentStep
    )?.key

    const nextStep = steps.find(
        (_,index) => steps[index - 1]?.key === currentStep
    )?.key

    return (
        <footer className="border-t px-3 py-5 w-full">
            <div className="flex max-w-7xl mx-auto flex-wrap justify-between items-center">
                <div className="flex gap-3 items-start">
                    <Button variant="secondary" disabled={!previousStep}  onClick={previousStep ? () => setCurrentStep(previousStep) : undefined}>Previous step</Button>
                    <Button disabled={!nextStep} onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}>Next step</Button>
                    <Button variant="outline" size="icon" onClick={() => setShowSmallResumePreview(!showSmallResumePreview)} className="md:hidden"
                        title={showSmallResumePreview ? "Show input form" : "Show resume preview"}
                    >
                        {showSmallResumePreview ? <PencilLine /> : <FileUserIcon />}
                    </Button>
                </div>
                <div className="flex gap-3 items-center">
                    <Button asChild variant="secondary" className={cn({ 'translate-x-[-5px]': isSaving })}>
                        <Link href="/resumes">Cancel</Link>
                    </Button>
                    {isSaving ? (
                        <p className={cn("text-muted-foreground opacity-100 flex gap-2 items-center")}>
                            <span><Loader2 className="size-5 animate-spin"/></span>
                            <span className="">Saving...</span>
                        </p>
                    ) : ""}
                    {/* <p className={cn("text-muted-foreground opacity-0", isSaving && 'opacity-100')}>Saving...</p> */}
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;