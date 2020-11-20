/**
 * Dependencies
 */
import PropTypes from 'prop-types'

/**
 * Sidebar
 */
export default function Sidebar(props) {
  const { documentType } = props

  return (
    <>
      <div id="sidebar">
        <ul className="list-unstyled">

          <li>
            <a
              style={{ color: !documentType ? '#f58a0b' : '#999999' }}
              href="/"
            >
              <h5>Home</h5>
            </a>
          </li>

          <li>
            <a
              style={{ color: documentType === 'Organization' ? '#f58a0b' : '#999999' }}
              variant="h5"
              href="/organizations"
            >
              <h5>Organizations</h5>
            </a>
          </li>

          <li>
            <a
              style={{ color: documentType === 'Event' ? '#f58a0b' : '#999999' }}
              variant="h5"
              href="/events"
            >
              <h5>Events</h5>
            </a>
          </li>

          <li>
            <a
              style={{ color: documentType === 'Publication' ? '#f58a0b' : '#999999' }}
              variant="h6"
              href="/publications"
            >
              <h5>Publications</h5>
            </a>
          </li>

          <li>
            <a
              style={{ color: documentType === 'Product' ? '#f58a0b' : '#999999' }}
              variant="h6"
              href="/products"
            >
              <h5>Products</h5>
            </a>
          </li>
          <li>
            <a
              style={{ color: documentType === 'WorkingGroup' ? '#f58a0b' : '#999999' }}
              variant="h6"
              href="/workinggroups"
            >
              <h5>Working Groups</h5>
            </a>
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
