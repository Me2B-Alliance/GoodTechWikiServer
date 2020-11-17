import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import Container from '@material-ui/core/Container'

import Footer from '../components/Footer'
import Header from '../components/Header'
import ItemList from '../components/ItemList'
import cookieConsent from '../components/CookieConsent'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginBottom: theme.spacing(2),
    flexGrow: 1
  },
  body: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  homeText: {
    paddingLeft: '80px'
  }
}))

const Sidebar = dynamic(() => import('../components/Sidebar'))

export default function HomePage(props) {
  const classes = useStyles()

  const { documents, userInfo } = props

  let documentType = ''

  if (documents) {
    documentType = documents[0]['@type']
  }

  if (process.browser) {
    cookieConsent({
      cookieName: 'cookie_consent',
      message: 'Ideally, we do not collect cookies. However, if we cannot avoid them altogether, then we take steps to limit their tracking behaviors. Given the prevalence of unauthorized tracking agents online, we regularly audit our website, alert you to their presence, and make it easy for you to opt out of cookies without losing any of this site’s functionality. By clicking “Accept all”, you consent to the use of ALL the cookies.',
      options: [
        {
          title: 'Necessary',
          description: 'Necessary cookies are absolutely essential for the website to function properly. This category only includes cookies that ensures basic functionalities and security features of the website. These cookies do not store any personal information.',
          key: 'necessary',
          disabled: true,
          checked: true
        },
        {
          title: 'Non-Necessary',
          description: 'Any cookies that may not be particularly necessary for the website to function and is used specifically to collect user personal data via analytics, ads, other embedded contents are termed as non-necessary cookies. It is mandatory to procure user consent prior to running these cookies on your website.',
          key: 'non-necessary',
          disabled: false,
          checked: false
        }
      ],
      learnMore: 'https://www.cookie.com/gdpr',
      expiration: 1,
      color: '#f58a0b'
    })
  }

  return (
    <div className={classes.root}>
      <Header userInfo={userInfo} />

      <div className={classes.main}>
        <Container className={classes.body}>
          <Grid container>
            <Hidden initialWidth="md" smDown>
              <Grid item xs={12} md={2}>
                <Sidebar documentType={documentType} />
              </Grid>
            </Hidden>
            <Grid xs={12} md={10} item>
              {documentType !== ''
                && (
                  <div style={{ paddingLeft: '80px' }}>
                    <ItemList documents={documents} type={documentType} />
                  </div>
                )
                || (
                  <div className={classes.homeText}>
                    <Typography variant="subtitle1" style={{ textAlign: 'left', paddingTop: '80px' }}>
                      This wiki was developed by the Me2B Alliance and is offered
                      as a public utility to help people find organizations who
                      are working on more respectful technology.
                    </Typography>
                    <Typography style={{ paddingTop: '20px' }}>
                      Start browsing the wiki by selecting a type in the sidebar
                    </Typography>
                  </div>
                )}
            </Grid>
          </Grid>
        </Container>
      </div>

      <Footer />
    </div>
  )
}

HomePage.propTypes = {
  documents: PropTypes.array,
  userInfo: PropTypes.string
}
