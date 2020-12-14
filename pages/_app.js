/**
 * Dependencies
 */
import React from 'react'
import { Provider } from 'next-auth/client'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

/**
 * Local Dependencies
 */
import CookiePolicy from 'components/CookiePolicy'

/**
 * Styles
 */
import 'styles/bootstrap.scss'
import 'styles/App.scss'
import 'styles/tagify.scss'

const description = `This wiki was developed by the Me2B Alliance and is
offered as a public utility to help people find organizations who are working
on more respectful technology.`

/**
 * App Page
 */
export default function App(props) {
  const { Component, pageProps } = props

  return (
    <>
      <Helmet>
        <title>Good Tech Wiki</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content={description} />
      </Helmet>

      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>

      <CookiePolicy />
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
