'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { workExperienceSchema } from "@/lib/validated";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal, Trash2 } from "lucide-react";
import { useEffect, useId } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CSS } from "@dnd-kit/utilities"
import GenerateWorkExperienceButton from "./GenerateWorkExperienceButton.js";

// Pindahkan WorkExperienceItem ke luar komponen utama untuk mencegah re-creation
const WorkExperienceItem = ({ index, form, remove, id }) => {
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({ id })
    return (
        <div 
            className={`border space-y-3 rounded-md p-3 bg-background ${isDragging && 'relative z-50 shadow-xl cursor-grab'}`}
            ref={setNodeRef}
            style={{ 
                transform: CSS.Transform.toString(transform),
                transition
             }}
        >
            <div className="flex justify-between">
                <span className="font-semibold">Work Experience {index + 1}</span>
                <GripHorizontal className="size-5 cursor-grab active:cursor-grabbing  text-violet-500 focus:outline-none" 
                    {...listeners}
                    {...attributes}
                />
            </div>
             <div className="flex justify-center my-3">
                <GenerateWorkExperienceButton 
                    onWorkExperienceGenerated={(exp) => 
                        form.setValue(`workExperiences.${index}`, exp)
                    }
                />
             </div>

            <FormField 
                control={form.control}
                name={`workExperiences.${index}.position`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Job title</FormLabel>
                        <FormControl>
                            <Input {...field} autoFocus />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`workExperiences.${index}.company`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Company</FormLabel>
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
                    name={`workExperiences.${index}.startDate`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start date</FormLabel>
                            <FormControl>
                                <Input {...field} type="date" value={field.value?.slice(0, 10)}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name={`workExperiences.${index}.endDate`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End date</FormLabel>
                            <FormControl>
                                <Input {...field} type="date" value={field.value?.slice(0, 10)}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <FormDescription>Leave <span className="font-bold">end date</span>  empty if you are currently working here</FormDescription>
            <FormField
                control={form.control}
                name={`workExperiences.${index}.description`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="button" size="sm" variant="destructive" onClick={() => remove(index)}>
                <Trash2 />
                Remove
            </Button>
        </div>
    )
}

const WorkExperienceForm = ({ resumeData, setResumeData }) => {
    const id = useId()
    const form = useForm({
        resolver: zodResolver(workExperienceSchema),
        defaultValues: {
            workExperiences: resumeData.workExperiences || []
        }
    })

    useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
            const isValid = await form.trigger()
            if (!isValid) return
            setResumeData({
                ...resumeData,
                workExperiences: values.workExperiences?.filter((exp) => exp !== undefined) || []
            })
        })
        return unsubscribe
    }, [form, resumeData, setResumeData])

    const { fields, append, remove, move } = useFieldArray({
        control: form.control,
        name: "workExperiences"
    })

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    const handleDragEnd = (event) => {
        const { active, over } = event
        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((field) => field.id === active.id)
            const newIndex = fields.findIndex((field) => field.id === over.id)
            move(oldIndex, newIndex)
            return arrayMove(fields, oldIndex, newIndex)
        }
    }

    return (  
        <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-1.5 text-center">
                <h1 className="text-2xl font-semibold">Work Experiences</h1>
                <p className="text-sm text-muted-foreground">Add as many work experiences ass you like</p>
            </div>
            <Form {...form}>
                <form className="space-y-5">
                    <DndContext
                        id={id}
                        sensors={sensors}
                        onDragEnd={handleDragEnd}
                        collisionDetection={closestCenter}
                        modifiers={[restrictToVerticalAxis]}
                    >
                        <SortableContext
                            items={fields}
                            strategy={verticalListSortingStrategy}
                        >
                            {fields.map((field, index) => (
                                <WorkExperienceItem key={field.id} 
                                    id={field.id}
                                    index={index}
                                    form={form}
                                    remove={remove}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            onClick={() => {
                                append({
                                    position: "",
                                    company: "",
                                    description: "",
                                    startDate: "",
                                    endDate: ""
                                })
                            }}
                        >Add work experience</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
 
export default WorkExperienceForm;