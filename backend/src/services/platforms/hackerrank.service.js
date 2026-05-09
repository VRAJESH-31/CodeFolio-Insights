import axios from 'axios';
import { HACKERRANK_HEADERS } from '../../constants/index.js';
import ApiError from '../../utils/api-error.util.js';

const getUserInfo = async (username) => {
  try {
    const [profileRes, schoolRes, linksRes, badgesRes, certificatesRes] = await Promise.all([
      axios.get(`https://www.hackerrank.com/rest/contests/master/hackers/${username}/profile`, {
        headers: HACKERRANK_HEADERS,
      }),
      axios.get(`https://www.hackerrank.com/community/v1/hackers/${username}/hacker_schools`, {
        headers: HACKERRANK_HEADERS,
      }),
      axios.get(`https://www.hackerrank.com/rest/hackers/${username}/links`, {
        headers: HACKERRANK_HEADERS,
      }),
      axios.get(`https://www.hackerrank.com/rest/hackers/${username}/badges`, {
        headers: HACKERRANK_HEADERS,
      }),
      axios.get(`https://www.hackerrank.com/community/v1/test_results/hacker_certificate?username=${username}`, { headers: HACKERRANK_HEADERS }),
    ]);

    const profileData = profileRes.data['model'];
    if (!profileData) return null;

    return {
      profile: {
        username: profileData['username'],
        country: profileData['country'],
        languages: profileData['languages'],
        created_at: profileData['created_at'],
        avatar: profileData['avatar'],
        website: profileData['website'],
        short_bio: profileData['short_bio'],
        name: profileData['name'],
        followers_count: profileData['followers_count'],
      },
      school: schoolRes.data['data'],
      links: linksRes.data,
      badges: badgesRes.data['models'],
      certificates: certificatesRes.data['data'],
    };
  } catch (error) {
    if (error.response?.status === 404 || error.response?.status === 403) {
      return null;
    }
    throw new ApiError(500, 'Failed to connect to HackerRank service.');
  }
};

export { getUserInfo };
