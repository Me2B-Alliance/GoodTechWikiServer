/**
 * Dependencies
 */
import PropTypes from 'prop-types'

/**
 * Local Dependencies
 */
import HomePage from './HomePage'

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  // Pass data to the page via props
  return { props: { query: ctx.query } }
}

/**
 * App
 */
export default function App({ query }) {
  return (
    <HomePage documents={query.docs} userInfo={query.userInfo} />
  )
}

App.propTypes = {
  query: PropTypes.object
}
