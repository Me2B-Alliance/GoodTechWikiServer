/**
 * Local Dependencies
 */
import OrganizationForm from './Forms/OrganizationForm'
import ProductForm from './Forms/ProductForm'
import EventForm from './Forms/EventForm'
import PublicationForm from './Forms/PublicationForm'
import WorkingGroupForm from './Forms/WorkingGroupForm'

/**
 * Form component
 */
export default function DocumentForm({ type, doc, handleSubmit }) {
  let Form
  switch (type) {
    case 'organizations':
      Form = OrganizationForm
      break
    case 'events':
      Form = EventForm
      break
    case 'workinggroups':
      Form = WorkingGroupForm
      break
    case 'products':
      Form = ProductForm
      break
    case 'publications':
      Form = PublicationForm
      break
    default:
      break
  }

  return (
    <div id="document-view-autoform">
      <Form doc={doc} handleSubmit={handleSubmit} />
    </div>
  )
}
