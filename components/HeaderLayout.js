/**
 * Dependencies
 */
import { useSession } from 'next-auth/client'
import PropTypes from 'prop-types'

/**
 * Local Dependencies
 */
import Header from './Header'

/**
 * Header Layout
 */
export default function Layout({ children }) {
  const [session, loading] = useSession()

  if (!loading) {
    return (
      <>
        <Header userInfo={session ? session.user : {}} />

        <div>{children}</div>
      </>
    )
  }

  return (
    <>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.array
}
