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
import EventSchema from 'lib/schemas/EventSchema'
import { Col, Container, Row } from 'react-bootstrap'

const MultiField = dynamic(() => import('components/FormFields/MultiField'), {
  ssr: false
})

function EventForm({ doc, handleSubmit }) {
  return (
    <div id="document-view-autoform">
      <AutoForm schema={EventSchema} model={doc} onSubmit={handleSubmit}>
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
              <MultiField name="category" />
              <MultiField name="tags" />
            </Col>
            <Col>
              <MultiField name="locations" />
              <MultiField name="people" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <AutoField name="partners" />
              <AutoField name="relevantPublications" />
              <AutoField name="hostOrganization" />
            </Col>
            <Col>
              <AutoField name="workingGroup" />
              <AutoField name="frequency" />
              <AutoField name="audience" />
            </Col>
          </Row>

          <Row>
            <Col>
              <AutoField name="date" />
            </Col>
            <Col>
              {}
            </Col>
          </Row>

          <h4>Links</h4>
          <Row>
            <Col xs={12} md={6}>
              <AutoField name="github" />
            </Col>
            <Col>
              <AutoField name="website" />
            </Col>
          </Row>

          <SubmitField />

        </Container>
      </AutoForm>
    </div>
  )
}

export default EventForm
