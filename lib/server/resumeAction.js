"use server"

import { del, put } from "@vercel/blob";
import { resumeSchema } from "../validated";
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma";
import path from "path";
import { getUserSubscriptionLevel } from "../subscriptions";
import { canCreateResume, canUseCustomizationTools, casUseCustomizationTools } from "../permissions";

export async function saveResume(values) {
    const { id } = values

    console.log("Resume received values: ", values);
    
    const { photo, workExperiences, educations, ...resumeValues } = resumeSchema.parse(values)

    const { userId } = await auth()
    if (!userId) {
        throw new Error("User not authenticated")
    }

    // DO: Check resume count for non-premium users
    const subscriptionLevel = await getUserSubscriptionLevel(userId)

    if (!id) {
        const resumeCount = await prisma.resume.count({
            where: { userId }
        })
        if (!canCreateResume(subscriptionLevel, resumeCount)) {
            throw new Error("Maximum resume count reached for this subscription level")
        }
    }

    const existingResume = id ? await prisma.resume.findUnique({ where: { id, userId } }) : null
    if (id && !existingResume) {
        throw new Error("Resume not found")
    }

    // DO: Check customization resume for non-premium users
    const hasCustomization = (
        resumeValues.borderStyle && resumeValues.borderStyle !== existingResume?.borderStyle
    ) || (
        resumeValues.colorHex && resumeValues.colorHex !== existingResume?.colorHex
    )

    if (hasCustomization && !canUseCustomizationTools(subscriptionLevel)) {
        throw new Error("Customization not allowed for this subscription level")
    }

    let newPhotoUrl = undefined // string | null | undefined
    if (photo instanceof File) {
        if (existingResume?.photoUrl) {
            await del(existingResume.photoUrl)
        }

        const uniqueName = `${crypto.randomUUID()}${path.extname(photo.name)}`
        const blob = await put(`resume_photos/${uniqueName}`, photo, {
            access: 'public'
        })

        newPhotoUrl = blob.url
    } else if (photo === null) {
        if (existingResume?.photoUrl) {
            await del(existingResume?.photoUrl)
        }
        newPhotoUrl = null
    }

    if (id) {
        return prisma.resume.update({
            where: { id },
            data: {
                ...resumeValues,
                photoUrl: newPhotoUrl,
                workExperiences: {
                    deleteMany: {},
                    create: workExperiences?.map((exper) => ({
                        ...exper,
                        startDate: exper.startDate ? new Date(exper.startDate) : undefined,
                        endDate: exper.endDate ? new Date(exper.endDate) : undefined,
                    }))
                },
                educations: {
                    deleteMany: {},
                    create: educations?.map((edu) => ({
                        ...edu,
                        startDate: edu.startDate ? new Date(edu.startDate) : undefined,
                        endDate: edu.endDate ? new Date(edu.endDate) : undefined
                    }))
                },
                updatedAt: new Date(),
            }
        })
    } else {
        return prisma.resume.create({
            data: {
                ...resumeValues,
                userId,
                photoUrl: newPhotoUrl,
                workExperiences: {
                    create: workExperiences?.map((exp) => ({
                        ...exp,
                        startDate: exp.startDate ? new Date(exp.startDate) : undefined,
                        endDate: exp.endDate ? new Date(exp.endDate) : undefined
                    }))
                },
                educations: {
                    create: educations?.map((edu) => ({
                        ...edu,
                        startDate: edu.startDate ? new Date(edu.startDate) : undefined,
                        endDate: edu.endDate ? new Date(edu.endDate) : undefined,
                    }))
                }
            }
        })
    }
}