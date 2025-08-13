import useDebounce from "@/app/hooks/useDebounce";
import { saveResume } from "@/lib/server/resumeAction";
import { fileReplacer } from "@/lib/utils";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner"

const useAutoSaveResume = (resumeData) => {
    const searchParams = useSearchParams()
    const [resumeId, setResumeId] = useState(resumeData.id)
    const retryCountRef = useRef(0)
    const maxRetries = 3

    const debounceResumeData = useDebounce(resumeData, 1500)
    const [lastSavedData, setLastSavedData] = useState(
        structuredClone(resumeData)
    )
    const [isSaving, setIsSaving] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsError(false)
        retryCountRef.current = 0
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
                retryCountRef.current = 0

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
                retryCountRef.current++
                console.error(error)
                
                // Hanya tampilkan toast jika belum mencapai max retries
                if (retryCountRef.current <= maxRetries) {
                    toast("Save failed", {
                        description: error.message || "Change has not been saved!",
                        action: {
                            label: "Retry",
                            onClick: () => {
                                retryCountRef.current = 0
                                save()
                            },
                        },
                        style: {background: "#fca5a5"},
                        icon: <X />,
                    })
                    
                    // Auto retry dengan delay jika masih di bawah max retries
                    if (retryCountRef.current < maxRetries) {
                        setTimeout(() => {
                            if (retryCountRef.current < maxRetries) {
                                save()
                            }
                        }, 3000)
                    }
                }
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