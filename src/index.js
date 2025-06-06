import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00cba4',
    },
    secondary: {
      main: '#1976d2',
    },
    background: {
      default: '#1a2233',
      paper: '#232b3e',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b8c1',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    fontWeightBold: 600,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
