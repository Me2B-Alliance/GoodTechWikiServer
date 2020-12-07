/**
 * Local Dependencies
 */
import wiki from 'lib/wiki'

/**
 * API Endpoint
 *
 * "/documents/[type]"
 *
 * @returns {Promise<JSON>} Promise response with json object array of filtered documents
 */
export default async (req, res) => {
  const { query: { type, page, category } } = req

  return new Promise((resolve, reject) => {
    wiki.getDocsByType(type, { category, page }).then((result) => {
      const out = {
        docs: result.docs,
        category,
        page
      }
      res.status(200)
      res.json(out)
      res.end()

      resolve()
    }).catch((error) => {
      res.json(error)
      res.status(400)
      res.end()

      resolve()
    })
  })
}
