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
import ProductSchema from 'lib/schemas/ProductSchema'
import { Col, Container, Row } from 'react-bootstrap'

const MultiField = dynamic(() => import('components/FormFields/MultiField'), {
  ssr: false
})

function ProductForm({ doc, handleSubmit }) {
  return (
    <div id="document-view-autoform">
      <AutoForm schema={ProductSchema} model={doc} onSubmit={handleSubmit}>
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
              <MultiField name="purpose" />
            </Col>
            <Col>
              <MultiField name="activities" />
              <MultiField name="people" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <AutoField name="workingGroup" />
              <AutoField name="relevantPublications" />
              <AutoField name="status" />
              <AutoField name="termsOfService" />
              <AutoField name="supportedIdentityTechnologies" />
            </Col>
            <Col>
              <AutoField name="workingGroup" />
              <AutoField name="audience" />
              <AutoField name="partners" />
              <AutoField name="versionOrEdition" />
              <AutoField name="license" />
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6}>
              <AutoField name="dateBegun" />
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

export default ProductForm
