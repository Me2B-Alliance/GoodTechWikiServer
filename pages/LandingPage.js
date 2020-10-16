import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import PropTypes from 'prop-types'

import Footer from '../components/Footer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'grey',
    paddingBottom: '2px',
  },
  headerTitle: {
    display: 'flex',
    alignSelf: 'flex-end',
    paddingLeft: '50px',
    paddingBottom: '10px',
  },
  body: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  },
  aboutTypography: {
    paddingTop: '20px',
  },
  searchTypography: {
    paddingBottom: '20px',
  },
  searchForm: {
    paddingTop: '20px',
    width: '320px',
  }
}))

function buildActivities() {
  const activities = [
    'None', 'Certification', 'Compliance Auditing', 'Creative', 'Events and Convening',
    'Formal Training and Classes', 'Funding', 'Outreach', 'Publication',
    'Regulation', 'Software Development', 'Service Provider', 'Policy Development'
  ]

  return activities.map(item => {
    if (item === 'None') {
      return (
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      )
    } else {
      return (
        <MenuItem value={item} key={`menu-item-activity-${item}`} >
          {item}
        </MenuItem >
      )
    }
  })
}

function Header() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img src={'/header_logo.png'} />
      <Typography variant="h3" color="textSecondary" className={classes.headerTitle}>
        Good Tech Wiki
      </Typography>
    </div>
  )
}


export default function LandingPage(props) {
  const classes = useStyles()

  const [ age, setAge ] = React.useState('')

  const handleActivitySelect = (event) => {
    setAge(event.target.value)
  }

  return (
    <React.Fragment>
      <Header />
      <Container className={classes.body}>
        <Typography className={classes.aboutTypography}>
          This wiki was developed by the Me2b Alliance and is offered
          as a public utility to help people find organizations who are working on
          more ethical technology.
        </Typography>
        <FormControl className={classes.searchForm} >
          <Typography className={classes.searchTypography}>
            Enter Search String or Category
            </Typography>
          <TextField
            variant="outlined"
            margin="dense"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="body2" className={classes.aboutTypography}>
            I'm looking for Organizations Engaged in:
            </Typography>
          <Select
            value={age}
            onChange={handleActivitySelect}
            variant="standard"
          >
            {buildActivities()}
          </Select>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

LandingPage.propTypes = {
  filters: PropTypes.object,
}
