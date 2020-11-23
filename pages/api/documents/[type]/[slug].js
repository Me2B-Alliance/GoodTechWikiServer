/**
 * Local Dependencies
 */
import wiki from 'lib/wiki'
import { Slugify, FixType } from 'lib/helpers'

/**
 * getDoc
 * Get a single document by title
 *
 * @param {String} title Document title
 * @param {String} type Document type for slugifying
 * @returns {Promise<Object>} Promise containing object array of all documents
 */
export async function getDoc(title, type) {
  let slugged = ''
  if (type === 'workinggroups') {
    slugged = Slugify('https://goodtech.wiki', 'WorkingGroup', title)
  } else {
    slugged = Slugify('https://goodtech.wiki', FixType(type), title)
  }
  return wiki.get(slugged)
}

/**
 * API Endpoint
 *
 * "/documents/[type]"
 *
 * @returns {Response} HTML Response with a json object of a single document
 */
export default (req, res) => {
  const { query: { type, slug } } = req

  getDoc(slug, type).then((results) => {
    const out = {
      docs: results
    }
    res.status(200).json(out)
  })
}
