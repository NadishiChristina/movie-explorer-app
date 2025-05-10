// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
//   AppBar, Toolbar, Typography, Box, IconButton, 
//   InputBase, Button, Avatar, Menu, MenuItem 
// } from '@mui/material';
// import { 
//   Search as SearchIcon, 
//   DarkMode, LightMode, 
//   AccountCircle 
// } from '@mui/icons-material';
// import { styled, alpha } from '@mui/material/styles';
// import { useTheme } from '../../hooks/useTheme';
// import { useAuth } from '../../hooks/useAuth';
// import { useMovie } from '../../hooks/useMovie';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// const Header = () => {
//   const navigate = useNavigate();
//   const { darkMode, toggleDarkMode } = useTheme();
//   const { isAuthenticated, user, logout } = useAuth();
//   const { handleSearch, searchQuery } = useMovie();
//   const [searchInput, setSearchInput] = useState(searchQuery);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchInput.trim()) {
//       handleSearch(searchInput);
//       navigate('/');
//     }
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     logout();
//     handleMenuClose();
//     navigate('/login');
//   };

//   return (
//     <AppBar position="sticky">
//       <Toolbar>
//         <Typography
//           variant="h6"
//           noWrap
//           component={Link}
//           to="/"
//           sx={{
//             fontWeight: 700,
//             color: 'inherit',
//             textDecoration: 'none',
//           }}
//         >
//           Movie Explorer
//         </Typography>

//         <Box component="form" onSubmit={handleSearchSubmit} sx={{ flexGrow: 1, ml: 2 }}>
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search movies..."
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </Search>
//         </Box>

//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Button color="inherit" component={Link} to="/favorites">
//             Favorites
//           </Button>
          
//           <IconButton onClick={toggleDarkMode} color="inherit">
//             {darkMode ? <LightMode /> : <DarkMode />}
//           </IconButton>

//           {isAuthenticated ? (
//             <>
//               <IconButton
//                 size="large"
//                 edge="end"
//                 color="inherit"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenuOpen}
//               >
//                 <Avatar sx={{ width: 32, height: 32 }}>
//                   {user?.username.charAt(0).toUpperCase()}
//                 </Avatar>
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: 'bottom',
//                   horizontal: 'right',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//               >
//                 <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
//               </Menu>
//             </>
//           ) : (
//             <Button color="inherit" component={Link} to="/login">
//               Login
//             </Button>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

// //NEW one
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   AppBar, Toolbar, Typography, Box, IconButton,
//   InputBase, Button, Avatar, Menu, MenuItem
// } from '@mui/material';
// import {
//   Search as SearchIcon,
//   DarkMode, LightMode,
//   AccountCircle
// } from '@mui/icons-material';
// import { styled, alpha } from '@mui/material/styles';
// import { useTheme } from '../../hooks/useTheme';
// import { useAuth } from '../../hooks/useAuth';
// import { useMovie } from '../../hooks/useMovie';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.10),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.20),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: theme.spacing(3),
//   width: '100%',
//   maxWidth: 400,
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//   },
// }));

// const Header = () => {
//   const navigate = useNavigate();
//   const { darkMode, toggleDarkMode } = useTheme();
//   const { isAuthenticated, user, logout } = useAuth();
//   const { handleSearch, searchQuery } = useMovie();
//   const [searchInput, setSearchInput] = useState(searchQuery);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchInput.trim()) {
//       handleSearch(searchInput);
//       navigate('/');
//     }
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     logout();
//     handleMenuClose();
//     navigate('/login');
//   };

//   return (
//     <AppBar position="sticky" color="primary" elevation={4}>
//       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
//         <Typography
//           variant="h6"
//           component={Link}
//           to="/"
//           sx={{
//             fontWeight: 700,
//             color: 'inherit',
//             textDecoration: 'none',
//             flexShrink: 0,
//           }}
//         >
//           🎬 Movie Explorer
//         </Typography>

//         <Box component="form" onSubmit={handleSearchSubmit} sx={{ flexGrow: 1 }}>
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search movies..."
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </Search>
//         </Box>

//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Button color="inherit" component={Link} to="/favorites">
//             Favorites
//           </Button>

//           <IconButton onClick={toggleDarkMode} color="inherit" title="Toggle Dark Mode">
//             {darkMode ? <LightMode /> : <DarkMode />}
//           </IconButton>

//           {isAuthenticated ? (
//             <>
//               <IconButton
//                 size="large"
//                 edge="end"
//                 color="inherit"
//                 aria-label="account"
//                 onClick={handleMenuOpen}
//               >
//                 <Avatar sx={{ width: 32, height: 32 }}>
//                   {user?.username?.[0]?.toUpperCase() || <AccountCircle />}
//                 </Avatar>
//               </IconButton>
//               <Menu
//                 anchorEl={anchorEl}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                 transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//               >
//                 <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
//               </Menu>
//             </>
//           ) : (
//             <Button color="inherit" component={Link} to="/login">
//               Login
//             </Button>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

//3rd one

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Box, IconButton, 
  InputBase, Button, Avatar, Menu, MenuItem,
  Tooltip
} from '@mui/material';
import { 
  Search as SearchIcon,
  Clear as ClearIcon,
  DarkMode, LightMode, 
  AccountCircle 
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useMovie } from '../../hooks/useMovie';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const { handleSearch, searchQuery, clearSearch } = useMovie();
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      handleSearch(searchInput);
      navigate('/');
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    clearSearch();
    navigate('/');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Movie Explorer
        </Typography>

        <Box component="form" onSubmit={handleSearchSubmit} sx={{ flexGrow: 1, ml: 2, display: 'flex', alignItems: 'center' }}>
          <Search sx={{ flexGrow: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search movies..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {searchQuery && (
            <Tooltip title="Clear search">
              <IconButton 
                onClick={handleClearSearch} 
                color="inherit" 
                size="small" 
                sx={{ ml: 1 }}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/favorites">
            Favorites
          </Button>
          
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          {isAuthenticated ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user?.username.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
