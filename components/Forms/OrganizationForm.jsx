/**
 * Dependencies
 */
import dynamic from 'next/dynamic'
import {
  AutoForm,
  SubmitField,
  AutoField
} from 'uniforms-bootstrap4'

/**
 * Local Dependencies
 */
import OrganizationSchema from 'lib/schemas/OrganizationSchema'
import { Col, Container, Row } from 'react-bootstrap'
import SelectSearchField from 'components/FormFields/SelectSearchField'

const MultiField = dynamic(() => import('components/FormFields/MultiField'), {
  ssr: false
})

function OrganizationForm({ doc, handleSubmit }) {
  return (
    <div id="document-view-autoform">
      <AutoForm schema={OrganizationSchema} model={doc} onSubmit={handleSubmit}>
        <SubmitField className="text-end mb-2 d-flex justify-content-end" />
        <Container>
          <div className="form-group d-flex">
            {doc && <h2 id="document-view-name">{doc.name}</h2>}
          </div>
          <p>* &nbsp; &nbsp; Indicates required fields</p>

          {!doc && <AutoField name="name" />}
          <AutoField name="about" />

          <Row>
            <Col xs={12} md={6}>
              <SelectSearchField placeholder="Select a Category" name="lisa" />
              <MultiField name="keyPeople" />
              <MultiField name="tags" />
            </Col>
            <Col>
              <MultiField name="purpose" />
              <MultiField name="locations" />
              <MultiField name="activities" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <SelectSearchField name="techFocus" />
              <AutoField name="partners" />
              <AutoField name="productsAndOrServices" />
              <AutoField name="parentOrg" />
              <AutoField name="relevantPublications" />
            </Col>
            <Col>
              <SelectSearchField name="organizationType" />
              <AutoField name="scope" />
              <AutoField name="sector" />
              <AutoField name="status" />
              <AutoField name="audience" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <AutoField name="dateFounded" />
            </Col>
            <Col>
              <AutoField name="dateEnded" />
            </Col>
          </Row>

          <h4>Links</h4>
          <Row>
            <Col xs={12} md={6}>
              <AutoField name="twitter" />
              <AutoField name="linkedin" />
              <AutoField name="github" />
            </Col>
            <Col>
              <AutoField name="wikipedia" />
              <AutoField name="facebook" />
              <AutoField name="website" />
            </Col>
          </Row>

          <SubmitField />

        </Container>
      </AutoForm>
    </div>
  )
}

export default OrganizationForm
