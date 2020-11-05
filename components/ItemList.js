import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Pagination from '@material-ui/lab/Pagination'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Hidden from '@material-ui/core/Hidden'
import EngagementSelect from './EngagementSelect'
import ItemCard from './ItemCard'

const useStyles = makeStyles((theme) => ({
  listRoot: {
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: '70px'
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
  const router = useRouter()

  const { documents } = props

  const { cat: category } = router.query

  const pageCount = Math.floor((documents.length / docsPerPage) + 1)

  const [currentPage, setCurrentPage] = React.useState(1)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const buildItemList = (items) => items.slice(
    (currentPage - 1) * docsPerPage,
    currentPage * docsPerPage
  )
    .map((item) => (
      <div key={`item-card-fragment-${item['@id']}`}>
        <ItemCard doc={item} />
      </div>
    ))

  const ItemListStatsHeader = () => {
    const lowerLimit = (currentPage - 1) * docsPerPage
    const upperLimit = currentPage * docsPerPage
    const max = documents.length

    const checkUpper = upperLimit > max ? max : upperLimit

    return (
      <div style={{
        width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
      }}
      >
        <Grid container spacing={4} direction="row">
          <Hidden smDown>
            <Grid item sm style={{ display: 'flex', alignItems: 'center' }}>
              <Typography>
                Showing {lowerLimit}-{checkUpper} out of {max}
              </Typography>
            </Grid>
          </Hidden>
          <Hidden smDown>
            <Grid item sm style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {documents[0]['@type'] === 'Organization'
                && <EngagementSelect width="450px" cat={category} />}
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item sm style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {documents[0]['@type'] === 'Organization'
                && <EngagementSelect width="250px" cat={category} />}
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Typography style={{ paddingLeft: '17px' }}>
              Showing {lowerLimit}-{checkUpper} out of {max}
            </Typography>
          </Hidden>
        </Grid>
      </div>
    )
  }

  return (
    <div className={classes.listRoot}>
      <Typography variant="h3" style={{ paddingBottom: '50px', color: '#6700be' }}>
        {documents[0]['@type']}s
      </Typography>
      {ItemListStatsHeader()}
      <div className={classes.itemList}>
        {documents && buildItemList(documents)}
      </div>
      <Pagination style={{ paddingBottom: '100px', paddingTop: '50px' }} count={pageCount} page={currentPage} onChange={handlePageChange} color="secondary" />
    </div>
  )
}

ItemList.propTypes = {
  documents: PropTypes.array
}
