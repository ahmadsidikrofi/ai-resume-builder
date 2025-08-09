import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { educationSchema } from "@/lib/validated";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const EducationForm = ({ resumeData, setResumeData }) => {
    const form = useForm({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            educations: resumeData.educations || []
        }
    })

    // useEffect(() => {
    //     const { unsubscribe } = form.watch(async (values) => {
    //         const isValid = await form.trigger();
    //         if (!isValid) return;
    //         setResumeData({
    //             ...resumeData,
    //             educations: values.educations?.filter((edu) => edu !== undefined) || [],
    //         });
    //     });
    //     return unsubscribe;
    // }, [form, resumeData, setResumeData]);

    const debounce = (func, delay) => {
        let timeoutId
        const debounced = (...args) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => func(...args), delay)
        }
        debounced.cancel = () => clearTimeout(timeoutId)
        return debounced
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSetResumeData = useCallback(
        debounce((data) => {
            setResumeData(prevData => ({
                ...prevData,
                educations: data.educations?.filter((exp) => exp !== undefined) || []
            }))
        }, 600),
        [setResumeData]
    )
    useEffect(() => {
        const subscription = form.watch(async (values) => {
            const isValid = await form.trigger()
            if (!isValid) return
            
            debouncedSetResumeData(values)
        })
        
        return () => {
            subscription.unsubscribe()
            debouncedSetResumeData.cancel()
        }
    }, [form, debouncedSetResumeData])

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "educations"
    })
    
    const EducationItem = ({ index, form, remove }) => {
        return (
            <div className="border space-y-3 bg-background rounded-md p-3">
                <div className="flex justify-between">
                    <span className="font-semibold">Education {index + 1}</span>
                    <GripHorizontal className="size-5 cursor-grab text-green-500" />
                </div>

                <FormField
                    control={form.control}
                    name={`educations.${index}.degree`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Degree</FormLabel>
                            <FormControl>
                                <Input {...field} autoFocus />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`educations.${index}.school`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>School</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name={`educations.${index}.startDate`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input {...field} type="date" value={field.value?.slice(0, 10)}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name={`educations.${index}.endDate`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input {...field} type="date" value={field.value?.slice(0, 10)}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="button" variant="destructive" onClick={() => remove(index)}>Remove</Button>
            </div>
        )
    }
    return ( 
        <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-1.5 text-center">
                <h1 className="text-2xl font-semibold">Education</h1>
                <p className="text-sm text-muted-foreground">Add as many education ass you like</p>
            </div>
            <Form {...form}>
                <form className="space-y-5">
                    {fields.map((field, i) => (
                        <EducationItem key={field.id} 
                            index={i}
                            form={form}
                            remove={remove}
                        />
                    ))}
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            onClick={() => {
                                append({
                                    degree: "",
                                    school: "",
                                    startDate: "",
                                    endDate: ""
                                })
                            }}
                        >
                            Add Education
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
 
export default EducationForm;