import { getAnalysisLeetCodeData, getLeetCodeScore } from "../services/analyze.service.js";
import { LEETCODE_USERNAMES } from "../constant/testing.js";
import fs from "fs/promises";
import path from "path";

async function testLeetCodeScore() {
    let fileContent = [];
    const outputFilePath = './src/tests/output/leetcodeScore.json';

    const dir = path.dirname(outputFilePath);
    
    for (let i=0; i<LEETCODE_USERNAMES.length; i++){
        try {
            const leetCodeData = await getAnalysisLeetCodeData(LEETCODE_USERNAMES[i]);
            if (!leetCodeData){
                console.log(`User ${LEETCODE_USERNAMES[i]} not found`);
            } else {
                const scoreData = await getLeetCodeScore(leetCodeData);
                console.log(JSON.stringify({scoreData, username: LEETCODE_USERNAMES[i]}, null, 2));
                fileContent.push({scoreData, username: LEETCODE_USERNAMES[i]});
            }
        } catch (error) {
            console.log("Error occurred while getting leetcode score: ", error.message);
        }
    }

    try {
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(outputFilePath, JSON.stringify(fileContent.sort((a, b) => a.scoreData.overall - b.scoreData.overall), null, 2));
        console.log(`Success! File saved to ${outputFilePath}`);
    } catch (err) {
        console.error("Failed to save file:", err.message);
    }
}

await testLeetCodeScore();