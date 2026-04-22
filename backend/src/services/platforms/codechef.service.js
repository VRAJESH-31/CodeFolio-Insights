import { configBrowserPage } from "../../utils/scrapper.util.js";
import { getNormalizedCodeChefHeatmap } from "../../utils/calendar.util.js";
import ApiError from "../../utils/api-error.util.js";

const getUserInfo = async (username, includeAchievements, includeContests) => {
    const url = `https://www.codechef.com/users/${username}`;
    let page;

    try {
        page = await configBrowserPage(url, 'networkidle0', '.user-details-container.plr10', 30000, 30000);

        const data = await page.evaluate(async (username, includeAchievements, includeContests) => {

            const getText = (element) => element?.textContent || "NA";
            const profileContainer = document.querySelector(".user-details-container");
            if (!profileContainer) return null;

            const problemsSolvedElement = Array.from(document.querySelectorAll(".rating-data-section.problems-solved h3"));
            const profileImageElement = document.querySelector(".profileImage");
            const leagueBadgeElement = document.querySelector(".user-league-container > img");

            const problemsSolved = problemsSolvedElement ? getText(problemsSolvedElement.at(-1)).split(" ").at(-1) : "NA";
            const profileImage = profileImageElement?.getAttribute("src") || "NA";

            const codechefData = {
                username: username,
                problemsSolved: problemsSolved == "NA" ? "NA" : parseInt(problemsSolved),
                profileImage: profileImage,
                leagueBadge: leagueBadgeElement?.getAttribute("src"),
            }

            if (includeAchievements) {
                const achievementsElement = Array.from(document.querySelectorAll(".widget.badges"));

                const skillTestElement = achievementsElement.length == 2 ? Array.from(achievementsElement[0].querySelectorAll(".skill-tests__block")) : null;
                const badgesElement = achievementsElement.length == 2 ? Array.from(achievementsElement[1].querySelectorAll(".badge")) : Array.from(achievementsElement[0].querySelectorAll(".badge"));

                // Skill Tests
                const skillTests = skillTestElement ? skillTestElement.map((skillTestElement) => {
                    const percentageScore = getText(skillTestElement.querySelector(".score__percentage"));
                    return {
                        percentageScore: parseInt(percentageScore.slice(0, percentageScore.length - 1)),
                        title: getText(skillTestElement.querySelector(".skill-tests__title")),
                        link: "https://www.codechef.com/" + skillTestElement.querySelector("a").getAttribute("href"),
                        attemptDate: getText(skillTestElement.querySelector(".skill-tests__description")).split(" ").splice(2, 2).join(" "),
                    };
                }) : [];

                // Badges
                const badges = badgesElement.map((badge) => {
                    return {
                        badgeImage: badge.querySelector("img").getAttribute("src"),
                        badgeTitle: getText(badge.querySelector(".badge__title")).split("-")[0]?.trim(),
                        badgeLevel: getText(badge.querySelector(".badge__title")).split("-")[1]?.trim(),
                        badgeDescription: getText(badge.querySelector(".badge__description")),
                    }
                });

                codechefData.badges = badges;
                codechefData.skillTests = skillTests;
            }

            if (includeContests) {
                // Rating and rank info from the sidebar widget
                const ratingNumberElement = document.querySelector(".rating-number");
                const highestRatingElement = document.querySelector(".rating-header small");
                const globalRankElement = document.querySelector(".rating-ranks li:nth-child(1) strong");
                const countryRankElement = document.querySelector(".rating-ranks li:nth-child(2) strong");
                const contestCountElement = document.querySelector(".contest-participated-count b");
                const starsElement = document.querySelector(".rating-star");

                // Per-contest history from the inline Drupal.settings JS variable
                // eslint-disable-next-line no-undef
                const allRatings = (typeof Drupal !== "undefined" && Drupal.settings?.date_versus_rating?.all)
                    // eslint-disable-next-line no-undef
                    ? Drupal.settings.date_versus_rating.all
                    : [];

                const contests = allRatings.map((contest) => ({
                    code: contest.code,
                    name: contest.name,
                    endDate: contest.end_date,
                    rating: parseInt(contest.rating),
                    rank: parseInt(contest.rank),
                    color: contest.color,
                }));

                codechefData.contests = {
                    totalContestsParticipated: contestCountElement ? parseInt(getText(contestCountElement)) : contests.length,
                    currentRating: ratingNumberElement ? parseInt(getText(ratingNumberElement)) : 0,
                    highestRating: highestRatingElement ? parseInt(getText(highestRatingElement).replace(/\D/g, "")) : 0,
                    stars: starsElement ? starsElement.querySelectorAll("span").length : 0,
                    globalRank: globalRankElement ? parseInt(getText(globalRankElement).replace(/,/g, "")) : 0,
                    countryRank: countryRankElement ? parseInt(getText(countryRankElement).replace(/,/g, "")) : 0,
                    history: contests,
                };
            }

            return codechefData;
        }, username, includeAchievements, includeContests);

        return data;
    } catch (error) {
        if (error.name === 'TimeoutError' || error.message.includes('selector')) {
            return null;
        }
        throw new ApiError(500, "Failed to connect to CodeChef service.");
    } finally {
        if (page) await page.close();
    }
};

const getUserSubmissions = async (username) => {
    const url = `https://www.codechef.com/users/${username}`;
    let page;
    let heatmapData = {};

    try {
        page = await configBrowserPage(url, 'domcontentloaded', '.user-details-container.plr10', 30000, 30000);

        const heatmapSelectSelector = "#heatmap-period-selector";

        const heatmapOptionValues = await page.$$eval(
            `${heatmapSelectSelector} option`,
            options => options.map(option => option.value)
        );

        for (const optionValue of heatmapOptionValues) {
            await page.select(heatmapSelectSelector, optionValue);
            await page.waitForSelector('.heatmap-content', { visible: true });

            const data = await page.evaluate(() => {
                const results = {};
                const heatmapBlocks = document.querySelectorAll(".heatmap-content svg rect");

                heatmapBlocks.forEach((block) => {
                    const date = block.getAttribute("data-date");
                    const submissionsCount = block.getAttribute("data-count");

                    if (date) {
                        results[date] = (submissionsCount ? parseInt(submissionsCount, 10) : 0);
                    }
                });

                return results;
            });

            heatmapData = { ...heatmapData, ...data };
        }

        return getNormalizedCodeChefHeatmap(heatmapData);

    } catch {
        throw new ApiError(500, "Something went wrong while fetching CodeChef user submissions!");
    } finally {
        if (page) await page.close();
    }
};

export {
    getUserInfo,
    getUserSubmissions,
};
