
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

export interface AIResponse {
  text: string;
  triggerCart?: boolean;
}

export const getAIRecommendation = async (userMessage: string): Promise<AIResponse> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are the AI Music Assistant for NovaWave Radio. 
        NovaWave is a modern internet radio station specializing in Synthwave, Techno, House, Lofi, and Ambient music.
        Your goal is to help listeners find new music, explain genres, or give info about our fictional DJs (DJ Spark, Techno Tess, Lofi Luna, Nightcrawler).
        
        You have a special tool to 'open_cart'. If the user asks to see their cart, view their items, or check their order status, use the open_cart function.
        
        Keep your responses enthusiastic, cool, and relatively brief. Use emojis sparingly.`,
        tools: [{
          functionDeclarations: [{
            name: 'open_cart',
            description: 'Opens the shopping cart for the user to view their items or proceed to checkout.',
            parameters: {
              type: Type.OBJECT,
              properties: {},
            }
          }]
        }]
      },
    });

    const triggerCart = response.functionCalls?.some(fc => fc.name === 'open_cart');

    return {
      text: response.text || (triggerCart ? "Opening your terminal cart now..." : "I'm vibing out right now and couldn't quite catch that."),
      triggerCart
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "The airwaves are a bit fuzzy. Let's try that again later." };
  }
};
