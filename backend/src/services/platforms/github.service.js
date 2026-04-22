import { configBrowserPage } from "../../utils/scrapper.util.js";
import ApiError from "../../utils/api-error.util.js";

const getGithubBadges = async (username) => {
    const url = `https://github.com/${username}?tab=achievements`;
    let page;

    try {
        page = await configBrowserPage(url, 'networkidle2', '.achievement-card', 30000, 30000);

        const data = await page.evaluate(() => {
            const getText = (element) => element?.textContent || "NA";
            const githubBadgesElement = Array.from(document.querySelectorAll(".achievement-card"));

            return githubBadgesElement.map((badgeElement) => {
                const iconElement = badgeElement.querySelector("img");
                const nameElement = badgeElement.querySelector(".ws-normal");
                const countElement = badgeElement.querySelector(".achievement-tier-label");

                const icon = iconElement ? iconElement.getAttribute("src") : "NA";
                const name = getText(nameElement);
                const count = getText(countElement);

                return {
                    icon: icon,
                    name: name,
                    count: count !== "NA" ? parseInt(count.slice(1, count.length)) : 1
                }
            });
        });

        return data;
    } catch {
        throw new ApiError(500, "Something went wrong while fetching Github badges!");
    } finally {
        if (page) await page.close();
    }
};

export {
    getGithubBadges,
};
