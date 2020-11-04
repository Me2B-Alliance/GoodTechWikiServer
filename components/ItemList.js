import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Pagination from '@material-ui/lab/Pagination'
import { useRouter } from 'next/router'
import ItemCard from './ItemCard'

const useStyles = makeStyles((theme) => ({
  listRoot: {
    marginTop: '15px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '10px 0px 0px 0px'
  },
  itemList: {
    width: '100%',
    paddingTop: '10px'
  },
  itemListBreak: {
    margin: '15px 0px 25px 0px',
    border: 'none',
    backgroundColor: '#6700be',
    height: '2px'
  }
}))

const docsPerPage = 10

export default function ItemList(props) {
  const classes = useStyles()

  const { documents } = props

  const router = useRouter()
  const { text, cat } = router.query

  let pageCount = Math.round(documents.length / docsPerPage)
  if (pageCount === 0) {
    pageCount = 1
  }

  const [currentPage, setCurrentPage] = React.useState(1)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }


  function buildItemList(items) {
    return items.slice(
      (currentPage - 1) * docsPerPage,
      currentPage * docsPerPage
    )
      .map((item) => (
        <div key={`item-card-fragment-${item['@id']}`}>
          <ItemCard doc={item} />
        </div>
      ))
  }

  return (
    <div className={classes.listRoot}>
      <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} color="secondary" />
      <div className={classes.itemList}>
        {documents && buildItemList(documents)}
      </div>
    </div>
  )
}

ItemList.propTypes = {
  documents: PropTypes.array
}
