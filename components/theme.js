import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6802bf',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#fc2803',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff',
    }
  },
})

export default theme
