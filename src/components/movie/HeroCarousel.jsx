import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import movieImage from '../../assets/trending.jpg';
import genresImage from '../../assets/genre.png';
import movieNight from '../../assets/movieNight.png';

//Home Page slideshow images
const slides = [
  {
    image: movieImage,
    caption: 'Discover the latest trending movies',
  },
  {
    image: genresImage,
    caption: 'Filter and explore by your favorite genres',
  },
  {
    image: movieNight,
    caption: 'Rate and save your favorite picks',
  },
];

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              height: '550px',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                p: 2,
              }}
            >
              <Typography variant="h5">{slide.caption}</Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroCarousel;
