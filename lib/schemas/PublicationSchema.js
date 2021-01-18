import Ajv from 'ajv'
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'
import { LongTextField } from 'uniforms-bootstrap4'

const baseSchema = {
  title: 'Publication',
  type: 'object',
  properties: {
    uuid: {
      title: 'Uuid',
      type: 'string'
    },
    name: {
      title: 'Publication Name *',
      type: 'string'
    },
    about: {
      title: 'About',
      type: 'string',
      uniforms: { component: LongTextField }
    },
    publicationType: {
      title: 'Publication Type',
      type: 'string'
    },
    sector: {
      title: 'Sector',
      type: 'string'
    },
    sponsoringOrg: {
      title: 'Sponsoring Org',
      type: 'string'
    },
    url: {
      title: 'Url',
      type: 'string'
    },
    github: {
      title: 'Github Profile',
      type: 'string'
    },
    audience: {
      title: 'Audience',
      type: 'string'
    },
    jurisdiction: {
      title: 'Jurisdiction',
      type: 'string'
    },
    workingGroup: {
      title: 'Working Group',
      type: 'string'
    },
    versionOrEdition: {
      title: 'Version Or Edition',
      type: 'string'
    },
    authorsEditors: {
      title: 'Authors and Editors',
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
    // digitalHarmsAddressed: {
    //   title: 'Digital Harms Addressed',
    //   type: 'array',
    //   items: {
    //     0: String
    //   }
    // },
    license: {
      title: 'License',
      type: 'string'
    },
    purpose: {
      title: 'Purpose',
      type: 'array',
      items: {
        0: String
      }
    },
    techFocus: {
      title: 'Tech Focus',
      type: 'string'
    },
    volumeFrequency: {
      title: 'Volume Frequency',
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
