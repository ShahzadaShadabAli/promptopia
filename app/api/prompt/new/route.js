import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/database";

export const POST = async (req) => {
    const {userId, prompt, tag} = await req.json()
    try {
        await connectDB()
        const newPrompt = new Prompt({
            tag, 
            prompt,
            creator: userId
        })
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        return new Response(JSON.stringify("Failed to save prompt"), {status: 500})
    }
}