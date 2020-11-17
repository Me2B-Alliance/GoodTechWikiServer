import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '450px'
  },
  inputLabel: {
    backgroundColor: 'white'
  }

}))

export default function EngagementSelect(props) {
  const classes = useStyles()

  const router = useRouter()

  const { cat: category, width } = props

  const [selectedEngagement, setSelectedEngagement] = React.useState(category || '')

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
    if (event.target.value === '') {
      router.push({ pathname: '/organizations' })
    } else {
      router.push({ pathname: '/organizations', query: { cat: event.target.value } })
    }
  }

  return (
    <FormControl variant="outlined" style={{ width }} className={classes.formControl}>
      <InputLabel className={classes.inputLabel} id="engagement-select-label">Select a Category</InputLabel>
      <Select
        labelId="engagement-select-label"
        id="engagement-select"
        value={selectedEngagement}
        onChange={handleEngagementSelect}
      >
        {buildEngagements()}
      </Select>
    </FormControl>
  )
}

EngagementSelect.propTypes = {
  cat: PropTypes.string,
  width: PropTypes.string
}
