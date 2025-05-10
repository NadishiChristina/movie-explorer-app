import { createContext, useState, useEffect } from 'react';
import { getTrendingMovies, searchMovies } from '../services/tmdbApi';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('lastSearch') || '';
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('lastSearch', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchTrendingMovies = async (page = 1) => {
    setLoading(true);
    try {
      const data = await getTrendingMovies(page);
      setTrendingMovies(prevMovies => 
        page === 1 ? data.results : [...prevMovies, ...data.results]
      );
      setTotalPages(data.total_pages);
      setCurrentPage(data.page);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to fetch trending movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query, page = 1) => {
    if (!query.trim()) return;
    
    setSearchQuery(query);
    setLoading(true);
    
    try {
      const data = await searchMovies(query, page);
      setSearchResults(prevResults => 
        page === 1 ? data.results : [...prevResults, ...data.results]
      );
      setTotalPages(data.total_pages);
      setCurrentPage(data.page);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to search movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResults = () => {
    if (searchQuery) {
      handleSearch(searchQuery, currentPage + 1);
    } else {
      fetchTrendingMovies(currentPage + 1);
    }
  };

  const toggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const movieIndex = prevFavorites.findIndex(m => m.id === movie.id);
      if (movieIndex === -1) {
        return [...prevFavorites, movie];
      } else {
        return prevFavorites.filter(m => m.id !== movie.id);
      }
    });
  };

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setCurrentPage(1);
  };

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        searchResults,
        loading,
        error,
        searchQuery,
        currentPage,
        totalPages,
        favorites,
        fetchTrendingMovies,
        handleSearch,
        loadMoreResults,
        toggleFavorite,
        isFavorite,
        clearSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};