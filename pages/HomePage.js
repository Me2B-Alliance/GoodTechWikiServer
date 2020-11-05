import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import Container from '@material-ui/core/Container'

import Filters from '../components/Filters'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ItemList from '../components/ItemList'

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

const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false })

export default function HomePage(props) {
  const classes = useStyles()

  const { documents } = props

  let documentType = ''

  if (documents) {
    documentType = documents[0]['@type']
  }

  return (
    <div className={classes.root}>
      <Header />

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
  documents: PropTypes.object
}
