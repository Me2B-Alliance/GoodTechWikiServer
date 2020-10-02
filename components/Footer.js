import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {`© ${new Date().getFullYear()} Good Tech Wiki. `}
      <Link href="https://github.com/Me2B-Alliance">
        Me2b Alliance
      </Link>
    </Typography>
  )
}

function About() {
  return (
    <Typography variant="body2" color="textSecondary">
      This Wiki was developed by the Me2B Alliance and is offered as a public
      utility to help people find organizations who are working on more ethical
      technology.
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '10vh',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.grey[ 300 ]
    //backgroundColor:
    //  theme.palette.type === 'light' ? theme.palette.grey[ 200 ] : theme.palette.grey[ 800 ],
  },
}))

export default function StickyFooter() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">Footer info</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  )
}
