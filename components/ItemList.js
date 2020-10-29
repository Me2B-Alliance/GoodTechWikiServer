import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

// import { default as events } from '../data/events.json'
// import { default as organizations } from '../data/organizations.json'
// import { default as products } from '../data/products.json'
// import { default as publications } from '../data/publications.json'
// import { default as workingGroups } from '../data/workingGroups.json'
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

export default function ItemList(props) {
  const classes = useStyles()

  const { documents } = props

  function buildItemList(items) {
    return items.slice(0, 15).map((item, index) => (
      <div key={`item-card-fragment-${item['@id']}`}>
        <ItemCard doc={item} />
      </div>
    ))
  }

  return (
    <div className={classes.listRoot}>
      <div className={classes.itemList}>
        {documents && buildItemList(documents)}
      </div>
    </div>
  )
}

ItemList.propTypes = {
  documents: PropTypes.array
}
