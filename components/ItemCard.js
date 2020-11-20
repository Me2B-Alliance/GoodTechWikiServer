/**
 * Dependencies
 */
import PropTypes from 'prop-types'

/**
 * ItemCard
 */
export default function ItemCard(props) {
  const { document } = props

  /**
   * ItemHeader
   * @param {Object} doc Document object
   * @param {String} type Type of document we're building
   */
  const ItemHeader = (doc, type) => (
    <>
      <div>
        <h3>
          {type === 'Organization' ? doc.orgName : doc.name}
        </h3>
      </div>
      <div>
        <h5>
          {doc.lisa && (doc.lisa).toUpperCase()}
        </h5>
      </div>
    </>
  )

  function buildEventItem(doc) {
    return (
      <>
        {ItemHeader(doc)}
        <p>
          {doc.description}
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
  }

  function buildOrganizationItem(doc) {
    return (
      <>
        {ItemHeader(doc, doc['@type'])}
        <p>
          {doc.description}
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
  }

  function buildProductItem(doc) {
    return (
      <>
        {ItemHeader(doc)}
        <p>
          {doc.description}
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
  }

  function buildPublicationItem(doc) {
    return (
      <>
        {ItemHeader(doc)}
        <p>
          {doc.description}
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
  }

  function buildWorkingGroupItem(doc) {
    return (
      <>
        {ItemHeader(doc)}
        <p>
          {doc.description}
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
  }

  let item = {}

  switch (document['@type']) {
    case 'Event':
      item = buildEventItem(document)
      break
    case 'Organization':
      item = buildOrganizationItem(document)
      break
    case 'Product':
      item = buildProductItem(document)
      break
    case 'Publication':
      item = buildPublicationItem(document)
      break
    case 'WorkingGroup':
      item = buildWorkingGroupItem(document)
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
