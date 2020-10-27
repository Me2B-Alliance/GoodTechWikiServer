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
    flexDirection: 'column',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.grey[ 400 ],
  },
}))

export default function StickyFooter() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Typography variant="body1">Powered by NextJs, React and Material UI</Typography>
        <Copyright />
      </footer>
    </div>
  )
}
