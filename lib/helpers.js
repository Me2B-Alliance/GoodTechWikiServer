/**
 * Slugify
 * Convert document title into slug
 *
 * @param {String} base Website base url path
 * @param {String} type Document type
 * @param {String} title Document title as identifer
 * @returns {String} Slugified title
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
 * @param {} type Document type name to fix
 * @returns {String} String with fixed type
 */
export function FixType(type) {
  if (type === 'workinggroups') {
    return 'WorkingGroup'
  }
  // Set first letter of type to upper case and remove ending 's'
  return (type.charAt(0).toUpperCase() + type.slice(1)).slice(0, -1)
}
