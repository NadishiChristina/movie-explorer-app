import { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, Slider, FormControl, 
  InputLabel, Select, MenuItem, Button, Chip, Grid 
} from '@mui/material';
import { getGenres } from '../../services/tmdbApi';

const FilterBar = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState([1900, new Date().getFullYear()]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [sortBy, setSortBy] = useState('popularity.desc');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleYearChange = (e, newVal) => setYearRange(newVal);
  // eslint-disable-next-line no-unused-vars
  const handleRatingChange = (e, newVal) => setRatingRange(newVal);

  const handleGenreSelect = (e) => {
    const genreId = e.target.value;
    if (!selectedGenres.find(g => g.id === genreId)) {
      const genre = genres.find(g => g.id === genreId);
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleRemoveGenre = (genreId) => {
    setSelectedGenres(selectedGenres.filter(genre => genre.id !== genreId));
  };

  const handleSortChange = (e) => setSortBy(e.target.value);

  const handleApplyFilters = () => {
    onFilterChange({
      genres: selectedGenres.map(genre => genre.id),
      yearRange,
      ratingRange,
      sortBy
    });
  };

  const handleResetFilters = () => {
    const defaultYear = [1900, new Date().getFullYear()];
    setSelectedGenres([]);
    setYearRange(defaultYear);
    setRatingRange([0, 5]);
    setSortBy('popularity.desc');
    onFilterChange({
      genres: [],
      yearRange: defaultYear,
      ratingRange: [0, 5],
      sortBy: 'popularity.desc'
    });
  };

  return (
    <Paper elevation={6} sx={{ p: 4, mb: 3, mt: 3, borderRadius: 9}}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Filter Movies
      </Typography>
      

      <Grid container spacing={8}>
        
        {/* Genre Filter */}
        <Grid item xs={12} md={6} lg={4}>
          
          <FormControl fullWidth size="small" sx={{ minWidth: 300 }}>
            
            <InputLabel id="genre-select-label">Select Genre</InputLabel>
            <Select
              labelId="genre-select-label"
              id="genre-select"
              value=""
              label="Select Genre"
              onChange={handleGenreSelect}
            >
              {genres.map(genre => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedGenres.map(genre => (
              <Chip 
                key={genre.id}
                label={genre.name}
                onDelete={() => handleRemoveGenre(genre.id)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Grid>

        {/* Year Range */}
        <Grid item xs={12} md={8} lg={4} mt={-2}>
          <Typography variant="subtitle1" gutterBottom fontWeight={500}>
            Release Year Range
          </Typography>
          <Slider
  value={yearRange}
  onChange={handleYearChange}
  min={1900}
  max={new Date().getFullYear()}
  sx={{
    color: '#3B82F6',
    height: 8,
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:hover, &.Mui-focusVisible, &.Mui-active': {
        boxShadow: '0px 0px 0px 8px rgba(59,130,246,0.16)',
      },
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-rail': {
      opacity: 0.3,
      backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-valueLabel': {
      backgroundColor: '#3B82F6',
      color: '#fff',
      borderRadius: '6px',
    },
  }}
/>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <Typography>{yearRange[0]}</Typography>
            <Typography>{yearRange[1]}</Typography>
          </Box>
        </Grid>

        {/* Rating Range */}
            <Grid item xs={12} md={6} lg={4} mt={-2}>
              <Typography variant="subtitle1" gutterBottom fontWeight={500}>
            Rating Range
          </Typography>
              <Slider
  value={ratingRange}
  onChange={handleRatingChange}
  min={0}
                max={5}
                step={0.5}
  sx={{
    color: '#93f226',
    height: 8,
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:hover, &.Mui-focusVisible, &.Mui-active': {
        boxShadow: '0px 0px 0px 8px rgba(59,130,246,0.16)',
      },
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-rail': {
      opacity: 0.3,
      backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-valueLabel': {
      backgroundColor: '#3B82F6',
      color: '#fff',
      borderRadius: '6px',
    },
  }}
/>
<Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <Typography>{ratingRange[0]}</Typography>
            <Typography>{ratingRange[1]}</Typography>
          </Box>

            </Grid>

        {/* Sort By */}
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="sort-select-label">Sort By</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortBy}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="popularity.desc">Popularity (High to Low)</MenuItem>
              <MenuItem value="popularity.asc">Popularity (Low to High)</MenuItem>
              <MenuItem value="vote_average.desc">Rating (High to Low)</MenuItem>
              <MenuItem value="vote_average.asc">Rating (Low to High)</MenuItem>
              <MenuItem value="release_date.desc">Newest Releases</MenuItem>
              <MenuItem value="release_date.asc">Oldest Releases</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: -2, pt: 2 }}>
    <Button 
      variant="outlined" 
      color="secondary" 
      onClick={handleResetFilters}
      sx={{ textTransform: 'none', borderRadius: 2, minWidth: 140, height: 36 }}
    >
      Reset Filters
    </Button>
    <Button 
      variant="contained" 
      color="primary" 
      onClick={handleApplyFilters}
      sx={{ textTransform: 'none', borderRadius: 2, minWidth: 140, height: 36 }}
    >
      Apply Filters
    </Button>
  </Box>
</Grid>

      </Grid>
    </Paper>
  );
};

export default FilterBar;
