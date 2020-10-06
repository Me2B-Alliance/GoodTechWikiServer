import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  filterRoot: {
    padding: '10px',
    justifyContent: 'space-between',
  },
  formControl: {
    //margin: theme.spacing(1),
    //    minWidth: 120,
    //    width: 180,
  },
  inputLabel: {
    //width: '100%',
    //minWidth: 110,
  },
}))

export default function Filters(props) {
  const classes = useStyles()

  const { filters } = props

  let filter = {}

  if (filters === undefined || JSON.stringify(filters) === '{}') {
    filter = { engagement: 'Engagement 1', purpose: 'Purpose 1', tag: 'Tag 1', text: '' }
  } else {
    filter = filters
  }

  return (
    <div className={classes.filterRoot}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={2}>
          <Typography variant="h4">
            Filter
            </Typography>
        </Grid>
        <Grid item xs={12} sm>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel className={classes.inputLabel} id="engagement-select-label">Organization Engagement</InputLabel>
            <Select
              labelId="engagement-select-label"
              id="engagement-select"
              value={0}
              fullWidth
              onChange={() => console.log('changed')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>{filter.engagement}</MenuItem>
              <MenuItem value={1}>Engagement 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel className={classes.inputLabel} id="purpose-select-label">Organization Purpose</InputLabel>
            <Select
              labelId="purpose-select-label"
              id="purpose-select"
              value={0}
              fullWidth
              onChange={() => console.log('changed')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>{filter.purpose}</MenuItem>
              <MenuItem value={1}>Purpose 2</MenuItem>
              <MenuItem value={2}>Purpose 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel className={classes.inputLabel} id="concept-select-label">Concept Tag</InputLabel>
            <Select
              labelId="concept-select-label"
              id="concept-select"
              value={0}
              fullWidth
              onChange={() => console.log('changed')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>{filter.tag}</MenuItem>
              <MenuItem value={1}>Concept Tag 2</MenuItem>
              <MenuItem value={2}>Concept Tag 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              label="Text Search"
              id="search-text-input"
              InputLabelProps={{ shrink: true }}
              value={filter.text}
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}

Filters.propTypes = {
  filters: PropTypes.object,
}
