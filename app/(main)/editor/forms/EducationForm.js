import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { educationSchema } from "@/lib/validated";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useCallback, useEffect, useId } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils";

const EducationItem = ({ index, form, remove, id }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
    return (
        <div 
            className={cn("border space-y-3 bg-background rounded-md p-3", isDragging && "relative z-50 cursor-grab shadow-xl")}
            style={{ 
                transition,
                transform: CSS.Transform.toString(transform)
             }}
            ref={setNodeRef}
        >
            <div className="flex justify-between">
                <span className="font-semibold">Education {index + 1}</span>
                <GripHorizontal className="size-5 cursor-grab text-violet-500 focus:outline-none"
                    {...listeners}
                    {...attributes}
                />
            </div>

            <FormField
                control={form.control}
                name={`educations.${index}.degree`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                            <Input {...field} autoFocus value={field.value ?? ""} />
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
                            <Input {...field} value={field.value ?? ""} />
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

const EducationForm = ({ resumeData, setResumeData }) => {
    const id = useId()
    const form = useForm({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            educations: resumeData.educations || []
        }
    })

    useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
            const isValid = await form.trigger();
            if (!isValid) return;
            setResumeData({
                ...resumeData,
                educations: values.educations?.filter((edu) => edu !== undefined) || [],
            });
        });
        return unsubscribe;
    }, [form, resumeData, setResumeData]);

    const { fields, append, remove, move } = useFieldArray({
        control: form.control,
        name: "educations"
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
                <h1 className="text-2xl font-semibold">Education</h1>
                <p className="text-sm text-muted-foreground">Add as many education ass you like</p>
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
                            {fields.map((field, i) => (
                                <EducationItem key={field.id}
                                    id={field.id}
                                    index={i}
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