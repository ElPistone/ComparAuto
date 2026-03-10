// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import Catalogue from './pages/Catalogue/Catalogue';
import Comparison from './pages/Comparison/Comparison'; 
import { colors } from './utils/colors';

// Création du thème Material UI
const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    background: {
      default: colors.background,
      paper: colors.cardBg,
    },
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          { <Route path="/catalogue" element={<Catalogue />} /> }
          { <Route path="/comparison" element={<Comparison />} /> }
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;