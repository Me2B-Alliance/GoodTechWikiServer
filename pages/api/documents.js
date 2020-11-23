/**
 * Local Dependencies
 */
import wiki from 'lib/wiki'

/**
 * getDocs
 * Get all documents
 *
 * @returns {Promise<Object>} Promise containing object array of all documents
 */
export async function getDocs() {
  return wiki.find({ selector: {} })
}

/**
 * API Endpoint
 *
 * "/documents"
 *
 * @returns {Response} HTML Response with a json object array of all documents
 */
export default (req, res) => {
  getDocs.then((results) => {
    const out = {
      docs: results.docs
    }
    res.status(200).json(out)
  })
}
