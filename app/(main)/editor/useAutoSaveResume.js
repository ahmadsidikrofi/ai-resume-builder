import useDebounce from "@/app/hooks/useDebounce";
import { saveResume } from "@/lib/server/resumeAction";
import { fileReplacer } from "@/lib/utils";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner"

const useAutoSaveResume = (resumeData) => {
    const searchParams = useSearchParams()
    const [resumeId, setResumeId] = useState(resumeData.id)

    const debounceResumeData = useDebounce(resumeData, 1500)
    const [lastSavedData, setLastSavedData] = useState(
        structuredClone(resumeData)
    )
    const [isSaving, setIsSaving] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsError(false)

    }, [debounceResumeData])

    useEffect(() => {
        const save = async () => {
            try {
                setIsSaving(true)
                setIsError(false)
                const newData = structuredClone(debounceResumeData)
                const updatedResume = await saveResume({
                    ...newData,
                    ...(JSON.stringify(lastSavedData?.photo, fileReplacer) === JSON.stringify(newData?.photo, fileReplacer) && {
                        photo: undefined
                    }),
                    id: resumeId
                })
                setResumeId(updatedResume.id)
                setLastSavedData(newData)

                if (searchParams.get("resumeId") !== updatedResume.id) {
                    const newSearchParams = new URLSearchParams(searchParams)
                    newSearchParams.set("resumeId", updatedResume.id)
                    window.history.replaceState(
                        null, "", `?${newSearchParams.toString()}`
                    )
                }
                // await new Promise((resolve) => setTimeout(resolve, 1500))
                // setLastSavedData(structuredClone(debounceResumeData))
                // setIsSaving(false)
            } catch (error) {
                setIsError(true)
                console.error(error)
                toast("Event has been created", {
                    description: "Change has not save!",
                    action: {
                        label: "Retry",
                        onClick: () => {
                            save()
                        },
                    },
                    style: {background: "#fca5a5"},
                    icon: <X />,
                })
            } finally {
                setIsSaving(false)
            }
        }

        const hasUnsavedChanges = JSON.stringify(debounceResumeData, fileReplacer) !== JSON.stringify(lastSavedData, fileReplacer)
        if (hasUnsavedChanges && debounceResumeData && !isSaving) {
            save()
        }

    }, [debounceResumeData, isSaving, lastSavedData, resumeId, searchParams, isError])

    return { isSaving, hasUnsavedChanges: JSON.stringify(resumeData) !== JSON.stringify(lastSavedData) }
}

export default useAutoSaveResume;