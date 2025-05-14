import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
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
        {/* Back Button and Heading */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<ArrowBack />} 
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          <Typography variant="h4" component="h1">
            My Favorite Movies
          </Typography>
        </Stack>

        {/* Movie Grid */}
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
