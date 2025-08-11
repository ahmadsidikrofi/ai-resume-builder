import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "../editor/page";
import ResumeCard from "./ResumeCard";

export const metadata = () => {
    title: "Your Resumes"
}

const Page = async () => {
    const { userId } = await auth()

    const [ resumes, countResume ] = await Promise.all([
        prisma.resume.findMany({
            where: { userId },
            orderBy: {
                createdAt: "desc"
            },
            include: resumeDataInclude
        }),
        prisma.resume.count({
            where: { userId }
        })
    ])
    return ( 
        <main className="max-w-7xl w-full mx-auto px-3 py-6 space-y-6">
            <Button asChild className="mx-auto flex w-fit gap-2">
                <Link href="/editor">
                    <PlusSquare className="size-5" /> New Resume
                </Link>
            </Button>
            <div className="space-y-1">
                <h1 className="font-semibold text-3xl">Your resumes</h1>
                <p>Total: {countResume}</p>
            </div>
            <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
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