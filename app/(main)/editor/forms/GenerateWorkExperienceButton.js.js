import { Button } from "@/components/ui/button";
import { generateWorkExperience } from "@/lib/server/generateAIActions";
import { generateWorkExperienceSchema } from "@/lib/validated";
import { zodResolver } from "@hookform/resolvers/zod";
import { SparklesIcon, WandSparklesIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/LoadingButton";
import usePremiumModal from "@/app/hooks/usePremiumModal";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import { canUseAITools } from "@/lib/permissions";
import { toast } from "sonner";


const InputDialog = ({ open, onOpenChange, onWorkExperienceGenerated }) => {
  const form = useForm({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  })

  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const onSubmit = async (input) => {
    try {
      const aiResponse = await generateWorkExperience(input)
      onWorkExperienceGenerated(aiResponse)
    } catch (error) {
      console.log(error)
      toast("Something went wrong", {
        description: "There is something not right here, let's check it out",
        style: { background: "#fca5a5" },
        icon: <X />,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            Generate Work Experience
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Describe this work experience and the AI will generate an optimized entry for you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-violet-600 font-semibold text-base">
                  <div className={`transition-all duration-300 ${setIsFocused ? "animate-pulse" : ""}`}>
                    <SparklesIcon className="w-5 h-5" />
                  </div>
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={`E.g. "From Nov 2019 to Dec 2020 I worked at Google as a Software Engineer, tasks were: improving backend APIs, reducing latency, and collaborating with cross-functional teams."`}
                    autoFocus
                    onFocus={() => setIsFocused(true)}
                    className="min-h-[160px] rounded-xl border-2 border-slate-200 bg-white/80 shadow-sm px-4 py-3 text-sm resize-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-400 focus:shadow-md focus:bg-white"
                  />
                </FormControl>
                <div className="flex items-start gap-2 mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">💡</span>
                  </div>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    <span className="font-semibold">Pro tip:</span> Include timeframe, role, main tasks, and
                    achievements for best results. The more specific you are, the better the AI-generated content will
                    be.
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            type="submit"
            isLoading={form.formState.isSubmitting}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => setIsClicked(false)}
            className={`w-full mt-6 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white 
                       rounded-2xl shadow-lg font-semibold py-3 text-base
                       relative overflow-hidden group transition-all duration-300
                       ${isHovered ? "shadow-2xl shadow-violet-500/25 scale-[1.02] from-violet-600 via-purple-600 to-pink-600" : ""}
                       ${isClicked ? "scale-[0.98]" : ""}
                       hover:shadow-xl active:scale-[0.98]`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                           transition-all duration-500 ${isHovered ? "translate-x-full" : "-translate-x-full"}`}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r from-violet-400/20 to-pink-400/20 
                           transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
            />
            <div className="relative flex items-center justify-center">
              <SparklesIcon
                className={`mr-2 w-5 h-5 transition-all duration-300 
                                      ${isHovered ? "animate-spin scale-110" : ""}
                                      ${form.formState.isSubmitting ? "animate-pulse" : ""}`}
              />
              <span className={`transition-all duration-200 ${isClicked ? "scale-95" : ""}`}>Generate</span>
              {isHovered && (
                <>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping opacity-75" />
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-50 animation-delay-150" />
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full animate-bounce opacity-60 animation-delay-300" />
                </>
              )}
            </div>
          </LoadingButton>
        </form>
      </DialogContent>
    </Dialog>
  )
}
const GenerateWorkExperienceButton = ({ onWorkExperienceGenerated }) => {
    const [showInputDialog, setShowInputDialog] = useState(false)
    const premiumModal = usePremiumModal()
    const subscriptionLevel = useSubscriptionLevel()

    return (
        <>
            <Button
                variant="outline"
                type="button"
                // Block for non-premium users
                onClick={() => {
                  if (!canUseAITools(subscriptionLevel)) {
                    premiumModal.setOpen(true)
                  }
                  setShowInputDialog(prev => !prev)
                }}
            >
                <WandSparklesIcon className="size-5"/>
                Smart fill (AI)
            </Button>
            <InputDialog 
                open={showInputDialog}
                onOpenChange={setShowInputDialog}
                onWorkExperienceGenerated={(workExperience) => {
                    onWorkExperienceGenerated(workExperience)
                    setShowInputDialog(false)
                }}
            />
        </>
    );
}

export default GenerateWorkExperienceButton;