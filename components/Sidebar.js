import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  item: {
    paddingBottom: '15px',
    color: '#999999'
  }
}))

export default function Sidebar(props) {
  const classes = useStyles()

  const { documentType } = props

  const router = useRouter()

  return (
    <div className={classes.root}>
      <Link
        className={classes.item}
        style={{ color: !documentType ? '#f58a0b' : '#999999' }}
        variant="h6"
        href="/"
      >
        Home
      </Link>

      <Link
        className={classes.item}
        style={{ color: documentType === 'Organization' ? '#f58a0b' : '#999999' }}
        variant="h6"
        href="/organizations"
      >
        Organizations
      </Link>

      <Link
        className={classes.item}
        style={{ color: documentType === 'Event' ? '#f58a0b' : '#999999' }}
        variant="h6"
        href="/events"
      >
        Events
      </Link>

      <Link
        className={classes.item}
        style={{ color: documentType === 'Publication' ? '#f58a0b' : '#999999' }}
        variant="h6"
        href="/publications"
      >
        Publications
      </Link>

      <Link
        className={classes.item}
        style={{ color: documentType === 'Product' ? '#f58a0b' : '#999999' }}
        variant="h6"
        href="/products"
      >
        Products
      </Link>

      <Link
        className={classes.item}
        style={{ color: documentType === 'WorkingGroup' ? '#f58a0b' : '#999999' }}
        variant="h6"
        href="/workinggroups"
      >
        Working Groups
      </Link>

      <Typography variant="caption" style={{ textAlign: 'left', paddingTop: '20px', paddingBottom: '80px' }}>
        This wiki was developed by the Me2B Alliance and is offered
        as a public utility to help people find organizations who
        are working on more respectful technology.
      </Typography>

    </div>
  )
}

Sidebar.propTypes = {
  documentType: PropTypes.string
}
