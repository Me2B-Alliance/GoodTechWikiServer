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
                id={!documentType ? 'sidebar-item-selected' : 'sidebar-item'}
              >
                <h5>Home</h5>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/organizations" as="/organizations">
              <a
                id={documentType === 'Organization' ? 'sidebar-item-selected' : 'sidebar-item'}
                variant="h5"
              >
                <h5>Organizations</h5>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/events" as="/events">
              <a
                id={documentType === 'Event' ? 'sidebar-item-selected' : 'sidebar-item'}
                variant="h5"
              >
                <h5>Events</h5>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/publications" as="/publications">
              <a
                id={documentType === 'Publication' ? 'sidebar-item-selected' : 'sidebar-item'}
                variant="h6"
              >
                <h5>Publications</h5>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/products" as="/products">
              <a
                id={documentType === 'Product' ? 'sidebar-item-selected' : 'sidebar-item'}
                variant="h6"
              >
                <h5>Products</h5>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/workinggroups" as="/workinggroups">
              <a
                id={documentType === 'WorkingGroup' ? 'sidebar-item-selected' : 'sidebar-item'}
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
