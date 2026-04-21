import { createTheme } from '@mui/material/styles';

export function createAppTheme(direction: 'ltr' | 'rtl') {
  return createTheme({
    direction,
    palette: {
      primary: {
        main: '#1e3c58',
        light: '#4a6a82',
        dark: '#0e2236',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#00897b',
        light: '#4ebaaa',
        dark: '#005b4f',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f5f7fa',
        paper: '#ffffff',
      },
    },
    typography: {
      fontFamily: direction === 'rtl'
        ? '"Assistant", "Roboto", "Helvetica", "Arial", sans-serif'
        : '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'medium',
          fullWidth: true,
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            position: 'fixed',
            bottom: 80,
            zIndex: 1000,
          },
        },
      },
    },
  });
}
