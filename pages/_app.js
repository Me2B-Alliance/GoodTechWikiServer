/**
 * Dependencies
 */
import React from 'react'
import { Provider } from 'next-auth/client'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

/**
 * Dependencies
 */
import Footer from 'components/Footer'
import HeaderLayout from 'components/HeaderLayout'

/**
 * Local Styles
 */
import 'styles/bootstrap.scss'
import 'styles/CookieConsent.css'
import 'styles/App.scss'

const description = `This wiki was developed by the Me2B Alliance and is
offered as a public utility to help people find organizations who are working
on more respectful technology.`

/**
 * App Page
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
        <meta name="description" content={description} />
      </Helmet>

      <Provider session={pageProps.session}>
        <HeaderLayout>
          <Component {...pageProps} />
          <Footer />
        </HeaderLayout>
      </Provider>

    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
