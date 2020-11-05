import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6802bf'
    },
    secondary: {
      main: '#f58a0b'
    },
    error: {
      main: '#fc2803'
    },
    background: {
      default: '#ffffff'
    },
    text: {
      primary: '#000000',
      secondary: '##999999'
    }
  },
  typography: {
    fontFamily: 'Encode Sans',
    fontSize: 16,
    fontWeightBold: 800,
    fontWeightLight: 200,
    fontWeightMedium: 600,
    fontWeightRegular: 400,
    h5: {
      fontWeight: 600
    },
    h4: {
      fontWeight: 700,
      fontSize: 'calc(1.2em + 1vw)'
    },
    h3: {
      fontSize: 'calc(2em + 1vw)'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
})

export default theme
