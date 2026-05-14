import simpleGit from "simple-git";
import { GoogleGenAI } from "@google/genai";
import CONF from "../config/env.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const git = simpleGit();

const genAI = new GoogleGenAI({
    apiKey: CONF.GEMINI_API_KEY,
});

const run = async () => {
    try {
        const branch = await git.branch();
        const currentBranch = branch.current;

        if (currentBranch === "main" || currentBranch === "master") {
            console.log(`Currently on ${currentBranch} branch. Please switch to a develop or feature branch to generate a PR.`);
            return;
        }

        console.log(`🚀 Generating PR description for branch: ${currentBranch}`);


        // 1. Detect Parent/Base Branch
        let baseBranch = process.argv[2] || "main";

        try {
            await git.revparse(["--verify", baseBranch]);
            // Check if it has a common ancestor
            await git.raw(["merge-base", baseBranch, currentBranch]);
        } catch (error) {
            console.error(`❌ Error: Base branch '${baseBranch}' is invalid or has no common history with '${currentBranch}'.`);
            return;
        }

        console.log(`📊 Comparing against base: ${baseBranch}`);


        // 2. Get Diffs and Commits
        // Exclude lock files and binary files to keep diff high-signal and smaller
        const diffArgs = [
            `${baseBranch}...${currentBranch}`,
            "--",
            ".",
            ":!**/package-lock.json",
            ":!**/yarn.lock",
            ":!**/pnpm-lock.yaml",
            ":!**/*.png",
            ":!**/*.jpg",
            ":!**/*.jpeg",
            ":!**/*.gif",
            ":!**/*.svg",
            ":!**/*.ico",
            ":!**/*.pdf"
        ];

        const [rawDiff, summary, log] = await Promise.all([
            git.diff(diffArgs),
            git.diffSummary(diffArgs),
            git.log({ from: baseBranch, to: currentBranch })
        ]);

        if (!rawDiff && summary.files.length === 0) {
            console.log("No differences found between current branch and base branch.");
            return;
        }

        // Truncate diff if it's too large to avoid hitting API limits or 429s
        const MAX_DIFF_SIZE = 3000000;
        let diff = rawDiff;

        if (diff.length > MAX_DIFF_SIZE) {
            console.log(`⚠️ Diff is too large (${diff.length} characters). Truncating to ${MAX_DIFF_SIZE} characters for the AI...`);
            diff = diff.substring(0, MAX_DIFF_SIZE) + "\n\n... [Diff truncated for size] ...";
        }

        const changedFileList = summary.files.map(f => `- ${f.file}`).join('\n');
        const commitMsgs = log.all.map(c => `- ${c.message}`).join('\n');

        console.log("Changed Files: ", changedFileList);
        console.log("Commit Messages: ", commitMsgs);


        // 3. Load Prompt and Template
        const promptPath = path.resolve(__dirname, "../prompts/pr-generator.prompt.txt");
        const templatePath = path.resolve(__dirname, "../templates/pr.template.md");
        const outputsDir = path.resolve(__dirname, "../outputs");
        const sanitizedBranchName = currentBranch.replace(/\//g, "_");
        const outputPath = path.join(outputsDir, `PR_${sanitizedBranchName}_${Date.now()}.md`);

        const [promptTemplate, prTemplate] = await Promise.all([
            fs.readFile(promptPath, "utf-8"),
            fs.readFile(templatePath, "utf-8")
        ]);


        // 4. Prepare Prompt
        const finalPrompt = promptTemplate
            .replace("{{BASE_BRANCH}}", baseBranch)
            .replace("{{CURRENT_BRANCH}}", currentBranch)
            .replace("{{CHANGED_FILES}}", changedFileList)
            .replace("{{COMMITS}}", commitMsgs)
            .replace("{{DIFF}}", diff)
            .replace("{{PR_TEMPLATE}}", prTemplate);

        console.log(`🤖 Prompt size: ${finalPrompt.length} characters`);
        console.log("🤖 Asking Gemini to generate description...");


        // 5. Generate Content
        let response = await genAI.models.generateContent({
            model: CONF.GEMINI_API_MODEL,
            contents: finalPrompt,
        });

        const prDescription = response.text;


        // 6. Write Output
        await fs.mkdir(outputsDir, { recursive: true });
        await fs.writeFile(outputPath, prDescription);

        console.log(`\n✅ PR Description generated successfully!`);
        console.log(`📄 Saved to: ${outputPath}`);

    } catch (error) {
        console.error("\n❌ Error during PR generation:");
        if (error.status === 429) {
            console.error("The Gemini API returned a 429 (Too Many Requests) error. This often means your quota is exceeded or the payload is too large for your current tier.");
        } else {
            console.error(error);
        }
    }
};

run();