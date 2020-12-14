/**
 * Slugify
 * Convert document title into slug
 *
 * @param {String} base - Website base url path
 * @param {String} type - Document type
 * @param {String} title - Document title as identifer
 * @returns {String} Slugified document url
 */
export function Slugify(base, type, title) {
  const slug = title
    .toLowerCase()
    .split(' ')
    .map((word) => word && word.replace(word[0], word[0].toUpperCase()))
    .join('')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]|_/g, '')

  const url = new URL(base)
  url.pathname = `${type}/${slug}`
  return url.toString()
}

/**
 * FixType
 * Convert document type for database queries
 *
 * @param {String} type - Document type name to fix
 * @returns {String} String with fixed type
 */
export function FixType(type) {
  if (type === 'workinggroups') {
    return 'WorkingGroup'
  }
  // Set first letter of type to upper case and remove ending 's'
  return (type.charAt(0).toUpperCase() + type.slice(1)).slice(0, -1)
}

/**
 * Fetcher
 * Create custom fetch requests for api calls
 *
 * @param {String} type - Type of fetch operation
 * @param {Object} options - Custom options for different type fetches
 * @returns {Promise<Object>} Resulting object from fetch
 */
export async function Fetcher(type, options = {}) {
  let fetchParams = {}
  let url = ''
  switch (type) {
    case 'addDoc':
      url = `/api/documents/${options.type}/${encodeURIComponent(options.name)}`
      fetchParams = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ doc: options.doc })
      }
      break
    case 'getDoc':
      url = `/api/documents/${options.type}/${encodeURIComponent(options.name)}`
      fetchParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      break
    case 'deleteDoc':
      url = `/api/documents/${options.type}/${encodeURIComponent(options.name)}`
      fetchParams = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ doc: options.doc, delete: true })
      }
      break
    case 'getTags':
      url = `/api/documents/tags?type=${options.name}`
      fetchParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      break
    case 'getLogs':
      url = `/api/logs?docId=${options.docId}`
      fetchParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      break
    default:
      break
  }

  const results = await fetch(url, fetchParams).then((res) => res.json())

  if (results.docs) {
    return results.docs
  }

  return results
}
