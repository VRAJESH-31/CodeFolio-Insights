import simpleGit from "simple-git";
import { GoogleGenAI } from "@google/genai";
import CONF from "../config/env.js";
import console from "console";

const git = simpleGit();

const genAI = new GoogleGenAI({
    apiKey: CONF.GEMINI_API_KEY,
    model: CONF.GEMINI_API_MODEL,
});

const run = async () => {
    const branch = await git.branch();
    const currentBranch = branch.current;

    if (currentBranch === "main") {
        console.log("Already on main branch");
        return;
    }

    const parentBranch = await git.raw([
        'show-branch',
        '--merge-base',
        currentBranch,
        '^develop',
        '^main'
    ]).then((output) => output.trim());

    console.log(parentBranch);
}

run();