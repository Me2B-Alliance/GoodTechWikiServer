/**
 * Local Dependencies
 */
import wiki from 'lib/wiki'

/**
 * API Endpoint
 *
 * "/documents"
 *
 */
export default (_req, res) => new Promise((resolve) => {
  wiki.getAllDocs().then((results) => {
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
