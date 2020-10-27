import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import { default as events } from '../data/events.json'
import { default as organizations } from '../data/organizations.json'
import { default as products } from '../data/products.json'
import { default as publications } from '../data/publications.json'
import { default as workingGroups } from '../data/workingGroups.json'
import ItemCard from './ItemCard'

const useStyles = makeStyles((theme) => ({
  listRoot: {
    marginTop: '15px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '10px 15px 0px 15px'
  },
  itemList: {
    width: '100%',
    paddingTop: '10px'
  },
  itemListBreak: {
    margin: '15px 0px 25px 0px',
    border: 'none',
    backgroundColor: '#6700be',
    height: '2px',
  },
  itemListTitle: {
    margin: '5px 5px 15px 10px',
    color: '#f58a0b',
    fontWeight: 'bold',
  },
}))


export default function ItemList(props) {
  const classes = useStyles()

  var type = props.type
  var items

  switch (type) {
    case undefined:
      break
    // Organizations
    case 'organizations':
      items = organizations.docs
      break
    // Events
    case 'events':
      items = events.docs
      break
    // Products
    case 'products':
      items = products.docs
      break
    // Publications
    case 'publications':
      items = publications.docs
      break
    // WorkingGroups
    case 'workinggroups':
      items = workingGroups.docs
      break
  }

  function buildItemList(items) {

    return items.slice(0, 15).map((item, index) => {
      return (
        <div key={`item-card-fragment-${item[ '@id' ]}`}>
          <ItemCard doc={item} />
          <hr className={classes.itemListBreak} />
        </div>
      )
    })
  }

  return (
    <div className={classes.listRoot}>
      <div className={classes.itemList} >
        {buildItemList(items)}
      </div>
    </div>
  )
}

ItemList.propTypes = {
  type: PropTypes.string,
}
