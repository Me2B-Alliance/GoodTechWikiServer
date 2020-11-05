import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'

import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  headerRoot: {
    boxShadow: '0 0 2px 1px #686868'
  },
  toolbar: {
    paddingRight: '10px'
  },
  avatarLarge: {
    width: '',
    height: '70px',
    marginLeft: '20px'
  },
  toolbarTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#777f88'
  },
  toolbarLoginButtonRoot: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    paddingTop: '5px'
  },
  toolbarLoginButton: {
    backgroundColor: '#ff9900',
    color: 'white'
  }
}))

export default function Header(props) {
  const classes = useStyles()

  return (
    <div className={classes.headerRoot}>
      <Toolbar position="fixed" disableGutters className={classes.toolbar}>
        <Grid alignItems="center" container>
          <Hidden smDown initialWidth="md">
            <Grid item xs={3} sm={2} style={{ paddingLeft: '10px' }}>
              <a href="/">
                <Image width="130" height="80" src="/header_logo.png" />
              </a>
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={3} sm={1}>
              <IconButton aria-label="delete" className={classes.margin} size="small">
                <MenuIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Hidden>
          <Grid item xs={6} sm={8}>
            <Typography
              variant="h5"
              noWrap
              className={classes.toolbarTitle}
              color="textSecondary"
            >
              {'Good Tech Wiki'.toUpperCase()}
            </Typography>

          </Grid>
          { /* <Grid item className={classes.toolbarLoginButtonRoot} xs={3} sm={2}>
            <Button className={classes.toolbarLoginButton} variant="text" size="medium">
              Login
            </Button>
          </Grid>
          */}
        </Grid>
      </Toolbar>
    </div>
  )
}
