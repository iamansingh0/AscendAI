"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
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

    try {
        const result = await db.$transaction(
            async (tx) => {
                // find if the industry exists
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry,
                    },
                })
                // If Industry does not exist, create it with default values - with replace it with AI later
                if (!industryInsight) {
                    const insights = await generateAIInsights(data.industry);
                    industryInsight = await db.industryInsight.create({
                        data: {
                            industry: data.industry,
                            ...insights,
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
                        }
                    })
                }
                // update the user
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    }
                })
                return { updatedUser, industryInsight };
            },
            {
                timeout: 10000,
            }
        )
        return { success: true, ...result };

    } catch (error) {
        console.log('Error updating user & industry: ', error.message);
        throw new Error('Failed to update user & industry' + error.message);
    }
}

export async function getUserOnboardingStatus(data) {
    const { userId } = await auth();
    console.log(userId)
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    })
    console.log(user)

    if (!user) {
        throw new Error("User not found");
    }

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
            select: {
                industry: true,
            }
        })

        return {
            isOnboarded: !!user?.industry,
        };
    } catch (error) {
        console.log('Error checking if user is onboarded - ' + error.message);
        throw new Error('Failed to check user onboarding status' + error.message);
    }
}