import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles((theme) => ({
  listRoot: {
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #dbdcdc',
    width: '12%',
    alignContent: 'flex-end',
    alignItems: 'stretch',
  },
}))

export default function Sidebar(props) {
  const classes = useStyles()

  return (
    <div className={classes.listRoot}>
      <Typography variant="h5" style={{ margin: '5px 5px 5px 10px' }}>
        Items
      </Typography>
    </div>
  )
}

