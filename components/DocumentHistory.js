/**
 * Dependencies
 */
import { useEffect, useState } from 'react'

/**
 * Local Dependencies
 */
import { Fetcher } from 'lib/helpers'

/**
 * DocumentHistory Component
 * For displaying history of a single document
 */
export default function DocumentHistory({ docId }) {
  const [logs, setLogs] = useState()

  useEffect(async () => {
    // Fetch logs on component mount
    const res = await Fetcher('getLogs', { docId })

    setLogs(res)
  }, [])

  const buildLogsList = () => {
    // Sort chronologically
    const sorted = logs.sort((a, b) => b.date - a.date)

    return sorted.map((log) => {
      const date = new Date(log.date)
      let message = ''
      // Set ui Message for log types
      switch (log.type) {
        case 'new':
          message = 'Created'
          break
        case 'change':
          message = 'Changed'
          break
        case 'delete':
          message = 'Deleted'
          break
        default:
          break
      }
      return (
        <>
          <h5>{message}</h5>
          <p style={{ paddingBottom: '15px' }}>
            By
            {log.user !== 'system'
              && <a href={`https://github.com/${log.user}`}> {log.user} </a>
              || ' system '}
            on {date.toLocaleString()}
          </p>
        </>
      )
    })
  }

  return (
    <div>
      <h3 style={{ paddingBottom: '30px' }}>History</h3>
      { logs && logs.length > 0
        && buildLogsList()}
    </div>
  )
}
