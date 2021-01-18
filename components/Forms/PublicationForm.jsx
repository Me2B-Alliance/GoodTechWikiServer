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
import PublicationSchema from 'lib/schemas/PublicationSchema'
import { Col, Container, Row } from 'react-bootstrap'

const MultiField = dynamic(() => import('components/FormFields/MultiField'), {
  ssr: false
})

function PublicationForm({ doc, handleSubmit }) {
  return (
    <div id="document-view-autoform">
      <AutoForm schema={PublicationSchema} model={doc} onSubmit={handleSubmit}>
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
              <MultiField name="authorsEditors" />
              <MultiField name="tags" />
            </Col>
            <Col>
              <MultiField name="purpose" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <AutoField name="publicationType" />
              <AutoField name="sector" />
              <AutoField name="sponsoringOrg" />
              <AutoField name="jurisdiction" />
            </Col>
            <Col>
              <AutoField name="workingGroup" />
              <AutoField name="audience" />
              <AutoField name="versionOrEdition" />
              <AutoField name="license" />
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6}>
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
              <AutoField name="url" />
            </Col>
          </Row>

          <SubmitField />

        </Container>
      </AutoForm>
    </div>
  )
}

export default PublicationForm
