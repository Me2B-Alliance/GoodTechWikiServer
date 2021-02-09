/**
 * Dependencies
 */
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pagination from '@material-ui/lab/Pagination'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import {
  Button, Col, Container, Row
} from 'react-bootstrap'

/**
 * Local Dependencies
 */
import EngagementSelect from 'components/EngagementSelect'
import Footer from 'components/Footer'
import Header from 'components/Header'
import ItemCard from 'components/ItemCard'
import Sidebar from 'components/Sidebar'
import wiki from 'lib/wiki'

/**
 * getServerSideProps
 */
export async function getServerSideProps(ctx) {
  const { type } = ctx.params
  const { category, page } = ctx.query
  const { req } = ctx

  const newPage = Number(page) || 1

  const { docs, count } = await wiki.getDocsByType(type, { category, page: newPage })

  const session = await getSession({ req })

  if (!docs || count === 0) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      documents: docs,
      count,
      page: newPage,
      session
    }
  }
}

/**
 * Type Page
 *
 * "/[type]"
 */
export default function Page(props) {
  const router = useRouter()
  const { type, category } = router.query
  const {
    documents,
    count,
    page,
    session
  } = props

  const [currentPage, setCurrentPage] = React.useState(page || 1)
  const [docs, setDocs] = React.useState(documents)
  const [renderPager, setRenderPager] = React.useState(false)

  // Maximum documents per page
  const docsPerPage = 10
  // Total page count
  const pageCount = Math.ceil(count / docsPerPage)

  const documentType = documents[0]['@type']

  useEffect(() => {
    // Only render pager when component loads
    setRenderPager(true)
  }, [])

  useEffect(() => {
    setDocs(documents)
    setCurrentPage(1)
  }, [type])

  useEffect(() => {
    setDocs(documents)
  }, [documents])

  useEffect(() => {
    setCurrentPage(1)
  }, [category])

  useEffect(() => {
    setCurrentPage(page || 1)
  }, [page])

  const handlePageChange = async (value) => {
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

  const handleNewClick = () => {
    router.push(`/${type}/newDocument`)
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
   * ItemListHeader
   * Header title for the item list
   */
  const ItemListHeader = () => {
    const lowerLimit = (currentPage - 1) * docsPerPage
    const upperLimit = currentPage * docsPerPage
    const max = count

    const checkUpper = upperLimit > max ? max : upperLimit

    return (
      <>
        <Row>
          <Col md={6} sm="auto">
            <h1 id="item-list-header-title" className="display-4">
              {documents[0]['@type']}s
            </h1>
          </Col>
          {session
            && (
              <Col md={6} sm="auto" id="item-list-header-new" style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <Button
                    variant="secondary"
                    style={{ color: 'white' }}
                    onClick={() => handleNewClick()}
                  >
                    New &nbsp;
                    <FontAwesomeIcon size="lg" width={20} icon={faPlusCircle} />
                  </Button>
                </div>
              </Col>
            )}
        </Row>
        <Row>
          <Col md={6} id="item-list-results-stats">
            <p>
              Showing {lowerLimit}-{checkUpper} out of {max} results
            </p>
          </Col>
          <Col md={6}>
            {documents[0]['@type'] === 'Organization'
              && <EngagementSelect width="450px" category={decodeURIComponent(category)} />}
          </Col>
        </Row>
      </>
    )
  }

  /**
   * Pager
   * Pagination Component
   */
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
    <>
      <Header userInfo={session ? session.user : {}} />
      <div id="body">
        <Container>
          <Row>
            <Col md={3} className="d-none d-md-block mt-3" style={{ paddingTop: '181px' }}>
              <Sidebar documentType={documentType} />
            </Col>
            <Col>
              <>
                <ItemListHeader />
                {renderPager
                  && <Pager />}
                <div id="item-list">
                  {buildItemList(docs)}
                </div>
                {renderPager
                  && (
                  <>
                    <Pager />
                    <div className="mb-5" />
                  </>
                  )}
              </>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  )
}

Page.propTypes = {
  documents: PropTypes.array,
  count: PropTypes.number,
  page: PropTypes.number,
  session: PropTypes.object
}
