import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Container, Grid, Typography, Chip, 
  Button, Rating, CircularProgress, Paper, 
  IconButton, Divider, List, ListItem, ListItemText, 
  ListItemAvatar, Avatar 
} from '@mui/material';
import { 
  Favorite, FavoriteBorder, 
  ArrowBack, YouTube 
} from '@mui/icons-material';
import { getMovieDetails } from '../../services/tmdbApi';
import { useMovie } from '../../hooks/useMovie';


const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useMovie();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Container>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error" variant="h6">
            {error || 'Movie not found'}
          </Typography>
          <Button 
            startIcon={<ArrowBack />} 
            onClick={() => navigate(-1)}
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.png';

  // Find YouTube trailer
  const trailer = movie.videos?.results.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  // Get main cast (top 6)
  const mainCast = movie.credits?.cast.slice(0, 6) || [];

  return (
    <Box>
      {/* Backdrop Image */}
      {backdropUrl && (
        <Box
          sx={{
      height: { xs: '300px', sm: '450px', md: '600px' }, // Increased heights
            width: '100%',
            position: 'relative',
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${backdropUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <Container maxWidth="lg" sx={{ mt: backdropUrl ? -10 : 4, position: 'relative', zIndex: 1 }}>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate(-1)}
          variant="contained"
          sx={{ mb: 2 }}
        >
          Back
        </Button>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={4}>
            {/* Movie Poster */}
            <Grid item xs={12} sm={4} md={3}>
              <Box
                component="img"
                src={posterUrl}
                alt={movie.title}
                sx={{
                  width: '100%',
                  borderRadius: 1,
                  boxShadow: 3,
                }}
              />
            </Grid>

            {/* Movie Info */}
            <Grid item xs={12} sm={8} md={9}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {movie.title} 
                  {movie.release_date && (
                    <Typography component="span" variant="h5" color="text.secondary">
                      {` (${new Date(movie.release_date).getFullYear()})`}
                    </Typography>
                  )}
                </Typography>

                <IconButton
                  onClick={() => toggleFavorite(movie)}
                  aria-label="add to favorites"
                  sx={{ mt: 1 }}
                >
                  {isFavorite(movie.id) ? (
                    <Favorite color="error" fontSize="large" />
                  ) : (
                    <FavoriteBorder fontSize="large" />
                  )}
                </IconButton>
              </Box>

              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating 
                  value={movie.vote_average / 2} 
                  precision={0.5} 
                  readOnly 
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
                </Typography>
              </Box>

              {/* Genres */}
              <Box sx={{ mb: 2 }}>
                {movie.genres.map(genre => (
                  <Chip 
                    key={genre.id} 
                    label={genre.name} 
                    sx={{ mr: 1, mb: 1 }} 
                  />
                ))}
              </Box>

              {/* Runtime & Release Date */}
              <Typography variant="body1" gutterBottom>
                {movie.runtime && `${movie.runtime} min • `}
                {movie.release_date && new Date(movie.release_date).toLocaleDateString()}
              </Typography>

              {/* Overview */}
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {movie.overview || 'No overview available.'}
              </Typography>

              {/* Trailer Button */}
              {trailer && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<YouTube />}
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Trailer
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>

        {/* Cast Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Top Cast
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          {mainCast.length > 0 ? (
            <Grid container spacing={2}>
             {mainCast.map(person => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={person.id}>
                  <List disablePadding>
                    <ListItem alignItems="flex-start" disableGutters>
                      <ListItemAvatar>
                        <Avatar
                          alt={person.name}
                          src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : '/placeholder-person.png'}
                          sx={{ width: 56, height: 56, mr: 2 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={person.name}
                        secondary={person.character}
                      />
                    </ListItem>
                  </List>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">No cast information available.</Typography>
          )}
        </Paper>

        {/* Additional Information */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Additional Information
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            {/* Production Companies */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Production Companies
              </Typography>
              {movie.production_companies && movie.production_companies.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {movie.production_companies.map(company => (
                    <Chip key={company.id} label={company.name} />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2">No production companies listed.</Typography>
              )}
            </Grid>

            {/* Production Countries */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Production Countries
              </Typography>
              {movie.production_countries && movie.production_countries.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {movie.production_countries.map((country, index) => (
                    <Chip key={index} label={country.name} />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2">No production countries listed.</Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default MovieDetail;