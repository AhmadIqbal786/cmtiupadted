import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const askAITutor = async (
  question: string, 
  courseContext: string,
  lessonContext: string,
  chatHistory: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please check your environment configuration.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Construct prompt with history and context
    const historyText = chatHistory.map(msg => `${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.text}`).join('\n');
    
    const prompt = `
      You are an expert AI Tutor for the CMTI (Construction Material Testing Institute) LMS.
      
      Context:
      Course: ${courseContext}
      Current Lesson Topic: ${lessonContext}
      
      Chat History:
      ${historyText}
      
      Student Question: ${question}
      
      Instructions:
      - Answer the student's question clearly and concisely.
      - Relate the answer back to the specific course context if possible.
      - Be encouraging and educational.
      - If the question is off-topic, politely guide them back to the course material.
      - Use markdown for formatting if helpful (bolding key terms, lists).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful and knowledgeable academic tutor."
      }
    });

    return response.text || "I'm having trouble thinking of an answer right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};