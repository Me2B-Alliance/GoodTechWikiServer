/**
 * Dependencies
 */
const PouchDB = require('pouchdb')

/**
 * Local Dependencies
 */
const { Slugify, FixType } = require('lib/helpers')
const NewDocs = require('data/docs.json')

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
    base, path
  }) {
    this.base = base
    this.path = path

    Object.defineProperties(this, {
      docs: { value: new PouchDB(`${path}/docs`) },
      logs: { value: new PouchDB(`${path}/logs`) }
    })
  }

  /**
     * getAllLogs
     * Get all logs from database
     *
     * @returns {Promise<Object>} Object containing all logs
     */
  async getAllLogs() {
    return this.logs.allDocs({
      include_docs: true,
      descending: true
    })
      .then((entries) => entries.rows.map((row) => row.doc))
      .catch((err) => err)
  }

  /**
   * getLogsByDocument
   * Get a list of logs for a specific document
   *
   * @param {String} docId ID of document to fetch logs for
   * @returns {Promise<Object>} Log for document
   */
  async getLogsByDocumentId(docId) {
    return this.logs.find({ selector: { docId } }).catch((err) => err)
  }

  /**
   * addLog
   * Add a new log for a document
   *
   * @param {Object} log The log object
   * @returns {Promise<Object>} Status result of db put
   */
  async addLog(options = {}) {
    if (options.type === 'delete') {
      const log = {
        type: 'delete',
        user: options.username,
        docId: options.doc._id,
        oldDoc: options.doc,
        date: +new Date()
      }
      return this.logs.post(log).catch((err) => err)
    }

    let prevDoc
    if (options.doc._rev) {
      prevDoc = await this.getDocByID(options.doc._id)
    }

    const log = {
      type: 'new',
      user: options.username,
      docId: options.doc._id,
      newDoc: options.doc,
      date: +new Date()
    }

    if (prevDoc) {
      log.type = 'change'
      log.oldDoc = prevDoc
    }

    return this.logs.post(log).catch((err) => err)
  }

  /**
   * getDoc
   * Get a single document
   *
   * @param {String} title Document title
   * @param {String} type Document type
   * @returns {Promise<Object>} Promise object containing doc
   */
  async getDoc(title, type) {
    const slugged = Slugify('https://goodtech.wiki', FixType(type), title)
    return this.docs.get(slugged).catch((err) => err)
  }

  /**
   * getAllDocs
   * Get all documents
   *
   * @returns {Promise<Object>} Promise object containing all doc
   */
  async getAllDocs() {
    return this.docs.allDocs({
      include_docs: true,
      attachments: true
    }).catch((err) => err)
  }

  /**
   * getDocByID
   * Get a single document
   *
   * @param {String} id Document id to fetch by
   * @returns {Promise<Object>} Promise object containing doc
   */
  async getDocByID(id) {
    return this.docs.get(id).catch((err) => err)
  }

  /**
   * getDocsByType
   * Get all documents by a type and query selectors
   *
   * @param {String} type The type of document to filter for
   * @param {Object} options Any additional query selectors
   * @returns {Promise<Object>} Object array of searched results
   */
  async getDocsByType(type, options = {}) {
    const { docs } = this
    const dbQuery = {
      selector: { '@type': FixType(type) }
    }

    if (options.category) {
      dbQuery.selector.lisa = decodeURIComponent(options.category)
    }

    if (type === 'workinggroups') {
      dbQuery.selector['@type'] = 'WorkingGroup'
    }

    let { docs: results } = await docs.find(dbQuery)

    // Get document count for pagination
    const count = results.length

    // If a page has been passed only return paged documents
    if (options.page) {
      const lower = options.page === 1 ? 0 : (options.page * 10) - 10
      const upper = options.page === 1 ? 10 : options.page * 10

      results = results.slice(lower, upper)
    }

    return { docs: results, count }
  }

  /**
   * addDoc
   * Add a new document
   *
   * @param {Object} doc Document object
   * @param {String} type Document type
   * @returns {Promise<Object>} Object containing all document fields to be adde
   */
  async addDoc(doc, type) {
    try {
      if (doc._id) {
        return await this.docs.put(doc)
      }

      const newDoc = doc
      const fixedType = FixType(type)
      const slugged = Slugify('https://goodtech.wiki', fixedType, doc.name)
      newDoc._id = String(slugged)
      newDoc['@context'] = 'https://goodtech.wiki'
      newDoc['@type'] = fixedType
      newDoc['@id'] = slugged
      return await this.docs.put(newDoc)
    } catch (err) {
      return { err }
    }
  }

  /**
   * deleteDoc
   * Delete a document
   *
   * @param {Object} doc Document object
   * @returns {Promise<Object>} Status object of deleted doc
   */
  async deleteDoc(doc) {
    const slugged = Slugify('https://goodtech.wiki', doc['@type'], doc.name)
    try {
      return await this.docs.get(slugged).then((res) => this.docs.remove(res))
    } catch (err) {
      return { err }
    }
  }

  /**
   * import
   * import Raw documents into db
   *
   * @returns {Promise<Object>} Count of added documents
   */
  async import() {
    const { docs, logs } = this

    const documents = NewDocs

    // add documents to database
    await docs.bulkDocs(documents.map((doc) => {
      doc._id = doc['@id']
      return doc
    }))

    // add log entries
    await logs.bulkDocs(documents.map((doc) => {
      const log = {
        type: 'new',
        user: 'system',
        docId: doc['@id'],
        newDoc: doc,
        date: +new Date()
      }
      return log
    }))

    // create indices
    await docs.createIndex({ index: { fields: ['@type'] } })
    await docs.createIndex({ index: { fields: ['lisa'] } })
    await logs.createIndex({ index: { fields: ['docId'] } })

    return { imported: documents.length }
  }

  /**
   * putDdocs
   * Add custom design docs for indexing and searching
   *
   * @returns {Promise<Object>} Status of the ddoc put
   */
  async putDdocs() {
    const { docs } = this

    function tagMapper(doc) {
      // eslint-disable-next-line no-undef
      doc.tags && doc.tags.map((tag) => emit(tag))
    }
    function locationMapper(doc) {
      // eslint-disable-next-line no-undef
      doc.locations && doc.locations.map((tag) => emit(tag))
    }
    function peopleMapper(doc) {
      // eslint-disable-next-line no-undef
      doc.people && doc.people.map((tag) => emit(tag))
    }
    function keyPeopleMapper(doc) {
      // eslint-disable-next-line no-undef
      doc.keyPeople && doc.keyPeople.map((tag) => emit(tag))
    }
    function activitiesMapper(doc) {
      // eslint-disable-next-line no-undef
      doc.activities && doc.activities.map((tag) => emit(tag))
    }
    function purposeMapper(doc) {
      // eslint-disable-next-line no-undef
      doc.purpose && doc.purpose.map((tag) => emit(tag))
    }
    function digitalHarmsAddressedMapper(doc) {
      // eslint-disable-next-line no-undef
      doc.digitalHarmsAddressed && doc.digitalHarmsAddressed.map((tag) => emit(tag))
    }
    function categoryMapper(doc) {
      // eslint-disable-next-line no-undef
      doc.category && doc.category.map((tag) => emit(tag))
    }
    function authorsEditorsMapper(doc) {
      // eslint-disable-next-line no-undef
      doc.authorsEditors && doc.authorsEditors.map((tag) => emit(tag))
    }

    function reducer(keys, values, rereduce) {
      return keys
    }

    const ddoc = {
      _id: '_design/autosuggest',
      views: {
        tags: {
          map: tagMapper.toString(),
          reduce: reducer.toString()
        },
        locations: {
          map: locationMapper.toString(),
          reduce: reducer.toString()
        },
        people: {
          map: peopleMapper.toString(),
          reduce: reducer.toString()
        },
        keyPeople: {
          map: keyPeopleMapper.toString(),
          reduce: reducer.toString()
        },
        activities: {
          map: activitiesMapper.toString(),
          reduce: reducer.toString()
        },
        purpose: {
          map: purposeMapper.toString(),
          reduce: reducer.toString()
        },
        digitalHarmsAddressed: {
          map: digitalHarmsAddressedMapper.toString(),
          reduce: reducer.toString()
        },
        category: {
          map: categoryMapper.toString(),
          reduce: reducer.toString()
        },
        authorsEditors: {
          map: authorsEditorsMapper.toString(),
          reduce: reducer.toString()
        }
      }
    }

    return docs.put(ddoc).catch((err) => err)
  }

  /**
   * getTags
   * Get a list of tags of a specific type for autosuggestions
   *
   * @param {} Type of tags to return
   * @returns {Promise<Object>} List of resulting tags
   */
  async getTags(type) {
    const { docs } = this

    return docs.query(`autosuggest/${type}`, { reduce: true, group: true })
      .catch((err) => err)
  }
}

/**
 * Export
 */
module.exports = new Wiki({
  base: 'https://goodtech.wiki',
  path: './data/wiki'
})
