import { GoogleGenAI, Type} from "@google/genai";
import { GEMINI_API_KEY } from "../config/config.js";
import { complexAnalysisSchema, simpleAnalysisSchema, simpleListSchema, jobDescriptionSchema, videoSchema } from "./schema/geminiResponse.js";

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
                        },
                        required: ["rating", "commitMessage", "improvedCommitMessage"],
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
                analysis: This will contain a analysis on user github data like what he has done and all other stuff. 
                strongPoints: This will be an array of 3-5 length and in each element you should try to compliment the user on the basis of data you received but remember if there's nothing to talk about then no need to sugar-clot the stuff and just provide general analysis.
                improvementAreas: This will be an array of 3-5 length with each element being a short point that gives suggestion for improvement based on the data provided
                suggestedVideo: This will contain a video suggestion that user will need to see to enhance his github profile. Structure of video object: {link: {embed: A link that can be used in iframe to embed youtube video component, url: A link that can be used to open the video in a new tab}, title: title of the video, description: description of the video, time: length of the video in seconds, views: Total views of the video}. Remember both embed link and actual url should be real one rather than just dummy one.
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
                        strongPoints : {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            }
                        },
                        improvementAreas : {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            }
                        },
                        video: videoSchema,
                    },
                    required: ["analysis", "strongPoints", "improvementAreas", "video"],
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
                analysis: This will contain a analysis on user leetCode data like what he has done and all other stuff. 
                strongPoints: This will be an array of 3-5 length and in each element you should try to compliment the user on the basis of data you received but remember if there's nothing to talk about then no need to sugar-clot the stuff and just provide general analysis.
                improvementAreas: This will be an array of 3-5 length with each element being a short point that gives suggestion for improvement based on the data provided
                suggestedVideo: This will contain a video suggestion that user will need to see to enhance his leetcode profile by up skilling his problem solving skills. Structure of video object: {link: { embed: A link that can be used in iframe to embed youtube video component, url: A link that can be used to open the video in a new tab}, title: title of the video, description: description of the video, time: length of the video in seconds, views: Total views of the video}. Remember both embed link and actual url should be real one rather than just dummy one.
            }

            Take care that you should not miss to return any field empty and try to align the content with respect to user data
            
            Leetcode Data: ${JSON.stringify(leetCodeData)}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        analysis : {
                            type: Type.STRING,
                        },
                        strongPoints: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            }
                        },
                        improvementAreas : {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            }
                        },
                        video: videoSchema
                    },
                    required: ["analysis", "strongPoints", "improvementAreas", "video"],
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

const getResumeAnalysis = async (resumeData) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert resume analyzer, acting as a strict, senior hiring manager at a top-tier tech company (like Google, Meta, or Amazon). Your standards are exceptionally high. Your goal is to provide a critical, in-depth, and brutally honest evaluation to help the user build a resume that stands out to elite recruiters.

            Your primary directive is to be **critically evaluative and discerning**. Do not award high scores for simply meeting the bare minimum requirements. High scores (90+) are reserved for truly exceptional, polished, and impactful resumes.
            You will judge the resume on the following criteria:
            1. **Resume Length**: Appropriateness of length based on experience level.
            2. **Clarity & Professionalism**: Grammar, spelling, formatting consistency, readability, and professional tone.
            You will also judge the user on the basis of how much his/her resume matches the job description. In case, job description is not provided. You will give generic review.

            **Scoring Philosophy:**
            - **< 50 (Major Flaws):** Significant issues with content, structure, or professionalism. Unlikely to pass an initial screen.
            - **50-70 (Meets Basics):** The resume has the necessary sections but lacks impact, quantification, and polish. It is generic.
            - **70-85 (Good):** A solid resume. It uses some action verbs and metrics, is well-structured, and shows clear competency.
            - **85-95 (Excellent):** A compelling resume. It is driven by quantified impact, uses strong action verbs, is tailored, and is highly professional.
            - **95-100 (Exceptional):** A top 1% resume. Flawless execution, outstanding impact demonstrated in every relevant bullet point, and perfectly aligned with the target role.

            Given the resume data, you must return a JSON object with the following structure:
            {
                "score": {
                    // This object contains key-value pairs for different judging criteria.
                    // The value for each key will be {score, analysis}.
                    // The 'analysis' should provide a critical review of the good and bad aspects without mentioning the score itself. The analysis can be of single line or maybe of 5-6 lines. There's not restriction on points limit, it all depends on the situation.
                    // Cap all scores at 100, even with bonuses.

                    "(a) Resume Length Score": {
                        // - 0-5 years of experience: 1 page is 100. Penalize for every line over one page. A 2-page resume gets 0.
                        // - 5-10+ years of experience: 1-2 pages is acceptable. 1 page is 100. A full 2 pages is 90. Penalize for going over 2 pages.
                        // - If the candidate is a student with more than one page, the score is 0.
                    },
                    "(b) Clarity & Professionalism Score": {
                        // Evaluates overall polish.
                        // - Grammar & Spelling: Deduct points for every single typo or grammatical error.
                        // - Consistency: Check for consistent formatting (date formats like 'May 2023' vs '05/2023'), terminology (e.g., 'React' vs 'React.js'), and font usage. Inconsistency should be heavily penalized.
                        // - Readability: Is the resume easy to scan? Is there good use of white space, or is it a wall of text? Dense text reduces the score.
                        // - Professional Tone: Language should be professional and concise.
                    },
                    "(c) Impact & Action-Orientation Score": {
                        // **THIS IS A CRITICAL SCORE.** It judges the quality of the content itself.
                        // - Quantified Results: How often are bullet points supported by numbers, percentages, or concrete metrics? (e.g., "Increased performance by 30%" vs. "Improved performance"). A lack of metrics MUST result in a low score (< 60).
                        // - Action Verbs: Does each bullet point start with a strong action verb (e.g., 'Architected', 'Engineered', 'Optimized', 'Led')? Or does it use weak/passive language (e.g., 'Responsible for', 'Worked on')?
                        // - STAR Method: Evaluate if the bullet points implicitly follow the STAR (Situation, Task, Action, Result) method. The analysis should critique points that only describe actions without results.
                        // - If a same action verb is present more than two times, it is not good. More a same action verb is used, lower is the score.
                    },
                    "(d) Logical Flow Score": {
                        // Judges the structural layout. Be strict.
                        // - The candidate's name must be at the very top. Followed immediately by contact info/links.
                        // - There's no restriction in ordering of section, but it would be great if the more impressive section is placed at top of other sections, but again that's the choice not compulsion.
                        // - In case user has kept summary section, it should come after name and profile links
                        // - All sections must use reverse chronological order (most recent first). Any deviation is a major penalty.
                    },
                    "(e) Section Scores": {
                        // An object containing scores for individual sections.
                        // Below all are mandatory sections and if any of the section is missing, score it 0.
                        // Achievements, Experience and Projects section will also contain the pointAnalysis field. Structure of pointAnalysis field : {point, score, analysis} for each and every bullet point of that section, where point will be the {original: original point provided in the section, refactored: This will be the refactored version of the original point}, pointScore will be an integer from 0 to 10 and pointAnalysis will be an analysis for that point.
                        // For analysis of each point, the quantified point will score higher rather than the unquantified one and remember your standards are very high. And remember, there wont't be any impact in the general analysis filed due to this point analysis.

                        "Contact Info Section": {
                            // - Must contain a professional email. Unprofessional emails (e.g., coolguy99@...) get a low score.
                            // - Must contain a phone number, a clickable LinkedIn URL and Github URL.
                            // -  Since You would be given only text and you can't sense link. So, if you encounter any name of social profile, it is ok and everything went good.
                            // - Although, it is not compulsion but one can also mention the link of coding profiles too like that of LeetCode, CodeForces, etc.
                            // - This section would have liberal review, if everything is mentioned correctly, then one can easily score full.
                        },
                        "Course Work Section" : {
                            // - Must contain a set of courses taken by student during this degree.
                            // - The most important or compulsory to have courses for Computer Science Students are: Operating System, Computer Networks, Database Management System, Object Oriented Programming, Data Structures and Algorithms. Apart from that it is optional if someones want to mention any course.
                            // - The course names should be in full form. Course work cannot have names like ML, OS, etc.
                            // - It is ok if coursework is not provided in separated section, and provided along with education section or skills section.
                            // - This section will have liberal review too, if everything is mentioned correctly, then one can easily score full.
                        },
                        "Technical Skills Section": {
                            // - Organization: Are skills logically grouped (e.g., 'Languages', 'Frameworks & Libraries', 'Databases', 'Developer Tools')? A single block of unorganized skills gets a low score.
                            // - Relevance: Are the skills modern and relevant for the target role?
                            // - Validation: Critically check if the skills listed are actually demonstrated in the Experience or Projects sections. If a skill is listed but not used in project section or experience section, it still qualifies but it would have been great if they were mentioned. 
                            // A core skill like language, tool or framework not mentioned in skill section but used in project becomes reason of concern. But it would be okay if it's an API or some other side, easy to use integrating stuff
                        },
                        "Experience Section": {
                            // - Score this section heavily based on the 'Impact & Action-Orientation Score'.
                            // - Each entry MUST have Company Name, Role, and Dates.
                            // - Bullet points (3-5 per role is ideal) are evaluated individually for quality. Vague, responsibility-listing points (e.g., "Wrote code for the front-end") get very low scores. High scores are for impact-driven points (e.g., "Engineered a new caching strategy using Redis, reducing API response times by 45% for over 10,000 daily active users.").
                        },
                        "Projects Section": {
                            // - For new grads, this is the most important section. 2-4 high-quality projects are ideal.
                            // - Project Name: Penalize generic names like 'Twitter Clone' or 'E-commerce Website'. Creative and descriptive names are rewarded like 'ShortFolio - A portfolio website builder'
                            // - Links: GitHub repo link and live deployment link is **mandatory**. Any missing link results in a score below 40 for that project.
                            // - You can provide a link for demo video too in case live project link is not available due to any issues.
                            // - Technology Stack: Must clearly list the technologies used.
                            // - Bullet Points: As with Experience, these MUST be impact-driven. What was the feature? What was the outcome? (e.g., "Implemented JWT-based authentication to secure user data and create protected API routes."). It would be great if the bullet points contain numerical metrics.
                        },
                        "Education Section": {
                            // - Must include University Name, Degree, and Graduation Date (or expected date).
                            // - Reverse chronological order is mandatory.
                            // - Consistency: Information provided for one degree (e.g., GPA, coursework) should be consistent for others.
                            // - High GPA (if mentioned and high) or prestigious honors can add a small bonus.
                            // - If someone is from a prestigious colleges like IITs, NITs, BITS Pilani or any other prestigious college, he/she will get bonus.
                        },
                        "Achievements Section": {
                            // - Score based on the significance and quantification of the achievements.
                            // - Vague achievements ('Won a hackathon') score lower than specific, quantified ones ('Placed 1st out of 50 teams in Smart India Hackathon 2024 by developing a prototype that...').
                            // - If the section is empty or contains trivial points, the score should be low.
                        }
                    }
                    "(f) Job Description Score": {
                        // Judges on the basis of how much a user's resume match to the job description.
                        // In case the job description is not provided, score the user 100 directly.
                        // In the analysis of this section, you will mention user what stuff of his/her resume matches with the job description and on what doesn't.
                        // In case job description is provided, there will be three extra fields: 
                            1. 'Job Description Given' : It will contain if the job description is given or not, 
                            2. 'Keywords present' : signify each and every keyword mentioned in the resume
                            3. 'Keywords absent' : signify each and every keyword not mentioned in the resume
                            In case job description is absent, skip these fields. And remember you should mention any kind of keyword in  1-2 words, and at max 3-4 keyword (if required). I don't want something like this - 'good in problem solving and analytical thinking', 'problem solving' and 'analytical thinking' are good keywords. Plus, try to search for as many as possible 'Valid' keywords by reading job description properly. Yes, valid only valid ones. Just because I've told you to find many keywords, it doesn't mean you will add every next word to keyword list.
                    }
                },
                "strengths": [
                    // A list of 2-4 bullet points highlighting what the resume does exceptionally well. Be specific. If nothing is exceptional, say so.
                ],
                "weaknesses": [
                    // A list of 2-4 bullet points detailing the most critical flaws that would cause a recruiter to discard the resume. Be direct and blunt.
                ],
                "improvements": [
                    // A prioritized list of actionable suggestions. Start with the highest-impact changes. For example, "Rewrite every bullet point in your Experience section to include a quantifiable metric. Here, you should try to list out all the possible improvements. There's not point limit. If you found 3 points of improvement then mention it. Or even if you found 10-15 points of improvement, mention all of them without halt as the fate of user is upon you"
                ]
            }

            Resume Data: ${resumeData["resumeContent"]}
            No of pages in resume: ${resumeData["noOfResumePages"]}
            Experience (in years): ${resumeData["experienceInYears"]}
            Job Description : ${resumeData["jobDescription"]}
            Current Date: ${new Date().toISOString().split('T')[0]} (for your reference so that you can check the dates mentioned in the resume)
            `,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        scoreAnalysis: {
                            type: Type.OBJECT,
                            properties: {
                                resumeLength : simpleAnalysisSchema,
                                impact : simpleAnalysisSchema,
                                professionalism : simpleAnalysisSchema,
                                logicalFlow : simpleAnalysisSchema,
                                section : {
                                    type: Type.OBJECT,
                                    properties: {
                                        contact: simpleAnalysisSchema,
                                        coursework: simpleAnalysisSchema,
                                        education: simpleAnalysisSchema,
                                        projects: complexAnalysisSchema,
                                        achievements: complexAnalysisSchema,
                                        technicalSkills: simpleAnalysisSchema,
                                        experience: complexAnalysisSchema,
                                    },
                                    required: ["contact", "coursework", "education", "projects", "achievements", "technicalSkills", "experience"],
                                },
                                jobDescription : jobDescriptionSchema,
                            },
                            required: ["resumeLength", "impact", "professionalism", "logicalFlow", "section", "jobDescription"],
                        },
                        strengths : simpleListSchema,
                        weaknesses: simpleListSchema,
                        improvements: simpleListSchema,
                    },
                    required: ["scoreAnalysis", "strengths", "weaknesses", "improvements"],
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
    getResumeAnalysis,
}