import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "../editor/page";
import ResumeCard from "./ResumeCard";
import CreateResumeButton from "./CreateResumeButton";
import BlankPreview from "@/components/BlankPreview";
import { getUserSubscriptionLevel } from "@/lib/subscriptions";
import { canCreateResume } from "@/lib/permissions";

export const metadata = () => {
    title: "Your Resumes"
}

const Page = async () => {
    const { userId } = await auth()

    const [ resumes, countResume, subscriptionLevel ] = await Promise.all([
        prisma.resume.findMany({
            where: { userId },
            orderBy: {
                createdAt: "desc"
            },
            include: resumeDataInclude
        }),
        prisma.resume.count({
            where: { userId }
        }),
        getUserSubscriptionLevel(userId)
    ])
    
    // Debug logging
    console.log("Resume page debug:", {
        userId,
        countResume,
        subscriptionLevel,
        canCreate: canCreateResume(subscriptionLevel, countResume)
    });
    
    return ( 
        <main className="max-w-7xl w-full mx-auto px-3 py-6 space-y-6">
            {/* <CreateResumeButton canCreate={countResume < 3} /> */}
            <div className="space-y-1">
                <h1 className="font-semibold text-3xl">Your resumes</h1>
                <p>Total: {countResume}</p>
                <p className="text-sm text-gray-600">Subscription: {subscriptionLevel}</p>
                <p className="text-sm text-gray-600">Can create: {canCreateResume(subscriptionLevel, countResume) ? 'Yes' : 'No'}</p>
            </div>
            <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
                <BlankPreview canCreate={canCreateResume(subscriptionLevel, countResume)}/>
                {resumes.map((resume) => (
                    <ResumeCard 
                        key={resume.id}
                        resume={resume}
                    />
                ))}
            </div>
        </main>
    );
}
 
export default Page;