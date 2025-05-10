import { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, Slider, FormControl, 
  InputLabel, Select, MenuItem, TextField, 
  Button, Chip, Grid, IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { getGenres } from '../../services/tmdbApi';

const FilterBar = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState([1900, new Date().getFullYear()]);
  const [ratingRange, setRatingRange] = useState([0, 10]);
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

  const handleYearChange = (event, newValue) => {
    setYearRange(newValue);
  };

  const handleRatingChange = (event, newValue) => {
    setRatingRange(newValue);
  };

  const handleGenreSelect = (event) => {
    const genreId = event.target.value;
    if (!selectedGenres.includes(genreId)) {
      const genre = genres.find(g => g.id === genreId);
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleRemoveGenre = (genreId) => {
    setSelectedGenres(selectedGenres.filter(genre => genre.id !== genreId));
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleApplyFilters = () => {
    onFilterChange({
      genres: selectedGenres.map(genre => genre.id),
      yearRange,
      ratingRange,
      sortBy
    });
  };

  const handleResetFilters = () => {
    setSelectedGenres([]);
    setYearRange([1900, new Date().getFullYear()]);
    setRatingRange([0, 10]);
    setSortBy('popularity.desc');
    onFilterChange({
      genres: [],
      yearRange: [1900, new Date().getFullYear()],
      ratingRange: [0, 10],
      sortBy: 'popularity.desc'
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filter Movies
      </Typography>

      <Grid container spacing={3}>
        {/* Genre Filter */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
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

          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selectedGenres.map(genre => (
              <Chip 
                key={genre.id}
                label={genre.name}
                onDelete={() => handleRemoveGenre(genre.id)}
                size="small"
              />
            ))}
          </Box>
        </Grid>

        {/* Year Range Slider */}
        <Grid item xs={12} md={4}>
          <Typography id="year-range-slider" gutterBottom>
            Release Year
          </Typography>
          <Slider
            value={yearRange}
            onChange={handleYearChange}
            valueLabelDisplay="auto"
            min={1900}
            max={new Date().getFullYear()}
            aria-labelledby="year-range-slider"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">{yearRange[0]}</Typography>
            <Typography variant="caption">{yearRange[1]}</Typography>
          </Box>
        </Grid>

        {/* Rating Range Slider */}
        <Grid item xs={12} md={4}>
          <Typography id="rating-range-slider" gutterBottom>
            Rating (0-10)
          </Typography>
          <Slider
            value={ratingRange}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            step={0.5}
            aria-labelledby="rating-range-slider"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">{ratingRange[0]}</Typography>
            <Typography variant="caption">{ratingRange[1]}</Typography>
          </Box>
        </Grid>

        {/* Sort By */}
        <Grid item xs={12} md={4}>
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
              <MenuItem value="release_date.desc">Release Date (Newest)</MenuItem>
              <MenuItem value="release_date.asc">Release Date (Oldest)</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={handleResetFilters}>
            Reset Filters
          </Button>
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterBar;

