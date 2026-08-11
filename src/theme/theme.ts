import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#10110f',
      paper: '#181a17',
    },
    primary: {
      main: '#c6a15b',
    },
    text: {
      primary: '#e8e5dc',
      secondary: '#aaa79e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});