import Ajv from 'ajv'
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'
import { LongTextField } from 'uniforms-bootstrap4'

const baseSchema = {
  title: 'Organization',
  type: 'object',
  properties: {
    '@id': { type: 'string', label: 'ID' },
    orgName: { type: 'string', label: 'Organization Name' },
    description: {
      type: 'string',
      label: 'About',
      uniforms: { component: LongTextField }
    },
    lisa: { type: 'string', label: 'Category' },
    website: { type: 'string' }
  },
  required: ['orgName', 'organizationType']
}

const ajv = new Ajv({ allErrors: true, useDefaults: true })

function createValidator(schema) {
  const validator = ajv.compile(schema)

  return (model) => {
    validator(model)
    return validator.errors?.length ? { details: validator.errors } : null
  }
}

const schemaValidator = createValidator(baseSchema)

export default new JSONSchemaBridge(baseSchema, schemaValidator)
