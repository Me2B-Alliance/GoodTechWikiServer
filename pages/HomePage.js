/**
 * Dependencies
 */
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'react-bootstrap'
import Pagination from 'react-bootstrap-4-pagination'

/**
 * Local Dependencies
 */
import Footer from '../components/Footer'
import Header from '../components/Header'
import ItemCard from '../components/ItemCard'
import EngagementSelect from '../components/EngagementSelect'

const Sidebar = dynamic(() => import('../components/Sidebar'))

/**
 * HomePage
 */
export default function HomePage(props) {
  const router = useRouter()

  const { documents, userInfo } = props
  const [currentPage, setCurrentPage] = React.useState(1)

  const { cat: category } = router.query

  const docsPerPage = 10
  let pageCount

  let documentType = ''

  if (documents) {
    documentType = documents[0]['@type']
    pageCount = Math.floor((documents.length / docsPerPage) + 1)
  }

  const buildItemList = (items) => items.slice(
    (currentPage - 1) * docsPerPage,
    currentPage * docsPerPage
  )
    .map((item) => (
      <div key={`item-card-fragment-${item['@id']}`}>
        <ItemCard document={item} />
      </div>
    ))

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
              && <EngagementSelect width="450px" cat={category} />}
          </Col>
        </Row>
      </>
    )
  }

  return (
    <>
      <Header userInfo={userInfo} />

      <div id="body">
        <Container>
          <Row>
            <Col md={3} className="d-none d-md-block" style={{ paddingTop: '180px' }}>
              <Sidebar documentType={documentType} />
            </Col>
            <Col>
              {documents
                && (
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
                )
                || (
                  <div>
                    <p>
                      This wiki was developed by the Me2B Alliance and is offered
                      as a public utility to help people find organizations who
                      are working on more respectful technology.
                    </p>
                    <p>
                      Start browsing the wiki by selecting a type in the sidebar
                    </p>
                  </div>
                )}
            </Col>
          </Row>

        </Container>
      </div>

      <Footer />
    </>
  )
}

HomePage.propTypes = {
  documents: PropTypes.array,
  userInfo: PropTypes.string
}
