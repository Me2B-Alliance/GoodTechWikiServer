import { makeStyles } from '@material-ui/core/styles'

import Filters from '../components/Filters'
import ItemList from '../components/ItemList'
import Sidebar from '../components/Sidebar'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row'
  },
  body: {
    width: '100%',
  }
}))

export default function Header(props) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <div className={classes.root}>
        {/*<Sidebar />*/}
        <div className={classes.body}>
          <Filters />
          <ItemList />
        </div>
      </div>
    </React.Fragment>
  )
}
