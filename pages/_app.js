/**
 * Dependencies
 */
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

/**
 * Local Styles
 */
import '../styles/bootstrap.scss'
import '../styles/App.scss'
import '../styles/CookieConsent.css'

/**
 * App
 */
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
    <>
      <Helmet>
        <title>Good Tech Wiki</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Helmet>

      <Component {...pageProps} />
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
