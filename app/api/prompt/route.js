import { connectDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async () => {
    try {
        await connectDB()
        const posts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(posts), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch data"), {status: 500})
    }
}