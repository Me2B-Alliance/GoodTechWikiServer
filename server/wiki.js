/**
 * Dependencies
 */
const timestamp = require('monotonic-timestamp')
const PouchDB = require('pouchdb')
const context = require('./context')
const schemas = require('../schemas')

/**
 * Plugins
 */
PouchDB.plugin(require('pouchdb-find'))

/**
 * Wiki
 */
class Wiki {
  /**
     * Constructor
     * @param {*} base URL with scheme and hostname
     * @param {*} path Filesystem path to database storage
     * @param {*} context JSON-LD Context
     * @param {*} schemas JSON Schemas
     */
  constructor({
    base, path, context, schemas
  }) {
    this.base = base
    this.path = path
    this.context = context
    this.schemas = schemas

    Object.defineProperties(this, {
      docs: { value: new PouchDB(`${path}/docs`) },
      logs: { value: new PouchDB(`${path}/logs`) }
    })
  }

  /**
     * changes
     * @param {Object} options
     */
  async changes(options = {}) {
    return this.logs.allDocs({
      include_docs: true,
      descending: true,
      limit: options.limit || 10,
      skip: options.skip || 10
    })
      .then((entries) => entries.rows.map((row) => row.doc))
  }

  /**
     * find
     * @param {Object} options Mango query object
     */
  async find(options = {}) {
    return this.docs.find(options)
  }

  /**
     * get
     * @param {String} url
     */
  async get(url) {
    return this.docs.get(url)
  }

  /**
     * import
     * @param {Array} documents
     */
  async import(documents) {
    const { docs, logs } = this

    // add documents to database
    await docs.bulkDocs(documents.map((doc) => {
      doc._id = doc['@id']
      return doc
    }))

    // add log entries
    await logs.bulkDocs(documents.map((doc) => {
      doc._id = timestamp()
      return { user: { login: 'system' }, update: doc }
    }))

    // create indices
    await docs.createIndex({ index: { fields: ['@type'] } })
    await docs.createIndex({ index: { fields: ['lisa'] } })

    return { imported: documents.length }
  }
}

/**
 * Export
 */
module.exports = new Wiki({
  base: 'https://goodtech.wiki',
  path: './data/wiki',
  context,
  schemas
})
