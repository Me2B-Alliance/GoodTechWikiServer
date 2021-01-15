/**
 * Dependencies
 */
import dynamic from 'next/dynamic'
import {
  AutoForm,
  SubmitField,
  AutoFields,
  AutoField
} from 'uniforms-bootstrap4'

/**
 * Local Dependencies
 */
import OrganizationSchema from 'lib/schemas/OrganizationSchema'
import EventSchema from 'lib/schemas/EventSchema'
import PublicationSchema from 'lib/schemas/PublicationSchema'
import ProductSchema from 'lib/schemas/ProductSchema'
import WorkingGroupSchema from 'lib/schemas/WorkingGroupSchema'

const MultiField = dynamic(() => import('components/MultiField'), {
  ssr: false
})

/**
 * Form component
 */
export default function DocumentForm({ type, doc, handleSubmit }) {
  let schema
  switch (type) {
    case 'organizations':
      schema = OrganizationSchema
      break
    case 'events':
      schema = EventSchema
      break
    case 'workinggroups':
      schema = WorkingGroupSchema
      break
    case 'products':
      schema = ProductSchema
      break
    case 'publications':
      schema = PublicationSchema
      break
    default:
      break
  }

  // List of fields for uniform to ignore with auto generation
  const autoIgnored = ['name', 'lisa', 'about', 'tags', 'category',
    'people', 'locations', 'uuid', 'digitalHarmsAddressed',
    'activities', 'keyPeople', 'purpose', 'authorsEditors', '@type'
  ]

  // List of properties for current schema
  const schemaProps = schema.schema.properties

  return (
    <div id="document-view-autoform">
      <AutoForm schema={schema} model={doc} onSubmit={(formData) => handleSubmit(formData)}>
        <SubmitField className="text-end mb-2 d-flex justify-content-end" />
        <div className="form-group d-flex">
          {doc && <h2 id="document-view-name">{doc.name}</h2>}
        </div>
        <p>* &nbsp; &nbsp; Indicates required fields</p>

        {!doc && <AutoField name="name" />}
        <AutoField name="about" />

        {schemaProps.lisa && <AutoField placeholder="Select a Category" name="lisa" />}
        {schemaProps.category && <MultiField name="category" type="category" />}
        {schemaProps.people && <MultiField name="people" type="people" />}
        {schemaProps.locations && <MultiField name="locations" type="locations" />}
        {schemaProps.digitalHarmsAddressed && <MultiField name="digitalHarmsAddressed" type="digitalHarmsAddressed" />}
        {schemaProps.tags && <MultiField name="tags" type="tags" />}
        {schemaProps.keyPeople && <MultiField name="keyPeople" type="key People" />}
        {schemaProps.activities && <MultiField name="activities" type="Activities" />}
        {schemaProps.purpose && <MultiField name="purpose" type="Purpose" />}
        {schemaProps.authorsEditors && <MultiField name="authorsEditors" type="Authors and Editors" />}

        <AutoFields omitFields={autoIgnored} />

        <SubmitField />

      </AutoForm>
    </div>
  )
}
