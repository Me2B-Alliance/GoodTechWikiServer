import Ajv from 'ajv'
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'
import { LongTextField } from 'uniforms-bootstrap4'

const baseSchema = {
  title: 'Organization',
  type: 'object',
  properties: {
    uuid: {
      title: 'Uuid',
      type: 'string'
    },
    '@type': {
      label: 'Type',
      type: 'string'
    },
    name: {
      label: 'Organization Name *',
      type: 'string'
    },
    lisa: {
      label: 'Category *',
      type: 'string'
    },
    about: {
      label: 'Description',
      type: 'string',
      uniforms: { component: LongTextField }
    },
    dateFounded: {
      label: 'Date Founded',
      type: 'string'
    },
    dateEnded: {
      label: 'Date Ended',
      type: 'string'
    },
    organizationType: {
      label: 'Organization Type',
      type: 'string'
    },
    parentOrg: {
      label: 'Parent Org',
      type: 'string'
    },
    website: {
      label: 'Website',
      type: 'string'
    },
    twitter: {
      label: 'Twitter Profile',
      type: 'string'
    },
    linkedin: {
      label: 'Linkedin Profile',
      type: 'string'
    },
    facebook: {
      title: 'Facebook',
      type: 'string'
    },
    wikipedia: {
      title: 'Wikipedia',
      type: 'string'
    },
    github: {
      label: 'Github Profile',
      type: 'string'
    },
    scope: {
      label: 'Region',
      type: 'array',
      items: {
        0: String
      }
    },
    sector: {
      label: 'Sector',
      type: 'string'
    },
    tags: {
      title: 'Tags',
      type: 'array',
      items: {
        0: String
      }
    },
    keyPeople: {
      label: 'Key People',
      type: 'array',
      items: {
        0: String
      }
    },
    activities: {
      title: 'Activities',
      type: 'array',
      items: {
        0: String
      }
    },
    locations: {
      title: 'Locations',
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
    status: {
      label: 'Status',
      type: 'string'
    },
    techFocus: {
      label: 'Tech Focus',
      type: 'string'
    },
    relevantPublications: {
      label: 'Publications',
      type: 'string'
    },
    audience: {
      title: 'Audience',
      type: 'string'
    },
    productsAndOrServices: {
      title: 'Products And Or Services',
      type: 'array',
      items: {
        0: String
      }
    }
  },
  required: ['name', 'lisa']
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
