import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Footer from '../components/Footer'
import Header from '../components/Header'
import HomePage from './HomePage'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f5f5',
  },
}))

export default function Home() {
  const classes = useStyles()

  return (
    <React.Fragment>
      { /*<Container maxWidth="xl" className={classes.root}> */}
      <Header />
      <HomePage />
      <Footer />
      {/*</Container> */}
    </React.Fragment >
  )
}
