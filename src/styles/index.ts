import { createTheme, Theme } from '@mui/material';

const font = '"Lato", sans-serif';
const theme: Theme = createTheme({
  typography: {
    fontFamily: font,
  },
  palette: {
    background: {
      default: '#f9f9f9',
    },
  },
  spacing: 10,
});

export default theme;
