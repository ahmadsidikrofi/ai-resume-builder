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


const InputDialog = ({ open, onOpenChange, onWorkExperienceGenerated }) => {
    const form = useForm({
        resolver: zodResolver(generateWorkExperienceSchema),
        defaultValues: {
            description: ""
        }
    })

    const onSubmit = async(input) => {
        try {
            const aiResponse = await generateWorkExperience(input)
            onWorkExperienceGenerated(aiResponse)
        } catch (error) {
            console.log(error)
            toast("Something went wrong", {
                description: "There is something not right here, let's check it out",
                style: {background: "#fca5a5" },
                icon: <X />
            })
        }
    }
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Work Experience</DialogTitle>
            <DialogDescription>
              Describe this work experience and the AI will generate an
              optimized entry for you.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={`E.g. "From nov 2019 to dec 2020 I worked at Google as a Software Engineer, task were: ..."`}
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton
                type="submit"
                isLoading={form.formState.isSubmitting}
              >
                <SparklesIcon /> Generate
              </LoadingButton>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
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
                  setShowInputDialog()
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