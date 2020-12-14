import Ajv from 'ajv'
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'

const baseSchema = {
  title: 'Working Group',
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
    parentOrg: {
      title: 'Parent Org',
      type: 'string'
    },
    activities: {
      title: 'Activities',
      type: 'array',
      items: {
        0: String
      }
    },
    category: {
      title: 'Category',
      type: 'array',
      items: {
        0: String
      }
    },
    dateEnded: {
      title: 'Date Ended',
      type: 'string'
    },
    dateFounded: {
      title: 'Date Founded',
      type: 'string'
    },
    digitalHarmsAddressed: {
      title: 'Digital Harms Addressed',
      type: 'array',
      items: {
        0: String
      }
    },
    github: {
      title: 'Github',
      type: 'string'
    },
    ipr: {
      title: 'Ipr',
      type: 'string'
    },
    meetingFrequency: {
      title: 'Meeting Frequency',
      type: 'string'
    },
    people: {
      title: 'People',
      type: 'array',
      items: {
        0: String
      }
    },
    purpose: {
      title: 'Purpose',
      type: 'array',
      items: {
        0: String
      }
    },
    relevantStandards: {
      title: 'Relevant Standards',
      type: 'string'
    },
    status: {
      title: 'Status',
      type: 'string'
    },
    techFocus: {
      title: 'Tech Focus',
      type: 'string'
    },
    url: {
      title: 'Url',
      type: 'string'
    },
    about: {
      title: 'About',
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
