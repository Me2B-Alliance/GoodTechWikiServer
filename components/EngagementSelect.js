/**
 * Dependencies
 */
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'

/**
 * EngagementSelect Component
 */
export default function EngagementSelect(props) {
  const router = useRouter()

  const { category } = props

  /**
   * buildEngagements
   */
  const buildEngagements = () => {
    const engagements = [
      'None', 'Product Design & Dev Practices', 'Technology Standards',
      'Industry Advocacy and Education', 'Tools/Infrastructure/Services Development for B-s',
      'Tools Development for Me-s', 'Product Testing', 'Org Compliance and Testing',
      'Regulation, Legal, Policy', 'Consumer Advocacy and Education', 'Other'
    ]

    return engagements.map((engagement) => {
      if (engagement === 'None') {
        return (
          <option key="menu-item-activity-All">
            All
          </option>
        )
      }
      return (
        <option key={`menu-item-activity-${engagement}`}>
          {engagement}
        </option>
      )
    })
  }

  /**
   * handleEngagementSelect
   */
  const handleEngagementSelect = (event) => {
    const cat = encodeURIComponent(event.target.value)

    if (event.target.value === 'Select a Category') {
      return
    }
    if (event.target.value === 'All') {
      router.push({ pathname: '/organizations' })
    } else {
      router.push({ pathname: '/organizations', query: { category: cat } })
    }
  }

  return (
    <Form>
      <Form.Group controlId="filterForm.SelectCategory">
        <Form.Control
          as="select"
          defaultValue={category}
          custom
          onChange={handleEngagementSelect}
        >
          <option key="menu-item-activity-label">
            Select a Category
          </option>
          {buildEngagements()}
        </Form.Control>
      </Form.Group>
    </Form>
  )
}

EngagementSelect.propTypes = {
  category: PropTypes.string
}
