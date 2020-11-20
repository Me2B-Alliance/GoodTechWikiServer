/**
 * Dependencies
 */
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Pagination from 'react-bootstrap-4-pagination'

/**
 * Local Dependencies
 */
import ItemCard from './ItemCard'
import EngagementSelect from './EngagementSelect'

/**
 * ItemList
 */
export default function ItemList(props) {
  const router = useRouter()

  const { documents } = props

  const { cat: category } = router.query

  const docsPerPage = 10
  const pageCount = Math.floor((documents.length / docsPerPage) + 1)

  const [currentPage, setCurrentPage] = React.useState(1)

  const buildItemList = (items) => items.slice(
    (currentPage - 1) * docsPerPage,
    currentPage * docsPerPage
  )
    .map((item) => (
      <div key={`item-card-fragment-${item['@id']}`}>
        <ItemCard document={item} />
      </div>
    ))

  const ItemListStatsHeader = () => {
    const lowerLimit = (currentPage - 1) * docsPerPage
    const upperLimit = currentPage * docsPerPage
    const max = documents.length

    const checkUpper = upperLimit > max ? max : upperLimit

    return (
      <Row>
        <Col>
          <p className="small">
            Showing {lowerLimit}-{checkUpper} out of {max} results
          </p>
        </Col>
        <Col>
          {documents[0]['@type'] === 'Organization'
            && <EngagementSelect width="450px" cat={category} />}
        </Col>
      </Row>
    )
  }

  return (
    <div>
      <h1 className="display-4">
        {documents[0]['@type']}s
      </h1>
      {ItemListStatsHeader()}
      <div>
        {documents && buildItemList(documents)}
      </div>
      <Pagination
        threeDots
        totalPages={pageCount}
        currentPage={currentPage}
        showMax={7}
        prevNext
        onClick={setCurrentPage}
      />
    </div>
  )
}

ItemList.propTypes = {
  documents: PropTypes.array
}
