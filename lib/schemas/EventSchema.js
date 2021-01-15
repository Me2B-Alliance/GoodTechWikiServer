import Ajv from 'ajv'
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'
import { LongTextField } from 'uniforms-bootstrap4'

const baseSchema = {
  title: 'Event',
  type: 'object',
  properties: {
    uuid: {
      title: 'Uuid',
      type: 'string'
    },
    name: {
      title: 'Name *',
      type: 'string'
    },
    about: {
      title: 'About',
      type: 'string',
      uniforms: { component: LongTextField }
    },
    audience: {
      title: 'Audience',
      type: 'string'
    },
    category: {
      title: 'Category',
      type: 'array',
      items: {
        0: String
      }
    },
    tags: {
      title: 'Tags',
      type: 'array',
      items: {
        0: String
      }
    },
    date: {
      title: 'Date',
      type: 'string'
    },
    frequency: {
      title: 'Frequency',
      type: 'string'
    },
    website: {
      title: 'Website',
      type: 'string'
    },
    github: {
      title: 'Github',
      type: 'string'
    },
    hostOrganization: {
      title: 'Host Organization',
      type: 'string'
    },
    locations: {
      title: 'Locations',
      type: 'array',
      items: {
        0: String
      }
    },
    partners: {
      title: 'Partners',
      type: 'string'
    },
    people: {
      title: 'People',
      type: 'array',
      items: {
        0: String
      }
    },
    relevantPublications: {
      title: 'Publications',
      type: 'string'
    },
    workingGroup: {
      title: 'Working Group',
      type: 'string'
    }
  },
  required: ['name']
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
