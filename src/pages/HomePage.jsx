import { useEffect, useState } from 'react';
import { Container, Box, Tabs, Tab, Paper } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import HeroCarousel from '../components/movie/HeroCarousel';


import MovieGrid from '../components/movie/MovieGrid';
import FilterBar from '../components/movie/FilterBar';
import { useMovie } from '../hooks/useMovie';
import { getMoviesByGenre } from '../services/tmdbApi';

const HomePage = () => {
  const { 
    trendingMovies, 
    searchResults, 
    searchQuery, 
    fetchTrendingMovies, 
    loadMoreResults,
    totalPages,
    currentPage,
  } = useMovie();
  
  const [tabValue, setTabValue] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterParams, setFilterParams] = useState(null);
  const [filterPage, setFilterPage] = useState(1);
  const [filterTotalPages, setFilterTotalPages] = useState(1);

  useEffect(() => {
    // Fetch initial trending movies when component mounts
    if (trendingMovies.length === 0 && !searchQuery) {
      fetchTrendingMovies();
    }
  }, [fetchTrendingMovies, trendingMovies.length, searchQuery]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    
    if (newValue === 0) {
      setIsFiltering(false);
    }
  };

  const handleFilterChange = async (filters) => {
    // If no genres selected, reset to trending
    if (filters.genres.length === 0) {
      setIsFiltering(false);
      setTabValue(0);
      return;
    }

    setFilterParams(filters);
    setFilterPage(1);
    setIsFiltering(true);
    setTabValue(1);
    
    try {
      const data = await getMoviesByGenre(
        filters.genres.join(','),
        1,
        filters.sortBy,
        filters.yearRange[0],
        filters.yearRange[1],
        filters.ratingRange[0],
        filters.ratingRange[1]
      );
      
      setFilteredMovies(data.results || []);
      setFilterTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  const loadMoreFilteredMovies = async () => {
    if (!filterParams || filterPage >= filterTotalPages) return;
    
    const nextPage = filterPage + 1;
    
    try {
      const data = await getMoviesByGenre(
        filterParams.genres.join(','),
        nextPage,
        filterParams.sortBy,
        filterParams.yearRange[0],
        filterParams.yearRange[1],
        filterParams.ratingRange[0],
        filterParams.ratingRange[1]
      );
      
      setFilteredMovies(prev => [...prev, ...(data.results || [])]);
      setFilterPage(nextPage);
    } catch (error) {
      console.error('Error loading more filtered movies:', error);
    }
  };

  // Determine which movies to display
  const displayMovies = searchQuery
    ? searchResults
    : isFiltering && tabValue === 1
    ? filteredMovies
    : trendingMovies;

  const hasMoreMovies = searchQuery
    ? currentPage < totalPages
    : isFiltering && tabValue === 1
    ? filterPage < filterTotalPages
    : currentPage < totalPages;

  const handleLoadMore = () => {
    if (searchQuery) {
      loadMoreResults();
    } else if (isFiltering && tabValue === 1) {
      loadMoreFilteredMovies();
    } else {
      loadMoreResults();
    }
  };

  const title = searchQuery
    ? `Search Results for "${searchQuery}"`
    : isFiltering && tabValue === 1
    ? "Filtered Movies"
    : "Trending Movies";

  return (
  <Container maxWidth="xl">
    {/* Add Slideshow here */}
    <HeroCarousel />

    {/* Filter bar section */}
    <FilterBar onFilterChange={handleFilterChange} />

    {!searchQuery && (
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab label="Trending" />
          <Tab label="Filter Results" disabled={!isFiltering} />
        </Tabs>
      </Paper>
    )}

    <MovieGrid 
      movies={displayMovies} 
      title={title}
      loadMore={handleLoadMore}
      hasMore={hasMoreMovies}
    />
  </Container>
);

};

export default HomePage;