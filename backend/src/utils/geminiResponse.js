import { GoogleGenAI, Type} from "@google/genai";
import { GEMINI_API_KEY } from "./config.js";

const ai = new GoogleGenAI({apiKey : GEMINI_API_KEY});

const getCommitAnalysis = async (commitMessages) => {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You will be given a array of commits and you need to rate them some score out of 10 on the basis of their quality. Return the array of size similar to input one representing the quality of each commit \n\n ${commitMessages}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties : {
                        rating: {
                            type: Type.INTEGER,
                        },
                        commitMessage : {
                            type: Type.STRING,
                        },
                        improvedCommitMessage: {
                            type: Type.STRING,
                        }
                    }
                }
            }
        }
    });

    return response['candidates'][0]["content"]["parts"][0]["text"];
}

export {
    getCommitAnalysis,
}