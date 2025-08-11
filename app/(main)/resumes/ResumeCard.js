'use client'

import LoadingButton from "@/components/LoadingButton";
import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteResume } from "@/lib/server/existingResumeActions";
import { mapToResumeValues } from "@/lib/utils";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { formatDate } from "date-fns";
import { MoreVerticalIcon, Printer, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

const ResumeCard = ({ resume }) => {
    const wasUpdated = resume.updatedAt !== resume.createdAt

    const contentRef = useRef(null)
    const reactToPrint = useReactToPrint({
        contentRef,
        documentTitle: resume.title || "Resume"
    })
    return (
        <div className="group relative border rounded-lg border-transparent hover:border-green-300 transition-colors bg-secondary p-3">
            <div className="space-y-3">
                <Link 
                    href={`/editor?resumeId=${resume.id}`}
                    className="inline-block w-full text-center"
                >
                    <p className="font-semibold line-clamp-1">{resume.title || "No Title"}</p>
                    {resume.description && (
                        <p className="text-sm line-clamp-1">{resume.description}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                        {wasUpdated ? "Created" : "Updated"} on {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
                    </p>
                </Link>
                <Link
                    href={`/editor?resumeId=${resume.id}`}
                    className="relative inline-block w-full"
                >
                    <ResumePreview
                        resumeData={mapToResumeValues(resume)}
                        contentRef={contentRef}
                        className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-xl"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
                </Link>
            </div>
            <MoreMenu resumeId={resume.id} onPrintClick={reactToPrint}/>
        </div>
    );
}

const MoreMenu = ({ resumeId, onPrintClick }) => {
    const [ showDeleteConfirmation, setShowDeleteConfirmation ] = useState(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0.5 right-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        <MoreVerticalIcon className="size-5"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        className="flex items-center gap-2"
                        onClick={() => setShowDeleteConfirmation(true)}
                    >
                        <Trash2 className="size-5"/> Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onPrintClick}
                        className="flex items-center gap-2"
                    >
                        <Printer className="size-5"/> Print
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteConfirmationDialog
                resumeId={resumeId}
                open={showDeleteConfirmation}
                onOpenChange={setShowDeleteConfirmation}
            />
        </>
    )
}

const DeleteConfirmationDialog = ({ resumeId, open, onOpenChange }) => {
    const [ isPending, startTransition ] = useTransition()

    const handleDelete = async () => {
        startTransition(async () => {
            try {
                await deleteResume(resumeId)
                onOpenChange(false)
            } catch (error) {
                console.log(error)
                toast("Something went wrong", {
                    description: "There is something not right here, let's check it out",
                    style: {background: "#fca5a5" },
                    icon: <X />
                })
            }
        })
    }
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete resume?</DialogTitle>
            <DialogDescription>
              This will permanently delete this resume. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <LoadingButton
                variant="destructive"
                onClick={handleDelete}
                isLoading={isPending}
            >Delete
            </LoadingButton>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}
 
export default ResumeCard;