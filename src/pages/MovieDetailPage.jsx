import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import MovieDetail from '../components/movie/MovieDetail';
import { useAuth } from '../hooks/useAuth';

const MovieDetailPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container maxWidth="xl" disableGutters>
      <MovieDetail />
    </Container>
  );
};

export default MovieDetailPage;