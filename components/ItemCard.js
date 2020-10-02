import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    borderRadius: '5px',
    marginBottom: '20px',
  },
}))

export default function ItemCard(props) {
  const classes = useStyles()

  const { item } = props

  return (
    <div>
      <Card elevation={1} className={classes.cardRoot}>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="h5" component="h2">
              {item.organization}
            </Typography>
            <Button variant="outlined" size="small">Learn More</Button>
          </div>
          <Typography variant="body1">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
    </div>
  )
}

ItemCard.propTypes = {
  item: PropTypes.object,
}
