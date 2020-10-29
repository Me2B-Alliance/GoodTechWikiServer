import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import Filters from '../components/Filters'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ItemList from '../components/ItemList'
import Sidebar from '../components/Sidebar'

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
    alignItems: 'flex-start',
    paddingLeft: '110px',
    paddingRight: '150px'
  }
}))

export default function HomePage(props) {
  const classes = useStyles()

  const { filters, documents } = props

  let documentType = ''

  if (documents) {
    documentType = documents[0]['@type']
  }

  return (
    <div className={classes.root}>
      <Header />

      <div className={classes.main}>
        <Grid container>
          <Hidden smDown>
            <Grid item xs={12} md={2}>
              <Sidebar documentType={documentType} />
            </Grid>
          </Hidden>
          <Grid xs={12} md={10} item>
            {documentType !== ''
              && (
                <div className={classes.body}>
                  <Filters filters={filters} type={documentType} />
                  <ItemList documents={documents} type={documentType} />
                </div>
              )
              || (
                <div className={classes.body}>
                  <Typography variant="subtitle1" style={{ textAlign: 'left', paddingTop: '80px' }}>
                    This wiki was developed by the Me2b Alliance and is offered
                    as a public utility to help people find organizations who
                    are working on more ethical technology.
                  </Typography>
                  <Typography style={{ textAlign: 'center', paddingTop: '20px' }}>
                    Start browsing the wiki by selecting a type in the sidebar
                  </Typography>
                </div>
              )}
          </Grid>
        </Grid>
      </div>

      <Footer />
    </div>
  )
}

HomePage.propTypes = {
  filters: PropTypes.object,
  documents: PropTypes.array
}
