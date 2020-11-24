/**
 * Dependencies
 */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'
import Pagination from '@material-ui/lab/Pagination'

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
  const { page } = ctx.query

  const { docs, count } = await getDocsByType(type, { category, page: page || 1 })

  if (!docs) {
    return {
      notFound: true
    }
  }

  return { props: { data: docs, count } }
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
  const { data: documents, count } = props

  // Setup Hooks
  const [currentPage, setCurrentPage] = React.useState(1)
  const [docs, setDocs] = React.useState(documents)

  const docsPerPage = 10
  const pageCount = Math.floor((count / docsPerPage) + 1)

  const documentType = documents[0]['@type']

  useEffect(() => {
    setDocs(documents)
    setCurrentPage(1)
  }, [type])

  useEffect(() => {
    setCurrentPage(1)
  }, [category])

  const handlePageChange = (value) => {
    const query = {
      page: value
    }
    if (category) {
      query.category = category
    }

    router.push({ pathname: `/${type}`, query })
    window.scrollTo(0, 0)
    setCurrentPage(value)
  }

  /**
   * buildItemList
   * Build a list of item cards for each document
   *
   * @param {Array} items List of documents
   */
  const buildItemList = (items) => items
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
    const max = count

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

  const Pager = () => (
    <div id="item-list-pagination">
      <Pagination
        count={pageCount}
        size="large"
        page={currentPage}
        onChange={(_event, value) => handlePageChange(value)}
      />
    </div>
  )

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
              <Pager />
              <div id="item-list">
                <div>
                  {buildItemList(docs)}
                </div>
              </div>
              <Pager />
            </>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

Page.propTypes = {
  data: PropTypes.array,
  count: PropTypes.number
}
