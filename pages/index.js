import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import HomePage from './HomePage'

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
  return { props: { type: ctx.query } }
}

export default function App({ filters, type }) {
  const classes = useStyles()

  console.log(type)

  return (
    <HomePage type={type.type} />
  )
}


App.propTypes = {
  filters: PropTypes.object,
  type: PropTypes.object
}
