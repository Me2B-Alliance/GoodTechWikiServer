import { Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'
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
    minHeight: '100vh',
  },
  main: {
    marginBottom: theme.spacing(2),
    flexGrow: 1,
  },
  body: {
    width: '100%',
  }
}))

export default function HomePage(props) {
  const classes = useStyles()

  const { filters, type } = props

  return (
    <div className={classes.root}>
      <Header />

      <div className={classes.main}>
        <Grid container>
          <Hidden smDown>
            <Grid item xs={12} md={2}>
              <Sidebar type={type} />
            </Grid>
          </Hidden>
          <Grid xs={12} md={10} item>
            <Container>
              {type !== undefined &&
                <div className={classes.body}>
                  <Filters filters={filters} type={type} />
                  <ItemList type={type} />
                </div>
                ||
                <div className={classes.body}>
                  <Typography style={{ textAlign: 'center', paddingTop: '20px' }}>
                    This wiki was developed by the Me2b Alliance and is offered
                    as a public utility to help people find organizations who
                    are working on more ethical technology.
                  </Typography>
                  <Typography style={{ textAlign: 'center', paddingTop: '20px' }}>
                    Start browsing the wiki by selecting a type in the sidebar
                  </Typography>

                </div>
              }
            </Container>
          </Grid>
        </Grid>
      </div>

      <Footer />
    </div>
  )
}

HomePage.propTypes = {
  filters: PropTypes.object,
  type: PropTypes.string
}
