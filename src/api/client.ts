import axios from 'axios';

export const BASE_URL = 'https://api.themoviedb.org/3';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    params:{
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'en-US',
    },
    headers: {
    Accept: 'application/json',
  },
})