import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import theme from '../components/theme'

export default function App(props) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Helmet>
        <title>Good Tech Wiki</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Helmet>

      <link href="https://fonts.googleapis.com/css2?family=Encode+Sans+Condensed&display=swap" rel="stylesheet"/>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
    </React.Fragment>
  )
}

App.propTypes = {
        Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
