import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import MovieGrid from '../components/movie/MovieGrid';
import { useAuth } from '../hooks/useAuth';
import { useMovie } from '../hooks/useMovie';

const FavoritesPage = () => {
  const { isAuthenticated } = useAuth();
  const { favorites } = useMovie();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Favorite Movies
        </Typography>
        
        <MovieGrid 
          movies={favorites} 
          hasMore={false}
          loadMore={() => {}}
        />
      </Box>
    </Container>
  );
};

export default FavoritesPage;