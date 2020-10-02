import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import GithubIcon from '@material-ui/icons/GitHub'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  headerRoot: {
    backgroundColor: 'white',
    padding: '0px 10px 20px 10px' ,
    border: '1px solid #dbdcdc',
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
}))


export default function Header(props) {
  const classes = useStyles()

  return (
    <div className={classes.headerRoot}>
      <Toolbar className={classes.toolbar}>
        <IconButton>
        </IconButton>
        <Button size="small" endIcon={<GithubIcon />}>Feedback</Button>
        <Typography
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {'Good Tech Wiki'}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Login
        </Button>
      </Toolbar>
    </div>
  )
}
