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
    : '/placeholder-movie.png'; // You'll need to add a placeholder image

  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'N/A';

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s',
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="300"
          image={posterPath}
          alt={movie.title}
        />
      </Link>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Chip label={releaseYear} size="small" />
          <Rating 
            value={movie.vote_average / 2} 
            precision={0.5} 
            size="small" 
            readOnly 
          />
        </Box>
      </CardContent>
      
      <CardActions>
        <IconButton 
          aria-label="add to favorites"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(movie);
          }}
        >
          {isFavorite(movie.id) ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard;