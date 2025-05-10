import { useEffect, useRef, useCallback } from 'react';
import { Grid, Box, Typography, Button, CircularProgress } from '@mui/material';
import MovieCard from './MovieCard';
import { useMovie } from '../../hooks/useMovie';

const MovieGrid = ({ movies, title, loadMore, hasMore }) => {
  const { loading, error } = useMovie();
  const observer = useRef();
  
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {title && (
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
      )}
      
      {movies.length === 0 && !loading ? (
        <Typography sx={{ textAlign: 'center', my: 4 }}>
          No movies found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              key={`${movie.id}-${index}`}
              ref={index === movies.length - 1 ? lastMovieElementRef : null}
            >
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {hasMore && !loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            onClick={loadMore}
            disabled={loading}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MovieGrid;