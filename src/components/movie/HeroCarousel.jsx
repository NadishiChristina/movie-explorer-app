import Slider from 'react-slick';
import { Box, Typography, useTheme } from '@mui/material';
import movieImage from '../../assets/trending.jpg';
import genresImage from '../../assets/genre.png';
import movieNight from '../../assets/movieNight.png';

// Home Page slideshow images
const slides = [
  {
    image: movieImage,
    caption: 'Where movie nights begin — Welcome to Movie Explorer! 🎬',
  },
  {
    image: genresImage,
    caption: 'Filter and explore by your favorite genres :)',
  },
  {
    image: movieNight,
    caption: 'Streaming made easy — at home or on the go!',
  },
];

const HeroCarousel = () => {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,          // Faster slide transition
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Slides change every 3 seconds
    arrows: false,
  };

  return (
    <Box sx={{ mb: 5 }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              height: { xs: '300px', md: '550px' },
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            {/* Overlay Gradient */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
              }}
            />

            {/* Caption */}
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: 20, md: 40 },
                left: { xs: 20, md: 40 },
                zIndex: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
                  maxWidth: '80%',
                }}
              >
                {slide.caption}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroCarousel;
