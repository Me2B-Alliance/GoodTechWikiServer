import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import ItemCard from './ItemCard'

const useStyles = makeStyles((theme) => ({
  listRoot: {
    //backgroundColor: 'white',
    padding: '10px',
    //borderRadius: '5px',
    //border: '1px solid #dbdcdc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardList: {
    width: '50%',
  },
}))

const items = [
  {
    organization: 'Organization 1',
    description: 'Description 1',
  },
  {
    organization: 'Organization 2',
    description: 'Description 2',
  },
  {
    organization: 'Organization 3',
    description: 'Description 3',
  },
  {
    organization: 'Organization 4',
    description: 'Description 4',
  },
]

function buildItemList(items) {
  const classes = useStyles()

  let builtList = []

  items.map(item => {
    builtList.push(<ItemCard item={item}/>)
  })

  return builtList

}

export default function ItemList(props) {
  const classes = useStyles()

  return (
    <div className={classes.listRoot}>
      <Typography variant="h5" style={{ margin: '5px 5px 5px 10px' }}>
        Items
      </Typography>
      <div className={classes.cardList} >
        {buildItemList(items)}
      </div>
    </div>
  )
}

