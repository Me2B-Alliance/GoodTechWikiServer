/**
 * Dependencies
 */
import Link from 'next/link'
import PropTypes from 'prop-types'

/**
 * Sidebar Component
 */
export default function Sidebar(props) {
  const { documentType } = props

  return (
    <>
      <div id="sidebar">
        <ul className="list-unstyled">

          <li>
            <Link href="/" as="/">
              <a
                style={{ color: !documentType ? '#f58a0b' : '#999999' }}
              >
                <h5>Home</h5>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/organizations" as="/organizations">
              <a
                style={{ color: documentType === 'Organization' ? '#f58a0b' : '#999999' }}
                variant="h5"
              >
                <h5>Organizations</h5>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/events" as="/events">
              <a
                style={{ color: documentType === 'Event' ? '#f58a0b' : '#999999' }}
                variant="h5"
              >
                <h5>Events</h5>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/publications" as="/publications">
              <a
                style={{ color: documentType === 'Publication' ? '#f58a0b' : '#999999' }}
                variant="h6"
              >
                <h5>Publications</h5>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/products" as="/products">
              <a
                style={{ color: documentType === 'Product' ? '#f58a0b' : '#999999' }}
                variant="h6"
              >
                <h5>Products</h5>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/workinggroups" as="/workinggroups">
              <a
                style={{ color: documentType === 'WorkingGroup' ? '#f58a0b' : '#999999' }}
                variant="h6"
              >
                <h5>Working Groups</h5>
              </a>
            </Link>
          </li>
        </ul>

        <p id="sidebar-about-text" className="small">
          This wiki was developed by the Me2B Alliance and is offered
          as a public utility to help people find organizations who
          are working on more respectful technology.
        </p>

      </div>
    </>
  )
}

Sidebar.propTypes = {
  documentType: PropTypes.string
}
