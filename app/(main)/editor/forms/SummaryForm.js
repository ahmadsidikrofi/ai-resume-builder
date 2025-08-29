import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { summarySchema } from "@/lib/validated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GenerateSummaryButton from "./GenerateSummaryButton";

const SummaryForm = ({ resumeData, setResumeData }) => {
    const form = useForm({
        resolver: zodResolver(summarySchema),
        defaultValues: {
            summary: resumeData.summary || ""
        }
    })

    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)  

    useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
            const isValid = await form.trigger()
            if (!isValid) return
            setResumeData({...resumeData, ...values})
        })
        return unsubscribe
    }, [form, resumeData, setResumeData])

    return ( 
        <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="font-semibold text-2xl">Professional Summary</h2>
                <p className="text-sm text-muted-foreground">Write a short introduction for your resume or let the AI generate one from you entered data.</p>
            </div>
            <Form {...form}>
                <form>
                    <FormField 
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sr-only">Professional Summary</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Textarea
                                            {...field}
                                            className={`border-2 resize-y border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm transition-all duration-300 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-100/50 focus:bg-white ${isFocused ? "pt-8" : "pt-12"} pb-3 px-4`}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                setHasValue(!!e.target.value)
                                            }}
                                        />
                                        <label
                                            className={`absolute left-4 transition-all duration-300 pointer-events-none text-gray-500 ${isFocused || hasValue ? "top-2 text-xs text-purple-600 font-medium" : "top-4 text-base"}`}
                                        >
                                            A brief, engaging text about yourself
                                        </label>
                                    </div>
                                </FormControl>
                                <FormMessage />
                                <GenerateSummaryButton
                                    resumeData={resumeData}
                                    onSummaryGenerated={(summary) => {
                                        form.setValue("summary", summary)
                                        setHasValue(!!summary)
                                    }}
                                />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}
 
export default SummaryForm;