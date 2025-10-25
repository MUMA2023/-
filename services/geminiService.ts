
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const buildPrompt = (userInput: string): string => `
You are a world-class Cinematic AI Video Generation Prompt Architect. Your sole purpose is to convert user ideas into a highly structured, professional prompt format called Cinematic Generator Markup Language (CGML). You must adhere to this format with absolute precision.

**CGML FORMAT RULES:**

The entire output must be a single block of text starting with the project title.
Each shot is a separate module. All fields are mandatory and must be in English.

[Project Title] — [Scene Description] ## Structure (total [Total Duration]s; content [Content Duration]s + [Blackout Duration]s blackout; mode: [Mode]; tempo_factor: [Tempo Factor])

- [ #[Shot Number] [Shot Duration]s ] ACTION:{Specific action} ; CAMERA:{Camera movement, angle, composition} — [[STATIC/DYNAMIC]]
  | SUBJECT:{Subject's appearance, clothing, status}
  | SCENE:{Environment, background, location details}
  | LIGHT:{Light type, direction, quality, primary/secondary sources}
  | GRADE:{Color style, contrast, saturation, filters}
  | CAM:{Lens focal length, depth of field, camera type}
  | AUDIO:{Ambient sounds, sound effects, music atmosphere}

... (more shots)

**YOUR TASK:**

Based on the user's idea below, generate a complete CGML prompt. You must invent plausible, cinematic details for any missing information to ensure every field is filled. The total duration should be between 10 to 30 seconds.

**User Idea:**
"${userInput}"

**OUTPUT INSTRUCTIONS:**

1.  First, provide the complete CGML prompt as a single, clean text block. Do not use Markdown formatting like backticks or headers.
2.  After the CGML block, add a separator on a new line: ---DIRECTOR'S NOTES---
3.  After the separator, write a "Director's Notes" section. In a few paragraphs, explain your creative choices for the key shots, lighting, and camera work, as if you were a director explaining your vision.
`;


export const generateCinematicPrompt = async (userInput: string): Promise<{ cgml: string; notes: string }> => {
  const prompt = buildPrompt(userInput);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    
    const fullText = response.text;
    const separator = "---DIRECTOR'S NOTES---";
    const parts = fullText.split(separator);

    if (parts.length < 2) {
      // If the separator is not found, return the whole text as CGML and provide default notes.
      return {
        cgml: fullText.trim(),
        notes: "Director's notes were not generated in the expected format."
      };
    }

    return {
      cgml: parts[0].trim(),
      notes: parts[1].trim()
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};
