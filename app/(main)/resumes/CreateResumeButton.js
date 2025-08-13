"use client"

import usePremiumModal from "@/app/hooks/usePremiumModal";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

const CreateResumeButton = ({ canCreate }) => {
    const premiumModal = usePremiumModal()

    // if (canCreate) {
    //     return (
    //       <Button asChild className="mx-auto flex w-fit gap-2">
    //         <Link href="/editor">
    //           <PlusCircleIcon className="size-5" /> New Resume
    //         </Link>
    //       </Button>
    //     );
    // }

    // return (
    //     <Button className="mx-auto flex w-fit gap-2" onClick={() => premiumModal.setOpen(true)}>
    //     <PlusCircleIcon className="size-5" /> New Resume
    // </Button>
    // )
    
    return (
      <div>
        {canCreate ? (
          <div className="space-y-3">
            <Button
              asChild
              className="mx-auto flex gap-2 rounded-2xl dark:bg-blue-700 bg-blue-300 w-12 h-12 group-hover:bg-blue-800"
            >
              <Link href="/editor">
                <PlusCircleIcon className="size-6" />
              </Link>
            </Button>
            <p className="text-lg">New Resume</p>
          </div>
        ) : (
          <div className="space-y-3">
            <Button
              className="mx-auto flex gap-2 rounded-2xl dark:bg-blue-700  bg-blue-300 w-12 h-12 group-hover:bg-blue-800"
              onClick={() => premiumModal.setOpen(true)}
            >
              <PlusCircleIcon className="size-6 text-blue-800 group-hover:text-white" />
            </Button>
            <p className="text-lg">New Resume</p>
          </div>
        )}
      </div>
    );
}
export default CreateResumeButton;