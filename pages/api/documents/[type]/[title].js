/**
 * Dependencies
 */
import { getSession } from 'next-auth/client'

/**
 * Local Dependencies
 */
import wiki from 'lib/wiki'

/**
 * API Endpoint
 *
 * "/documents/[type]/[title]"
 *
 * @returns {Promise<JSON>} Promise response with a json object of a single document
 */
export default async (req, res) => {
  const { query: { type, title } } = req

  if (req.method === 'POST') {
    const session = await getSession({ req })

    return new Promise((resolve, reject) => {
      if (session) {
        if (req.body.delete) {
          return wiki.deleteDoc(req.body.doc).then(async (result) => {
            res.status(200)
            res.json({ result })
            res.end()

            resolve()
          })
        }
        return wiki.addDoc(req.body.doc, type).then(async (result) => {
          // Get the newly updated doc and add to response
          const updatedDoc = await wiki.getDocByID(result.id)

          res.status(200)
          res.json({ result, updatedDoc })
          res.end()

          resolve()
        }).catch((error) => {
          res.status(400)
          res.json(error)
          res.end()

          resolve()
        })
      }
      res.status(401)
      res.end()

      resolve()
    })
  }

  if (req.method === 'GET') {
    return new Promise((resolve, reject) => {
      wiki.getDoc(title, type).then((results) => {
        const out = {
          docs: results
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
  }

  return new Promise((resolve, reject) => {
    res.status(405)
    res.end()
    reject(new Error('Unsupported method'))
  })
}
