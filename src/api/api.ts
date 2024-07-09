import axios from 'axios';

const PROXY_API_URL = 'http://localhost:3000/api/v1/discount';

export const fetchGames = async (pageNumber: number, pageSize: number) => {
  try {
    const response = await axios.get(PROXY_API_URL, {
      params: {
        platformType: 'SWITCH',
        regionType: 'US',
        pageSize,
        pageNumber
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};
