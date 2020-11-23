/**
 * Dependencies
 */
import React from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'
import Pagination from 'react-bootstrap-4-pagination'

/**
 * Local Dependencies
 */
import { getDocsByType } from 'pages/api/documents/[type]'
import Sidebar from 'components/Sidebar'
import ItemCard from 'components/ItemCard'
import EngagementSelect from 'components/EngagementSelect'

/**
 * getServerSideProps
 */
export async function getServerSideProps(ctx) {
  const { type } = ctx.params
  const { category } = ctx.query

  const docs = await getDocsByType(type, { category })

  if (!docs) {
    return {
      notFound: true
    }
  }

  return { props: { data: docs } }
}

/**
 * Type Page
 *
 * "/[type]"
 */
export default function Page(props) {
  // Initial
  const router = useRouter()
  const { type, category } = router.query
  const { data: { docs: documents } } = props

  // Setup Hooks
  const [currentPage, setCurrentPage] = React.useState(1)

  const docsPerPage = 10
  const pageCount = Math.floor((documents.length / docsPerPage) + 1)

  const documentType = documents[0]['@type']

  /**
   * buildItemList
   * Build a list of item cards for each document
   *
   * @param {Array} items List of documents
   */
  const buildItemList = (items) => items.slice(
    (currentPage - 1) * docsPerPage,
    currentPage * docsPerPage
  )
    .map((item) => (
      <div key={`item-card-fragment-${item['@id']}`}>
        <ItemCard document={item} />
      </div>
    ))

  /**
   * buildItemList
   * Header title for the item list
   *
   * @param {Array} items List of documents
   */
  const ItemListHeader = () => {
    const lowerLimit = (currentPage - 1) * docsPerPage
    const upperLimit = currentPage * docsPerPage
    const max = documents.length

    const checkUpper = upperLimit > max ? max : upperLimit

    return (
      <>
        <h1 id="item-list-header-title" className="display-4">
          {documents[0]['@type']}s
        </h1>
        <Row>
          <Col id="item-list-results-stats">
            <p>
              Showing {lowerLimit}-{checkUpper} out of {max} results
            </p>
          </Col>
          <Col>
            {documents[0]['@type'] === 'Organization'
              && <EngagementSelect width="450px" category={decodeURIComponent(category)} />}
          </Col>
        </Row>
      </>
    )
  }

  return (
    <div id="body">
      <Container>
        <Row>
          <Col md={3} className="d-none d-md-block" style={{ paddingTop: '180px' }}>
            <Sidebar documentType={documentType} />
          </Col>
          <Col>
            <>
              <ItemListHeader />
              <div id="item-list">
                <div>
                  {buildItemList(documents)}
                </div>
                <Pagination
                  threeDots
                  totalPages={pageCount}
                  currentPage={currentPage}
                  showMax={5}
                  prevNext
                  onClick={setCurrentPage}
                />
              </div>
            </>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

Page.propTypes = {
  data: PropTypes.object
}
