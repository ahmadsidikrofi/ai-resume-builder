import ResumePreview from "@/components/ResumePreview";
import ColorPicker from "./forms/ColorPicker";
import BorderStyleButton from "./BorderStyleButton";

const ResumePreviewSection = ({ resumeData, setResumeData }) => {
    return (
      <div className="group w-1/2 md:flex hidden relative">
        <div className="absolute left-1 top-1 lg:left-3 lg:top-3 flex flex-col gap-3 flex-none opacity-25 xl:opacity-100 group-hover:opacity-100 transition-opacity">
          <ColorPicker
            color={resumeData.colorHex}
            onChange={(color) => {
              setResumeData({ ...resumeData, colorHex: color.hex });
            }}
          />
          <BorderStyleButton
            borderStyle={resumeData.borderStyle}
            onChange={(borderStyle) => {
              setResumeData({ ...resumeData, borderStyle });
            }}
          />
        </div>
        <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
          <ResumePreview
            resumeData={resumeData}
            className="max-w-2xl shadow-md"
          />
        </div>
      </div>
    );
}
 
export default ResumePreviewSection;