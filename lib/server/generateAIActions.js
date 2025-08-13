"use server"

import { auth } from "@clerk/nextjs/server"
import gemini from "../gemini"
import { generateSummarySchema, generateWorkExperienceSchema } from "../validated"
import { getUserSubscriptionLevel } from "../subscriptions"
import { canUseAITools } from "../permissions"

export async function generateSummary(input) {
    // Block for non-premium users
    const { userId } = await auth()
    if (!userId) {
        throw new Error("Unauthorized")
    }

    const subscriptionLevel = getUserSubscriptionLevel(userId)
    if (!canUseAITools(subscriptionLevel)) {
        throw new Error("Upgrade your subscription to use this feature")
    }

    const { jobTitle, workExperiences,educations, skills  } = generateSummarySchema.parse(input)

    const systemMessage = `
    You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data.
    Only return the summary and do not include any other information in the response. Keep it concise and professional.
    `

    const userMessage = `
    Please generate a professional resume summary from this data:
    Job title: ${jobTitle || "N/A"}

    Work experiences: ${workExperiences.map((exp) => `
            Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
            
            Description: ${exp.description || "N/A"}
        `).join("\n\n")}

    Educations: ${educations.map((edu) => `
            Degree: ${edu.degree || "N/A"} at ${edu.school} from ${edu.startDate || "N/A"} to ${edu.endDate || "Present"}
        `).join("\n\n")}

    Skills: ${skills}
    `

    console.log("System message: ", systemMessage)
    console.log("User message: ", userMessage)

    const prompt = `${systemMessage}\n\nUser: ${userMessage}`
    const model = gemini.getGenerativeModel({
        model: "gemini-2.0-flash",
        temperature: 0.9,
    })
    const result = await model.generateContent(prompt)
    const aiResponse = result.response.text()
    if (!aiResponse) {
        throw new Error("Failed to generate AI response")
    }

    return aiResponse
}

export async function generateWorkExperience (input) {
    // Block for non-premium users
    const { userId } = auth()
    if (!userId) {
        throw new Error("Unauthorized")
    }

    const subscriptionLevel = getUserSubscriptionLevel(userId)
    if (!canUseAITools(subscriptionLevel)) {
        throw new Error("Upgrade your subscription to use this feature")
    }

    const { description } = generateWorkExperienceSchema.parse(input)

    const systemMessage = `
    You are a job resume generator AI. Your task is to single work experience entry based on the user input.
    Your response must adhere to the following structure. You can omit fields that you can't be infered from the provided data, but don't add any new ones.

    Job title: <job title>
    Company: <company name>
    Start date: <format: YYYY-MM-DD> (only if provided)
    End date: <format: YYYY-MM-DD> (only if provided)
    Description: <an optimized description in bullet (•) format, might be inferred from the job title>
    `

    const userMessage = `
    Please provide a work experience entry from this description:
    ${description}
    `

    const prompt = `${systemMessage}\n\nUser: ${userMessage}`
    const model = gemini.getGenerativeModel({
        model: "gemini-2.0-flash",
        temperature: 0.7
    })
    const result = await model.generateContent(prompt)
    const aiResponse = result.response.text()
    if (!aiResponse) {
        throw new Error("Failed to generate AI response")
    }
    console.log("AI Response ", aiResponse)

    return {
        position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
        company: aiResponse.match(/Company: (.*)/)?.[1] || "",
        description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
        startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1] || "",
        endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1] || "",
    }
}