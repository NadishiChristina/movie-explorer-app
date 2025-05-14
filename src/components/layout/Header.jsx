import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Box, IconButton, 
  InputBase, Button, Avatar, Menu, MenuItem,
  Tooltip, Badge, Drawer, List, ListItem, ListItemIcon, 
  ListItemText, Divider, useMediaQuery
} from '@mui/material';
import { 
  Search as SearchIcon,
  Clear as ClearIcon,
  DarkMode, LightMode, 
  AccountCircle, Favorite, Home,
  Menu as MenuIcon, Settings, Logout as LogoutIcon,
  Person as PersonIcon, Movie as MovieIcon
} from '@mui/icons-material';
import { styled, alpha, useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useMovie } from '../../hooks/useMovie';
import logoLight from '../../assets/logolight.png';
import logoDark from '../../assets/logodark.png';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  backdropFilter: 'blur(10px)',
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(18, 18, 18, 0.8)' 
    : 'rgba(255, 255, 255, 0.8)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.12)',
  }
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 30,
  border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.7),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
  },
  '&:focus-within': {
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.paper,
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
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  padding: '6px 16px',
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.2s ease',
  marginLeft: theme.spacing(1),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
}));

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '50%',
  padding: 8,
  marginLeft: theme.spacing(1),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    transform: 'rotate(30deg)',
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 38,
  height: 38,
  cursor: 'pointer',
  border: `2px solid ${theme.palette.primary.main}`,
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}, 0 0 0 4px ${theme.palette.primary.main}`,
  },
}));

// eslint-disable-next-line no-unused-vars
const LogoWrapper = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const { handleSearch, searchQuery, clearSearch } = useMovie();
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  // Check if we're on the login page
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

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

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const mobileDrawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleMobileDrawer}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={darkMode ? logoDark : logoLight}
          alt="Logo"
          style={{ height: '60px' }}
        />
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <Home color="primary" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {!isLoginPage && isAuthenticated && (
          <ListItem button component={Link} to="/favorites">
            <ListItemIcon>
              <Favorite color="error" />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>
        )}
      </List>
      <Divider />
      {isAuthenticated ? (
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={user?.username} secondary="Account" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem button component={Link} to="/login">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <StyledAppBar position="sticky">
      <Toolbar sx={{ py: 0.5 }}>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileDrawer}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <LogoWrapper to="/">
          <img
            src={darkMode ? logoDark : logoLight}
            alt="Logo"
            style={{ height: '60px', marginRight: '10px' }}
          />
        </LogoWrapper>

        {/* Only show search bar if NOT on login page */}
        {!isLoginPage && (
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ flexGrow: 1, ml: 2, display: 'flex', alignItems: 'center' }}>
            <Search>
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
            {searchInput && (
              <Tooltip title="Clear search">
                <IconButton 
                  onClick={handleClearSearch} 
                  color="primary" 
                  size="small" 
                  sx={{ 
                    ml: 1,
                    backgroundColor: alpha(muiTheme.palette.error.main, 0.1),
                    '&:hover': { backgroundColor: alpha(muiTheme.palette.error.main, 0.2) }
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}

        {/* Add a spacer div when on login page to maintain layout */}
        {isLoginPage && <Box sx={{ flexGrow: 1 }} />}

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 'auto' }}>
          {!isLoginPage && isAuthenticated && (
            <NavButton 
              color="primary" 
              variant="outlined" 
              component={Link} 
              to="/favorites"
              startIcon={<Favorite />}
            >
              Favorites
            </NavButton>
          )}
          
          <ThemeToggleButton onClick={toggleDarkMode} size="medium">
            {darkMode ? <LightMode /> : <DarkMode />}
          </ThemeToggleButton>

          {isAuthenticated ? (
            <>
              <Box sx={{ ml: 2 }}>
                <Tooltip title={`Signed in as ${user?.username}`}>
                  <UserAvatar onClick={handleMenuOpen}>
                    {user?.username.charAt(0).toUpperCase()}
                  </UserAvatar>
                </Tooltip>
              </Box>
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
                sx={{
                  '& .MuiPaper-root': {
                    borderRadius: 2,
                    minWidth: 180,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    mt: 1.5,
                  }
                }}
              >
                <MenuItem onClick={handleMenuClose} sx={{ gap: 1.5 }}>
                  <PersonIcon fontSize="small" color="primary" />
                  <Typography>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ gap: 1.5 }}>
                  <LogoutIcon fontSize="small" color="error" />
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <NavButton 
              color="primary" 
              variant="contained" 
              component={Link} 
              to="/login"
              sx={{
                background: theme => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
              }}
            >
              Login
            </NavButton>
          )}
        </Box>
      </Toolbar>
      
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={toggleMobileDrawer}
      >
        {mobileDrawer}
      </Drawer>
    </StyledAppBar>
  );
};

export default Header;