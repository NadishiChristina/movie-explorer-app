import { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { MovieProvider } from './context/MovieContext';
import { AuthProvider } from './context/AuthContext';
import { useTheme } from './hooks/useTheme';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MovieDetailPage from './pages/MovieDetailPage';
import FavoritesPage from './pages/FavouritesPage.jsx';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './utils/ProtectedRoute';

const AppContent = () => {
  const { darkMode } = useTheme();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#d5d2d1',
          },
          secondary: {
            main: '#f50057', // to change navbar color
          },
        },
      }),
    [darkMode]
  );

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/movie/:id" 
            element={
              <ProtectedRoute>
                <MovieDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </MUIThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MovieProvider>
          <AppContent />
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;