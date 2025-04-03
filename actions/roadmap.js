'use server';

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

export async function createRoadmap(industry, careerGoal) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    })

    if (!user) {
        throw new Error("User not found");
    }

    const roadmapPrompt = `
        Generate a detailed career roadmap for someone in the ${industry} industry aiming to become a ${careerGoal}.
        The roadmap should include:
        - Key milestones and skills to acquire
        - Recommended time to learn in years (.5 - 2 years)
        - Learning resources
        - Potential job titles/positions along the path
        - Essential technologies and tools to master(eg- Python, C++, System design, Shadcn UI)
 
        Return the response in this JSON format only, no additional text:
        {
            "roadmap": {
                "title": "string",
                "description": "string",
                "stages": [
                {
                    "name": "string",
                    "timeframe": "string",
                    "keySkills": ["string", "string"],
                    "resources": ["string", "string"],
                    "jobTitles": ["string", "string"],
                    "technologies": ["string", "string"]
                }],
                "additionalAdvice": "string"
            }
        }`;
    
    const res = await model.generateContent(roadmapPrompt);
    const response = res.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    console.log(cleanedText);
    return JSON.parse(cleanedText);
}