import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, Typography,
  Paper, Avatar, Container, Alert, Link,
  Fade, Zoom
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

// Background images (movie-themed)
const backgroundImages = [
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
];

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const formTimer = setTimeout(() => setFormVisible(true), 300); // Time taken for login form to appear
    const bgTimer = setInterval(() => { // Background image changing duration - every 2s
      setBackgroundIndex(prev => (prev + 1) % backgroundImages.length);
    }, 2000);
    return () => {
      clearTimeout(formTimer);
      clearInterval(bgTimer);
    };
  }, []);

  const handleChange = (e) => { //Update form data after user enters
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    const success = login(username, password);
    if (success) {
      navigate('/');
    }
    else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImages[backgroundIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px) brightness(0.7)',
          transition: 'all 1.5s ease-in-out',
          zIndex: -1,
        },
      }}
    >
      <Container component="main" maxWidth="xs" sx={{ zIndex: 1 }}>
        <Zoom in={formVisible} timeout={700}>
          <Paper
            elevation={16}
            sx={{
              p: 4,
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              color: '#1E293B',
              transform: 'perspective(1000px)',
              transition: 'all 0.4s ease-in-out',
              '&:hover': {
                transform: 'perspective(1000px) translateZ(10px)',
                boxShadow: '0 12px 40px rgba(227, 230, 235, 0.3)',
              },
            }}
          >
            <Fade in={formVisible} timeout={1200}>
              <Avatar sx={{
                m: 1,
                bgcolor: '#dea498',
                width: 56,
                height: 56,
                boxShadow: '0 4px 12px rgba(246, 59, 59, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}>
                <LockOutlined fontSize="large" />
              </Avatar>
            </Fade>

            <Fade in={formVisible} timeout={1400}>
              <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Welcome Back!
              </Typography>
            </Fade>

            <Fade in={formVisible} timeout={1600}>
              <Typography variant="body1" sx={{ color: '#64748B', mb: 3 }}>
                Please sign in to continue your movie journey
              </Typography>
            </Fade>

            {error && (
              <Fade in={!!error} timeout={500}>
                <Alert severity="error" sx={{
                  width: '100%',
                  mb: 2,
                  animation: 'pulse 1.5s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.8 },
                    '100%': { opacity: 1 },
                  }
                }}>
                  {error}
                </Alert>
              </Fade>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <Fade in={formVisible} timeout={1800}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="off"
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                  sx={{
                    mb: 2,
                    '& .MuiInputBase-root': {
                      overflow: 'hidden',
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      },
                      '&.Mui-focused': {
                        boxShadow: '0 4px 12px rgb(216, 221, 228)',
                      }
                    },
                    '& .MuiInputBase-input': {
                      color: '#100f0f',
                      padding: '16px 14px',
                    },
                    '& .MuiInputLabel-root': {
                      color: '#64748B',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#100f0f',
                    },
                    '& .MuiOutlinedInput-root fieldset': {
                      borderColor: '#100f0f',
                      transition: 'all 0.3s ease',
                    },
                    '& .MuiOutlinedInput-root:hover fieldset': {
                      borderColor: '#100f0f',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                      borderColor: '#100f0f',
                      borderWidth: '2px',
                    },
                  }}
                />
              </Fade>

              <Fade in={formVisible} timeout={2000}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{
                    mb: 2,
                    '& .MuiInputBase-root': {
                      overflow: 'hidden',
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      },
                      '&.Mui-focused': {
                        boxShadow: '0 4px 12px rgba(240, 243, 248, 0.25)',
                      }
                    },
                    '& .MuiInputBase-input': {
                      color: '#100f0f',
                      padding: '16px 14px',
                    },
                    '& .MuiInputLabel-root': {
                      color: '#100f0f',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#100f0f',
                    },
                    '& .MuiOutlinedInput-root fieldset': {
                      borderColor: '#100f0f',
                      transition: 'all 0.3s ease',
                    },
                    '& .MuiOutlinedInput-root:hover fieldset': {
                      borderColor: '#100f0f',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                      borderColor: '#100f0f',
                      borderWidth: '2px',
                    },
                  }}
                />
              </Fade>

              <Fade in={formVisible} timeout={2200}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.8,
                    borderRadius: 3,
                    background: 'linear-gradient(45deg, #690303, #fa0d2c)',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#fff',
                    boxShadow: '0 8px 16px rgba(59, 130, 246, 0.4)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #a50f0f, #ff3e55)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Sign In
                </Button>
              </Fade>

              <Fade in={formVisible} timeout={2400}>
                <Box textAlign="center" mt={2}>
                  <Typography variant="body2" sx={{ color: '#64748B' }}>
                    Don't have an account?{' '}
                    <Link href="/register" underline="hover" sx={{ color: '#fa0d2c', fontWeight: 'medium' }}>
                      Sign Up
                    </Link>
                  </Typography>
                </Box>
              </Fade>
            </Box>
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default LoginForm;
