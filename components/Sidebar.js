import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    padding: '0px 10px 10px 0px',
    height: '100%',
    marginTop: '5px'
  },
  listSubHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

export default function Sidebar(props) {
  const classes = useStyles()

  const { documentType } = props

  const handleTypeSelect = (item) => {
    window.location.href = `/${item}`
  }

  return (
    <div className={classes.root}>
      <List
        component="nav"
        subheader={(
          <div className={classes.listSubHeader}>
            <ListSubheader disableSticky>
              Browse by Type
            </ListSubheader>
            {documentType !== ''
              && <Link href="/">Clear</Link>}
          </div>
        )}
      >
        <ListItem
          button
          key={0}
          selected={documentType === 'Organization'}
          onClick={() => handleTypeSelect('organizations')}
        >
          <ListItemText
            style={{ color: documentType === 'Organization' ? '#ff9900' : 'black' }}
            primary="Organizations"
          />
        </ListItem>
        <ListItem
          button
          key={1}
          selected={documentType === 'Event'}
          onClick={() => handleTypeSelect('events')}
        >
          <ListItemText
            style={{ color: documentType === 'Event' ? '#ff9900' : 'black' }}
            primary="Events"
          />
        </ListItem>
        <ListItem
          button
          key={2}
          selected={documentType === 'Product'}
          onClick={() => handleTypeSelect('products')}
        >
          <ListItemText
            style={{ color: documentType === 'Product' ? '#ff9900' : 'black' }}
            primary="Products"
          />
        </ListItem>
        <ListItem
          button
          key={3}
          selected={documentType === 'Publication'}
          onClick={() => handleTypeSelect('publications')}
        >
          <ListItemText
            style={{ color: documentType === 'Publication' ? '#ff9900' : 'black' }}
            primary="Publications"
          />
        </ListItem>
        <ListItem
          button
          key={4}
          selected={documentType === 'WorkingGroup'}
          onClick={() => handleTypeSelect('workinggroups')}
        >
          <ListItemText
            style={{ color: documentType === 'WorkingGroup' ? '#ff9900' : 'black' }}
            primary="Working Groups"
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary="Create New Document" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem
          button
          component="a"
          target="_blank"
          href="https://github.com/Me2B-Alliance/GoodTechWikiServer/issues"
        >
          <ListItemText primary="Feedback" />
        </ListItem>
      </List>
    </div>
  )
}

Sidebar.propTypes = {
  documentType: PropTypes.string
}
