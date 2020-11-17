import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

function Copyright() {
  return (
    <Typography variant="body2">
      {`© ${new Date().getFullYear()} Good Tech Wiki. `}
      <Link href="https://github.com/Me2B-Alliance">
        Me2b Alliance
      </Link>
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.grey[400],
    alignItems: 'center',
    alignContent: 'center',
    justifyItems: 'flex-start'
  }
}))

export default function StickyFooter() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div style={{ backgroundColor: '#686868', height: '50px', color: '#f9f5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '15px' }}>
        <Typography variant="body1">
          The Me2B Alliance avoids the use of cookies.  Currently, this site doesn’t include the use of any cookies.
        </Typography>
      </div>
      <footer className={classes.footer}>
        <div>
          <Typography variant="body1">Powered by NextJs, Express and Material UI</Typography>
          <Copyright />
        </div>
      </footer>
    </div>
  )
}
