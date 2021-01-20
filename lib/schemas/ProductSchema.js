import Ajv from 'ajv'
import { LongTextField } from 'uniforms-bootstrap4'
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'

const baseSchema = {
  title: 'Product',
  type: 'object',
  properties: {
    uuid: {
      title: 'Uuid',
      type: 'string'
    },
    name: {
      title: 'Product Name *',
      type: 'string'
    },
    about: {
      title: 'About',
      type: 'string',
      uniforms: { component: LongTextField }
    },
    parentOrg: {
      title: 'Parent Org',
      type: 'string'
    },
    category: {
      title: 'Category',
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
    url: {
      title: 'Url',
      type: 'string'
    },
    github: {
      title: 'Github Profile',
      type: 'string'
    },
    tags: {
      title: 'Tags',
      type: 'array',
      items: {
        0: String
      }
    },
    people: {
      title: 'People',
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
    me2bParticipation: {
      title: 'Me2b Participation',
      type: 'string'
    },
    relevantPublications: {
      title: 'Publications',
      type: 'string'
    },
    status: {
      title: 'Status',
      type: 'string'
    },
    // partners: {
    //   title: 'Partners',
    //   type: 'string'
    // },
    workingGroup: {
      title: 'Working Group',
      type: 'string'
    },
    dateBegun: {
      title: 'Date Begun',
      type: 'string'
    },
    dateEnded: {
      title: 'Date Ended',
      type: 'string'
    },
    audience: {
      title: 'Audience',
      type: 'string'
    },
    license: {
      title: 'License',
      type: 'string'
    },
    supportedIdentityTechnologies: {
      title: 'Supported Identity Technologies',
      type: 'string'
    },
    termsOfService: {
      title: 'Terms Of Service',
      type: 'string'
    },
    versionOrEdition: {
      title: 'Version Or Edition',
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
