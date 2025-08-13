'use client'

import CreateResumeButton from "@/app/(main)/resumes/CreateResumeButton";

const BlankPreview = ({ canCreate }) => {
    return (
      <div className="group relative border rounded-lg border-transparent hover:border-violet-400 transition-colors bg-secondary p-3 flex justify-center items-center h-full">
        <CreateResumeButton canCreate={canCreate}/>
      </div>
    );
}
 
export default BlankPreview;