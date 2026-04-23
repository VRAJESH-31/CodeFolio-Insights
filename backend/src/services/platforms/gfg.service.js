import axios from 'axios';
import { configBrowserPage } from '../../utils/scrapper.util.js';
import { getNormalizedGfgHeatmap } from '../../utils/calendar.util.js';
import { GFG_HEADERS } from '../../constants/platform.constants.js';
import ApiError from '../../utils/api-error.util.js';

const getUserInfo = async (username) => {
  const profilePageUrl = `https://www.geeksforgeeks.org/user/${username}`;
  let page;

  try {
    // Profile Data
    page = await configBrowserPage(
      profilePageUrl,
      'domcontentloaded',
      '.NewProfile_container__licgi',
      30000,
      30000,
    );
    const userProfileData = await page.evaluate((username) => {
      const getText = (element) => element?.textContent || 'NA';
      const profileContainer = document.querySelector(
        '.NewProfile_container__licgi',
      );
      if (!profileContainer) return null;

      const avatar =
        document
          .querySelector('.NewProfile_container__licgi img')
          ?.getAttribute('src') || 'NA';
      const guestName = getText(
        document.querySelector('.NewProfile_name__N_Nlw'),
      );
      const userTagline = getText(
        document.querySelector('.NewProfile_designation__fujtZ'),
      );
      const followersCount = getText(
        document.querySelector('.NewProfile_followData__D1eYY span'),
      );
      const followingsCount = getText(
        document.querySelector(
          '.NewProfile_followData__D1eYY span:nth-child(3)',
        ),
      );
      const aboutMe = getText(
        document.querySelector('.Overview_about-me-text__AMz1Q'),
      );
      const experienceText = getText(
        document.querySelector(
          '.Overview_section-header__lhPM2 .Overview_subheading__kZ_3w',
        ),
      );

      return {
        username,
        avatar,
        guestName,
        userTagline,
        followersCount: followersCount === 'NA' ? 0 : parseInt(followersCount),
        followingsCount:
          followingsCount === 'NA' ? 0 : parseInt(followingsCount),
        aboutMe,
        experienceInYears:
          experienceText === 'NA'
            ? 0
            : parseInt(experienceText.split(' ')[2]) || 0,
      };
    }, username);

    if (!userProfileData) return null;

    await page.close();

    // Coding Data
    page = await configBrowserPage(
      `${profilePageUrl}?tab=activity`,
      'networkidle0',
      '.ProblemNavbar_head_nav__OqbEt',
      30000,
      30000,
    );
    const userCodingData = await page.evaluate(() => {
      const getText = (element) => element?.textContent || 'NA';
      const getTitleCase = (word) =>
        word.charAt(0).toUpperCase() + word.slice(1);
      const difficultyTags = ['School', 'Basic', 'Easy', 'Medium', 'Hard'];
      const problemsSolved = {};

      const stats = Array.from(
        document.querySelectorAll(
          '.ScoreContainer_score-grid__zozAO .ScoreContainer_value__7yy7h',
        ),
      );
      const streakText = getText(
        document.querySelector('.PotdContainer_streakText__oNgWh'),
      );
      const potdStats = Array.from(
        document.querySelectorAll('.PotdContainer_statValue__nt1dr'),
      );
      const difficultyElements = Array.from(
        document.querySelectorAll('.ProblemNavbar_head_nav--text__7u4wN'),
      );

      difficultyElements.forEach((el) => {
        const parts = el.textContent.split(' ');
        const key = getTitleCase(parts[0].toLowerCase());
        const val = parts[1]?.slice(1, -1);
        problemsSolved[key] = parseInt(val) || 0;
      });

      difficultyTags.forEach((tag) => {
        if (!problemsSolved[tag]) problemsSolved[tag] = 0;
      });

      return {
        codingScore: stats[0] ? parseInt(getText(stats[0])) || 0 : 0,
        totalProblemsSolved: stats[1] ? parseInt(getText(stats[1])) || 0 : 0,
        instituteRank: stats[2] ? parseInt(getText(stats[2])) || -1 : -1,
        articlesPublished: stats[3] ? parseInt(getText(stats[3])) || 0 : 0,
        currentStreak:
          streakText !== 'NA' ? parseInt(streakText.split(' ')[0]) || 0 : 0,
        maxStreak: potdStats[0] ? parseInt(getText(potdStats[0])) || 0 : 0,
        potdsSolved: potdStats[1] ? parseInt(getText(potdStats[1])) || 0 : 0,
        problemsSolved,
      };
    });

    return { ...userProfileData, ...userCodingData };
  } catch (error) {
    if (error.name === 'TimeoutError' || error.message.includes('selector')) {
      return null;
    }
    throw new ApiError(500, 'Failed to connect to GeeksForGeeks service.');
  } finally {
    if (page) await page.close();
  }
};

const getUserSubmissions = async (username, year) => {
  const response = await axios.post(
    'https://practiceapi.geeksforgeeks.org/api/v1/user/problems/submissions/',
    {
      handle: username,
      requestType: 'getYearwiseUserSubmissions',
      year,
      month: '',
    },
    { headers: GFG_HEADERS },
  );
  return getNormalizedGfgHeatmap(response?.data?.result, year);
};

const getQuestionOfToday = async () => {
  const response = await axios.get(
    'https://practiceapi.geeksforgeeks.org/api/vr/problems-of-day/problem/today/',
  );
  if (!response.data)
    throw new ApiError(500, 'Could not fetch GFG question of today.');
  return response.data;
};

const getUserProblemsSolved = async (username) => {
  const response = await axios.post(
    'https://practiceapi.geeksforgeeks.org/api/v1/user/problems/submissions/',
    { handle: username, requestType: '', year: '', month: '' },
    { headers: GFG_HEADERS },
  );
  return response.data?.result;
};

const getInstitutionTopThreeRankedUsers = async (institution) => {
  const url = `https://www.geeksforgeeks.org/colleges/${institution}/`;
  let page;

  try {
    page = await configBrowserPage(
      url,
      'domcontentloaded',
      '.BreadCrumbs_head_singleItem__5u7Ke.BreadCrumbs_head_activeItem__ePY__',
      30000,
      30000,
    );
    const data = await page.evaluate(() => {
      const getText = (element) => element?.textContent || 'NA';
      const rows = Array.from(
        document.querySelectorAll(
          '.UserCodingProfileCard_userCodingProfileCard__0GQCR',
        ),
      );

      return rows.map((row, rowIndex) => {
        const username = getText(
          row.querySelector(
            '.UserCodingProfileCard_userCodingProfileCard_dataDiv_data--linkhandle__lZchE',
          ),
        );
        const stats = Array.from(
          row.querySelectorAll(
            '.UserCodingProfileCard_userCodingProfileCard_dataDiv_data--value__3A8Kx',
          ),
        );

        return {
          rank: rowIndex + 1,
          username,
          userProblemsSolved: stats[0] ? parseInt(getText(stats[0])) || 0 : 0,
          userCodingScore: stats[1] ? parseInt(getText(stats[1])) || 0 : 0,
          userPotdStreak: stats[2] ? parseInt(getText(stats[2])) || 0 : 0,
        };
      });
    });
    return { institution, users: data };
  } catch {
    throw new ApiError(
      500,
      'Something went wrong while fetching GFG institution top three ranked users!',
    );
  } finally {
    if (page) await page.close();
  }
};

const getInstitutionInfo = async (institution) => {
  const url = `https://www.geeksforgeeks.org/colleges/${institution}/`;
  let page;

  try {
    page = await configBrowserPage(
      url,
      'networkidle2',
      '.ColgOrgIntroCard_tabHead_details_name__zYvs8',
      30000,
      30000,
    );
    const data = await page.evaluate(() => {
      const getText = (element) => element?.textContent || 'NA';
      return {
        institutionName: getText(
          document.querySelector(
            '.ColgOrgIntroCard_tabHead_details_name__zYvs8',
          ),
        ),
        institutionLocation: getText(
          document.querySelector(
            '.ColgOrgIntroCard_tabHead_details_info_location--value__rc1Dq',
          ),
        ),
        institutionUrl: getText(
          document.querySelector(
            '.ColgOrgIntroCard_tabHead_details_info_email--link__ppVAZ',
          ),
        ),
        institutionRegisteredUsersCount:
          parseInt(
            getText(
              document.querySelector(
                '.ColgOrgIntroCard_tabHead_details_user_regs--numberCursor__uoM0s',
              ),
            ),
          ) || 0,
      };
    });
    return { institution, data };
  } catch {
    throw new ApiError(
      500,
      'Something went wrong while fetching GFG institution info!',
    );
  } finally {
    if (page) await page.close();
  }
};

const getMonthlyPotds = async (year, month) => {
  const response = await axios.get(
    `https://practiceapi.geeksforgeeks.org/api/vr/problems-of-day/problems/previous/?year=${year}&month=${month}`,
  );
  if (!response.data)
    throw new ApiError(500, 'Could not fetch GFG monthly POTDs.');
  return response.data;
};

export {
  getUserInfo,
  getUserSubmissions,
  getQuestionOfToday,
  getUserProblemsSolved,
  getInstitutionTopThreeRankedUsers,
  getInstitutionInfo,
  getMonthlyPotds,
};
