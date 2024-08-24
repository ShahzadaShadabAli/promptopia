import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/database";
import mongoose from "mongoose";

export const GET = async (req, { params }) => {
  console.log(params)
    try {
      console.log("params", params?.id); // Check if params exists
      await connectDB();
  
      // Ensure params.id is present
      if (!params?.id) {
        return new Response(JSON.stringify("Missing params ID"), { status: 400 });
      }
  
      const creatorId = params.id;

      const prompts = await Prompt.find({
        creator: creatorId
      }).populate('creator');
       
      return new Response(JSON.stringify(prompts), { status: 200 }); // Use 200 for GET success
    } catch (error) {
      console.error(error); // Log the error for debugging
      return new Response(JSON.stringify("Failed to fetch prompt"), { status: 500 });
    }
  };
  