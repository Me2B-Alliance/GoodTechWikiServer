import PropTypes from 'prop-types'

const Error = ({ statusCode }) => (
  <p>
    {statusCode
      ? `An error ${statusCode} occurred on server`
      : 'An error occurred on client'}
  </p>
)

Error.getInitialProps = (res, err) => {
  const statusCode = res?.statusCode ?? err ? err.statusCode : 404
  return { statusCode }
}

export default Error

Error.propTypes = {
  statusCode: PropTypes.number
}
