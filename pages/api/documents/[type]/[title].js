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
 */
export default async (req, res) => {
  try {
    const { type, title } = req.query

    if (req.method === 'POST') {
      const session = await getSession({ req })

      // Only allow posts from logged in users
      if (session) {
        // Delete document if delete is passed as a param in body
        if (req.body.delete) {
          const docToDelete = req.body.doc
          const result = await wiki.deleteDoc(docToDelete)

          // Create a log of the deletion
          await wiki.addLog({ username: session.user.name, doc: docToDelete, type: 'delete' })

          return res.status(200).json(result)
        }

        // Adding/Updating a document
        const docToAdd = req.body.doc

        const result = await wiki.addDoc(docToAdd, type)
        const updatedDoc = await wiki.getDocByID(result.id)

        // Create a log of the change
        await wiki.addLog({ username: session.user.name, doc: docToAdd })

        return res.status(200).json({ result, updatedDoc })
      }
      return res.status(401).end('Unauthorized')
    }

    if (req.method === 'GET') {
      const results = await wiki.getDoc(title, type)
      return res.status(200).json({ docs: results })
    }

    return res.status(400).end('Unsupported Method')
  } catch (err) {
    return res.status(500).end(`An error occurred: ${err.message}`)
  }
}
