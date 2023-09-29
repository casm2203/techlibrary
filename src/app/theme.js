"use client"
import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      light: '#81A5F7',
      main: '#3F6CCA',
      dark: '#476AB2',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b0bec5',
      main: '#78909c',
      dark: '#455a64',
      contrastText: '#000',
    },
    green: {
      light: '#9ccc65',
      main: '#8bc34a',
      dark: '#7cb342',
      contrastText: '#fff',
    },
    favorite:{
      main: "#ff5252"
    }
  },
  components:{
    MuiButton:{
      styleOverrides: {
        root: {
          borderRadius: '2rem'
        }
      }
    }
  }
});
