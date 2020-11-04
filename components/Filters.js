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
import Link from 'next/link'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  filterRoot: {
    paddingTop: '10px',
    paddingLeft: '15px',
    paddingRight: '15px',
    justifyContent: 'space-between'
  },
  filterGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  filterButton: {
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    width: '450px'
  },
  inputLabel: {
    backgroundColor: 'white'
  }

}))

export default function Filters(props) {
  const classes = useStyles()

  const router = useRouter()
  const { cat: category } = router.query

  const { type } = props

  const [selectedEngagement, setSelectedEngagement] = React.useState(category || '')
  const [textSearch, setTextSearch] = React.useState('')

  function buildEngagements() {
    const engagements = [
      'None', 'Product Design & Dev Practices', 'Technology Standards',
      'Industry Advocacy and Education', 'Tools/Infrastructure/Services Development for B-s',
      'Tools Development for Me-s', 'Product Testing', 'Org Compliance and Testing',
      'Regulation, Legal, Policy', 'Consumer Advocacy and Education', 'Other'
    ]

    return engagements.map((engagement) => {
      if (engagement === 'None') {
        return (
          <MenuItem value="" key="menu-item-activity-none">
            <em>None</em>
          </MenuItem>
        )
      }
      return (
        <MenuItem value={engagement} key={`menu-item-activity-${engagement}`}>
          {engagement}
        </MenuItem>
      )
    })
  }

  const handleEngagementSelect = (event) => {
    setSelectedEngagement(event.target.value)
  }

  const handleTextSearchChange = (event) => {
    setTextSearch(event.target.value)
  }

  function buildfilters() {
    const SearchButton = () => (
      <Grid className={classes.filterButton} item xs={12} md={2}>
        <Link href={{ pathname: '/organizations', query: { cat: selectedEngagement, text: textSearch } }}>
          <Button variant="outlined">Search</Button>
        </Link>
      </Grid>
    )

    if (type === 'Organization') {
      return (
        <>
          <Grid item xs={12} md>
            <Typography variant="subtitle1" style={{ textAlign: 'left', paddingTop: '80px' }}>
              This wiki was developed by the Me2B Alliance and is offered
              as a public utility to help people find organizations who
              are working on more respectfull technology.
            </Typography>
            <Typography style={{ paddingTop: '30px' }} variant="body1">
              Enter a category or search string
            </Typography>
          </Grid>
          <Grid item xs={12} md>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel className={classes.inputLabel} id="engagement-select-label">Engagement</InputLabel>
              <Select
                labelId="engagement-select-label"
                id="engagement-select"
                value={selectedEngagement}
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
                value={textSearch}
                variant="outlined"
                onChange={handleTextSearchChange}
              />
            </FormControl>
          </Grid>
          <SearchButton />
        </>
      )
    }
    return (
      <>
        <Grid item xs={12} md>
          <Typography variant="subtitle1" style={{ textAlign: 'left', paddingTop: '80px' }}>
            This wiki was developed by the Me2B Alliance and is offered
            as a public utility to help people find organizations who
            are working on more respectfull technology.
          </Typography>
          <Typography style={{ paddingTop: '30px' }} variant="body1">
            Enter a search string
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              label="Text Search"
              id="search-text-input"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={textSearch}
              onChange={handleTextSearchChange}
            />
          </FormControl>
        </Grid>
        <SearchButton />
      </>
    )
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
  category: PropTypes.string
}
