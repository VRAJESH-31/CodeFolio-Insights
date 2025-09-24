import { GoogleGenAI, Type} from "@google/genai";
import { GEMINI_API_KEY } from "./config.js";

const ai = new GoogleGenAI({apiKey : GEMINI_API_KEY});

const getCommitAnalysis = async (commitMessages) => {
    try {
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

        return JSON.parse(response['candidates'][0]["content"]["parts"][0]["text"]);
    } catch (error) {
        console.log("Error Occurred while getting commit analysis in geminiResponse.js", error.message);
        console.log(error.stack);
        return {};
    }
}

const getGithubProfileAnalysis = async (githubData) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You will be given an object which will contain a lot of user github data and you need to return an object :
            {
                analysis: This will contain a analysis on user github data like what he has done and all other stuff. You should try to compliment the user on the basis of data you received but remember if there's nothing to talk about then no need to sugar-clot the stuff and just provide general analysis.
                improvementAreas: This will be an array of 3-5 length with each element being a short point that gives suggestion for improvement based on the data provided
            }

            Take care that you should not miss to return any field empty and try to align the content with respect to user data
            
            Github Data: ${JSON.stringify(githubData)}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        analysis : {
                            type: Type.STRING,
                        },
                        improvementAreas : {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            }
                        }
                    },
                }
            }
        });

        return JSON.parse(response['candidates'][0]["content"]["parts"][0]["text"]);
    } catch (error){
        console.log("Error Occurred while getting github profile analysis in geminiResponse.js", error.message);
        console.log(error.stack);
        return {};
    }
}

const getLeetCodeProfileAnalysis = async (leetCodeData) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You will be given an object which will contain a lot of user leetCode data and you need to return an object :
            {
                analysis: This will contain a analysis on user leetCode data like what he has done and all other stuff. You should try to compliment the user on the basis of data you received but remember if there's nothing to talk about then no need to sugar-clot the stuff and just provide general analysis.
                improvementAreas: This will be an array of 3-5 length with each element being a short point that gives suggestion for improvement based on the data provided
            }

            Take care that you should not miss to return any field empty and try to align the content with respect to user data
            
            Github Data: ${JSON.stringify(leetCodeData)}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        analysis : {
                            type: Type.STRING,
                        },
                        improvementAreas : {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            }
                        }
                    },
                }
            }
        });

        return JSON.parse(response['candidates'][0]["content"]["parts"][0]["text"]);
    } catch (error){
        console.log("Error Occurred while getting github profile analysis in geminiResponse.js", error.message);
        console.log(error.stack);
        return {};
    }
}

export {
    getCommitAnalysis,
    getGithubProfileAnalysis,
    getLeetCodeProfileAnalysis,
}