import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardMedia, CardContent, Typography,
  CardActions, IconButton, Box, Chip, Rating
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useMovie } from '../../hooks/useMovie';

const MovieCard = ({ movie }) => {
  const { toggleFavorite, isFavorite } = useMovie();
  const [isHovered, setIsHovered] = useState(false);

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const posterPath = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : '/placeholder-movie.png';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  return (
    <Card
      sx={{
        height: 400,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        boxShadow: 3,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="400"
          image={posterPath}
          alt={movie.title}
          sx={{
            objectFit: 'cover',
            filter: isHovered ? 'brightness(50%)' : 'brightness(100%)',
            transition: 'filter 0.3s ease',
          }}
        />

        {/* Hover Detail Overlay */}
        {isHovered && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              color: '#fff',
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {movie.title}
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ opacity: 0.8 }}>
              {movie.overview?.slice(0, 100)}...
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip label={releaseYear} size="small" color="primary" />
              <Rating
                value={movie.vote_average / 2}
                precision={0.5}
                size="small"
                readOnly
              />
            </Box>
          </Box>
        )}
      </Link>

      {/* Floating Favorite Icon */}
      <CardActions
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '50%',
        }}
      >
        <IconButton
          aria-label="add to favorites"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(movie);
          }}
          sx={{ color: 'white' }}
        >
          {isFavorite(movie.id) ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
