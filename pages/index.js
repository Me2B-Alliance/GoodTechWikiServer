import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import HomePage from './HomePage'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f5f5'
  }
}))

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  // Pass data to the page via props
  return { props: { type: ctx.query, documents: ctx.query } }
}

export default function App({ filters, documents }) {
  return (
    <HomePage filters={filters} documents={documents.docs} />
  )
}

App.propTypes = {
  filters: PropTypes.object,
  documents: PropTypes.object
}
