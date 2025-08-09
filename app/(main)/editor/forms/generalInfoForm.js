import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { generalInfoSchema } from "@/lib/validated";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

const GeneralInfoForm = ({ resumeData, setResumeData }) => {
    const form = useForm({
        resolver: zodResolver(generalInfoSchema),
        defaultValues: {
            title: resumeData.title || "",
            description: resumeData.description || ""
        }
    })

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
                <h1 className="font-semibold text-2xl">General Info</h1>
                <p className="text-sm text-muted-foreground">This will not appear on your resume</p>
            </div>
            <Form {...form}>
                <form className="space-y-5">
                    <FormField 
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Project name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="My cool resume" autoFocus />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Project description</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="A resume for my next job" autoFocus />
                                </FormControl>
                                <FormDescription>
                                    Describe what this resume is for.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}
 
export default GeneralInfoForm;