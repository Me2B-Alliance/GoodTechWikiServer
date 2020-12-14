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
 * "/logs"
 *
 */
export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const session = await getSession({ req })
      if (session) {
        const result = await wiki.addLog(req.body.log)
        return res.status(200).json(result)
      }
      return res.status(401).end('Unauthorized')
    }

    if (req.method === 'GET') {
      // Get logs for a specific document by id
      if (req.query.docId) {
        const logs = await wiki.getLogsByDocumentId(req.query.docId)
        return res.status(200).json(logs)
      }
      // Get all logs if docId isn't passed to url params
      const logs = await wiki.getAllLogs()
      return res.status(200).json(logs)
    }

    return res.status(400).end('Unsupported Method')
  } catch (err) {
    return res.status(500).end(`An error occurred: ${err.message}`)
  }
}
