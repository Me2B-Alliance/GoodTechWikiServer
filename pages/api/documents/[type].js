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
  const dbQuery = {
    selector: { '@type': FixType(type) }
  }

  if (options.category) {
    dbQuery.selector.lisa = decodeURIComponent(options.category)
  }

  if (type === 'workinggroups') {
    dbQuery.selector['@type'] = 'WorkingGroup'
  }

  let { docs: results } = await wiki.find(dbQuery)
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
