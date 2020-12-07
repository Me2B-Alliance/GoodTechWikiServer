import wiki from 'lib/wiki'

/**
 * API Endpoint
 *
 * "/documents/tags"
 *
 * @returns {Promise<JSON>} Promise response with json object array of all tags
 */
export default async (req, res) => new Promise((resolve, reject) => {
  const { query: { type } } = req

  wiki.getTags(type).then((result) => {
    res.status(200)
    res.json(result.rows)
    res.end()

    resolve()
  }).catch((error) => {
    res.json(error)
    res.status(400)
    res.end()

    resolve()
  })
})
