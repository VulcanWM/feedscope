'use server'

import { create_user, get_user_from_email, do_quiz } from "@/lib/database"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache'
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rateLimit";

export async function createUserFunction(prevState: { message: string } | { message: boolean }, formData: FormData) {
    const username = formData.get("username") as string
    const authUser = await getServerSession(authOptions);
    const email = authUser?.user?.email || null
    if (email == null){
        return {message: "You are not logged in"}
    } else {
        const user_from_email = await get_user_from_email(email)
        if (user_from_email != false){
            return {message: true}
        }
        const func = await create_user(username, email as string)
        revalidatePath("/")
        return {message: func}
    }
}

export async function doQuizFunction(answer: string) {
    const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
    const isRateLimited = rateLimit(ip);
    if (isRateLimited){
        return "You are being rate limited! Please try again later."
    } else {
        const authUser = await getServerSession(authOptions);
        const email = authUser?.user?.email || null
        if (email == null){
            return "You are not logged in!"
        } else {
            const user_from_email = await get_user_from_email(email)
            if (user_from_email == false){
                return "You don't have an account!"
            }
            const func = await do_quiz(email, answer)
            revalidatePath("/")
            return func
        }
    }
}