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
import WorkingGroupSchema from 'lib/schemas/WorkingGroupSchema'
import { Col, Container, Row } from 'react-bootstrap'
import SelectSearchField from 'components/FormFields/SelectSearchField'

const MultiField = dynamic(() => import('components/FormFields/MultiField'), {
  ssr: false
})

function WorkingGroupForm({ doc, handleSubmit }) {
  return (
    <div id="document-view-autoform">
      <AutoForm schema={WorkingGroupSchema} model={doc} onSubmit={handleSubmit}>
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
              <MultiField name="activities" />
              <MultiField name="people" />
            </Col>
            <Col>
              <MultiField name="category" />
              <MultiField name="purpose" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <SelectSearchField name="techFocus" />
              <AutoField name="parentOrg" />
              <AutoField name="ipr" />
            </Col>
            <Col>
              <AutoField name="meetingFrequency" />
              <AutoField name="relevantStandards" />
              <AutoField name="status" />
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
              <AutoField name="github" />
            </Col>
            <Col>
              <AutoField name="url" />
            </Col>
          </Row>

          <SubmitField />

        </Container>
      </AutoForm>
    </div>
  )
}

export default WorkingGroupForm
