import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

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

export default function HomePage(props) {
  const classes = useStyles()

  const { filters } = props

  return (
    <React.Fragment>
      <div className={classes.root}>
        {/*<Sidebar />*/}
        <div className={classes.body}>
          <Filters filters={filters} />
          <ItemList />
        </div>
      </div>
    </React.Fragment>
  )
}

HomePage.propTypes = {
  filters: PropTypes.object,
}
