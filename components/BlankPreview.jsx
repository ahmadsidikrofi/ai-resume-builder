'use client'

import CreateResumeButton from "@/app/(main)/resumes/CreateResumeButton";
import useDimensions from "@/app/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const BlankPreview = () => {
    const containerRef = useRef(null)
    const { width } = useDimensions(containerRef)

    return (
      <div className="h-fit w-full aspect-[210/297] bg-slate-200 text-black">
        <div
          className={cn("space-y-6 p-6", !width && "invisible")}
          style={{
            zoom: (1 / 794) * width,
          }}
          id="resumePreviewContent"
        >
            <CreateResumeButton />
        </div>
      </div>
    );
}
 
export default BlankPreview;