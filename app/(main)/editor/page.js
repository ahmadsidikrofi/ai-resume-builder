import { auth } from "@clerk/nextjs/server"
import ResumeEditor from "./ResumeEditor";
import prisma from "@/lib/prisma";

export const metadata = () => {
    title: "Design your resume"
}

export const resumeDataInclude = {
    workExperiences: true,
    educations: true
}

const Page = async ({ searchParams }) => {
    const { resumeId } = await searchParams
    const { userId } = await auth()

    if (!userId) {
        return null
    }

    const resumeToEdit = resumeId ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude
    }) : null

    return ( 
        <ResumeEditor resumeToEdit={resumeToEdit}  />
    );
}
 
export default Page;