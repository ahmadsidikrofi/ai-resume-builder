import ResumePreview from "@/components/ResumePreview";

const ResumePreviewSection = ({ resumeData, setResumeData }) => {
    return ( 
        <div className="w-1/2 md:flex hidden">
            <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
                <ResumePreview resumeData={resumeData}
                    className="max-w-2xl shadow-md"
                />
            </div>
        </div>
    );
}
 
export default ResumePreviewSection;