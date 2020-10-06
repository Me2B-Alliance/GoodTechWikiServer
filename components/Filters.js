import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  filterRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: '10px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 180,
  },
  inputLabel: {
    width: 200,
    minWidth: 110,
  },
}))

export default function Filters(props) {
  const classes = useStyles()

  const { filters: { engagement, purpose, tag, text } } = props

  return (
    <div className={classes.filterRoot}>
      <div style={{ width: 120 }}>
        <Typography variant="caption">
          Searching
        </Typography>
        <Typography variant="h4">
          Filter
        </Typography>
      </div>
      <FormControl className={classes.formControl}>
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
          <MenuItem value={0}>{engagement}</MenuItem>
          <MenuItem value={1}>Engagement 2</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
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
          <MenuItem value={0}>{purpose}</MenuItem>
          <MenuItem value={1}>Purpose 2</MenuItem>
          <MenuItem value={2}>Purpose 3</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
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
          <MenuItem value={0}>{tag}</MenuItem>
          <MenuItem value={1}>Concept Tag 2</MenuItem>
          <MenuItem value={2}>Concept Tag 3</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          label="Text Search"
          id="search-text-input"
          InputLabelProps={{ shrink: true }}
          value={text}
        />
      </FormControl>
    </div>
  )
}

Filters.propTypes = {
  filters: PropTypes.object,
}
