import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import Footer from '../components/Footer'
import Header from '../components/Header'
import HomePage from './HomePage'
import LandingPage from './LandingPage'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f5f5',
  },
}))

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  //const res = await fetch(`https://.../data`)
  //const data = await res.json()

  // Pass data to the page via props
  return { props: { filters: ctx.query } }
}

export default function App({ filters }) {
  const classes = useStyles()

  return (
    <React.Fragment>
      { /*<Container maxWidth="xl" className={classes.root}> */}
      { /*
      <Header />
      <HomePage filters={filters} />
      <Footer />
      */ }
      {/*</Container> */}
      <LandingPage/>
    </React.Fragment >
  )
}


App.propTypes = {
  filters: PropTypes.object,
}
