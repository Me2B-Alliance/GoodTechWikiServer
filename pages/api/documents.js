/**
 * Local Dependencies
 */
import wiki from 'lib/wiki'

/**
 * API Endpoint
 *
 * "/documents"
 *
 * @returns {Promise<JSON>} Promise response with a json object array of all documents
 */
export default (req, res) => new Promise((resolve, reject) => {
  wiki.getAll().then((results) => {
    const out = {
      results
    }
    res.status(200)
    res.json(out)
    res.end()

    resolve()
  }).catch((error) => {
    res.status(400)
    res.json(error)
    res.end()

    resolve()
  })
})
