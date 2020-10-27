import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  filterRoot: {
    paddingTop: '10px',
    paddingLeft: '15px',
    paddingRight: '15px',
    justifyContent: 'space-between',
  },
  filterGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
}))

export default function Filters(props) {
  const classes = useStyles()

  const { filters, type } = props

  const [ selectedEngagement, setSelectedEngagement ] = React.useState('')
  const [ textSearch, setTextSearch ] = React.useState('')

  let filter = {}

  if (filters === undefined || JSON.stringify(filters) === '{}') {
    filter = { engagement: 'Engagement 1', text: 'test' }
  } else {
    filter = filters
  }

  function buildEngagements() {
    const engagements = [
      'None', 'Product Design & Dev Practices', 'Technology Standards',
      'Industry Advocacy and Education', 'Tools/Infrastructure/Services Development for B-s',
      'Tools Development for Me-s', 'Product Testing', 'Org Compliance and Testing',
      'Regulation, Legal, Policy', 'Consumer Advocacy and Education', 'Other'
    ]

    return engagements.map(engagement => {
      if (engagement === 'None') {
        return (
          <MenuItem value="" key={'menu-item-activity-none'}>
            <em>None</em>
          </MenuItem>
        )
      } else {
        return (
          <MenuItem value={engagement} key={`menu-item-activity-${engagement}`} >
            {engagement}
          </MenuItem >
        )
      }
    })
  }

  const handleEngagementSelect = (event) => {
    setSelectedEngagement(event.target.value)
  }

  const handleTextSearchChange = (event) => {
    setTextSearch(event.target.value)
  }

  const handleSearch = () => {
    window.location.href = window.location.href + `/s?eng=${selectedEngagement}&text=${textSearch}`
  }

  function buildfilters(type) {

    const InitialText = () => (
      <Grid item xs={12} md>
        <Typography variant="body1">
          Enter a category or search string
        </Typography>
      </Grid>
    )

    const SearchButton = () => (
      <Grid className={classes.filterButton} item xs={12} md={2}>
        <Button onClick={handleSearch} variant="outlined" >Search</Button>
      </Grid>
    )

    if (type === 'organizations') {
      return (
        <React.Fragment>
          <InitialText />
          <Grid item xs={12} md>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel className={classes.inputLabel} id="engagement-select-label">Engagement</InputLabel>
              <Select
                labelId="engagement-select-label"
                id="engagement-select"
                value={selectedEngagement}
                fullWidth
                onChange={handleEngagementSelect}
              >
                {buildEngagements()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                label="Text Search"
                id="search-text-input"
                InputLabelProps={{ shrink: true }}
                value={textSearch}
                onChange={handleTextSearchChange}
              />
            </FormControl>
          </Grid>
          <SearchButton />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Grid item xs={12} md={2}>
            <Typography variant="body1">
              Enter search string
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                label="Text Search"
                id="search-text-input"
                InputLabelProps={{ shrink: true }}
                value={textSearch}
                onChange={handleTextSearchChange}
              />
            </FormControl>
          </Grid>
          <SearchButton />
        </React.Fragment>
      )
    }
  }

  return (
    <div className={classes.filterRoot}>
      <Grid className={classes.filterGrid} container spacing={4}>
        {buildfilters(type)}
      </Grid>
    </div>
  )
}

Filters.propTypes = {
  filters: PropTypes.object,
  type: PropTypes.string,
}
