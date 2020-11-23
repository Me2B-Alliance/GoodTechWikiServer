/**
 * Local Dependencies
 */
import wiki from 'lib/wiki'
import { FixType } from 'lib/helpers'

/**
 * getDocsByType
 * Get all documents by a type and query selectors
 *
 * @param {String} type The type of document to filter for
 * @param {Object} options Any additional query selectors
 * @returns {Promise<Object>} Object array of searched results
 */
export async function getDocsByType(type, options = {}) {
  let dbQuery = { '@type': FixType(type) }

  if (options.category) {
    dbQuery.lisa = decodeURIComponent(options.category)
  }

  if (type === 'workinggroups') {
    dbQuery = { '@type': 'WorkingGroup' }
  }

  return wiki.find({ selector: { ...dbQuery } })
}

/**
 * API Endpoint
 *
 * "/documents/type"
 *
 * @returns {Response} HTML Response with json object array of filtered documents
 */
export default (req, res) => {
  const { query: { type } } = req

  getDocsByType(type).then((results) => {
    const out = {
      docs: results.docs
    }
    res.status(200).json(out)
  })
}
