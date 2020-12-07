/**
 * Dependencies
 */
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

/**
 * ItemCard Component
 */
export default function ItemCard({ document: doc }) {
  const router = useRouter()

  const { type } = router.query

  /**
   * ItemHeader
   */
  const ItemHeader = () => {
    const { name } = doc
    return (
      <>
        <div>
          <Link passHref href={`${type}/${encodeURIComponent(name)}`}>
            <a>
              <h3>
                {name}
              </h3>
            </a>
          </Link>
        </div>
        <div>
          <h5>
            {doc.lisa && (doc.lisa).toUpperCase()}
          </h5>
        </div>
      </>
    )
  }

  /**
   * buildEventItem
   */
  const buildEventItem = () => (
    <>
      {ItemHeader()}
      <p>
        {doc.about}
      </p>
      <p>
        {doc.website
          && (
            <a href={doc.website}>
              Website
            </a>
          )}
      </p>
    </>
  )

  /**
   * buildOrganizationItem
   */
  const buildOrganizationItem = () => (
    <>
      {ItemHeader()}
      <p>
        {doc.about}
      </p>
      <p>
        {doc.website
          && (
            <a href={doc.website}>
              Website
            </a>
          )}
      </p>
    </>
  )

  /**
   * buildProductItem
   */
  const buildProductItem = () => (
    <>
      {ItemHeader()}
      <p>
        {doc.about}
      </p>
      <p>
        {doc.url
          && (
            <a href={doc.url}>
              Website
            </a>
          )}
      </p>
    </>
  )

  /**
   * buildPublicationItem
   */
  const buildPublicationItem = () => (
    <>
      {ItemHeader()}
      <p>
        {doc.about}
      </p>
      <p>
        {doc.url && doc.publicationType !== 'to be determined'
          && (
            <a href={doc.url}>
              {doc.publicationType}
            </a>
          )}
      </p>
    </>
  )

  /**
   * buildWorkingGroupItem
   */
  const buildWorkingGroupItem = () => (
    <>
      {ItemHeader()}
      <p>
        {doc.about.length >= 1200 ? `${doc.about.slice(0, 1200)}......` : doc.about}
      </p>
      <p>
        {doc.url
          && (
            <a href={doc.url}>
              {doc.category}
            </a>
          )}
      </p>
    </>
  )

  let item = {}

  switch (doc['@type']) {
    case 'Event':
      item = buildEventItem(doc)
      break
    case 'Organization':
      item = buildOrganizationItem(doc)
      break
    case 'Product':
      item = buildProductItem(doc)
      break
    case 'Publication':
      item = buildPublicationItem(doc)
      break
    case 'WorkingGroup':
      item = buildWorkingGroupItem(doc)
      break
    default:
      break
  }

  return (
    <div id="item-card">
      {item}
    </div>
  )
}

ItemCard.propTypes = {
  document: PropTypes.object
}
