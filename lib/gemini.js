import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API)
export default gemini