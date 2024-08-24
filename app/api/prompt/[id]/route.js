import { connectDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectDB()
        const post = await Prompt.findById(params.id).populate('creator')
        return new Response(JSON.stringify(post), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch data"), { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json()
    try {
        const existingPrompt = await Prompt.findById(params.id)
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 })

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to Update Prompt", { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectDB()
        await Prompt.findByIdAndDelete(params.id);
        

        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to Delete Prompt", { status: 500 })
    }
}