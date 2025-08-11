"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "../prisma"
import { del } from "@vercel/blob"
import { revalidatePath } from "next/cache"
import { useUser } from "@clerk/nextjs"

export async function deleteResume (id) {
    const { userId } = await auth()
    if (!userId) {
        throw new Error("User not authenticated")
    }
    
    const resume = await prisma.resume.findUnique({
        where: { userId, id }
    })

    if (!resume) {
        throw new Error("Resume not found")
    }

    if (resume.photoUrl) {
        await del(resume.photoUrl)
    }

    await prisma.resume.delete({
        where: { id }
    })

    revalidatePath("/resumes")
}  