import axios from 'axios';

// Access the tmdb api key from .env file
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Fetches a list of trending movies for the week from TMDB.
export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/trending/movie/week', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// Search movies based on a user’s input (query).
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Fetch full movie details by movieId
export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos,credits',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Fetch movies by selected genre(s) with filters
export const getMoviesByGenre = async (
  genreIds, 
  page = 1, 
  sortBy = 'popularity.desc',
  yearFrom = 1900,
  yearTo = new Date().getFullYear(),
  voteFrom = 0,
  voteTo = 10
) => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: genreIds,
        sort_by: sortBy,
        'primary_release_date.gte': `${yearFrom}-01-01`,
        'primary_release_date.lte': `${yearTo}-12-31`,
        'vote_average.gte': voteFrom,
        'vote_average.lte': voteTo,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting movies by genre:', error);
    throw error;
  }
};

// Fetches the full list of available movie genres
export const getGenres = async () => {
  try {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};