
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getAIRecommendation = async (userMessage: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are the AI Music Assistant for NovaWave Radio. 
        NovaWave is a modern internet radio station specializing in Synthwave, Techno, House, Lofi, and Ambient music.
        Your goal is to help listeners find new music, explain genres, or give info about our fictional DJs (DJ Spark, Techno Tess, Lofi Luna, Nightcrawler).
        Keep your responses enthusiastic, cool, and relatively brief. Use emojis sparingly.`,
      },
    });

    return response.text || "I'm vibing out right now and couldn't quite catch that. Try asking about a genre!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The airwaves are a bit fuzzy. Let's try that again later.";
  }
};
