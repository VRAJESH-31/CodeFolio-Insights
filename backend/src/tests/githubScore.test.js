import { getAnalysisGithubData, getGithubScore } from "../services/analyze.service.js";
import { GITHUB_USERNAMES } from "../constant/testing.js";
import fs from "fs/promises";
import path from "path";

async function testGithubScore() {
    let fileContent = [];
    const outputFilePath = './src/tests/output/githubScore.json';

    const dir = path.dirname(outputFilePath);
    
    for (let i=0; i<GITHUB_USERNAMES.length; i++){
        try {
            const githubData = await getAnalysisGithubData(GITHUB_USERNAMES[i]);
            if (!githubData){
                console.log(`User ${GITHUB_USERNAMES[i]} not found`);
            } else {
                const scoreData = await getGithubScore(githubData);
                console.log(JSON.stringify({scoreData, username: GITHUB_USERNAMES[i]}, null, 2));
                fileContent.push({scoreData, username: GITHUB_USERNAMES[i]});
            }
        } catch (error) {
            console.log("Error occurred while getting github score: ", error.message);
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

await testGithubScore();