import axios from 'axios';

const API_KEY = 'd935aee9';
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export const fetchMovies = async (query: string, page: number, type: string) => {
  const typeQuery = type !== 'ALL' ? `&type=${type}` : '';
  const response = await axios.get(`${BASE_URL}&s=${query}&page=${page}${typeQuery}`);
  return response.data;
};
