import EducationForm from "./forms/EducationForm";
import GeneralInfoForm from "./forms/generalInfoForm";
import PersonalInfoForm from "./forms/personalInfoForm";
import SkillsForm from "./forms/skillsForm";
import SummaryForm from "./forms/SummaryForm";
import WorkExperienceForm from "./forms/workExperienceForm";

export const steps = [
    { title: "General info", component: GeneralInfoForm, key: "general-info" },
    { title: "Personal info", component: PersonalInfoForm, key: "personal-info" },
    { title: "Work Experience", component: WorkExperienceForm, key: "work-experience" },
    { title: "Education", component: EducationForm, key: "education" },
    { title: "Skills", component: SkillsForm, key: "skill" },
    { title: "Summary", component: SummaryForm, key: "summary" },
]