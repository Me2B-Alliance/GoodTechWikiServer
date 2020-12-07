/**
 * Dependencies
 */
import { capitalCase } from 'change-case'
import Link from 'next/link'

/**
 * Document Component
 * For single document displaying
 */
export default function Document({ doc }) {
  /**
   * addToArray
   * Add an item to an array at an index
   *
   * @param {Array} array Array to modify
   * @param {Number} index Index of array to add item
   * @param {*} item New item to be added
   * @returns {Array} New array with item inserted
   */
  const addToArray = (array, index, item) => [
    // part of the array before the specified index
    ...array.slice(0, index),
    // inserted item
    item,
    // part of the array after the specified index
    ...array.slice(index)
  ]

  let out = []
  const ignored = ['@context', '@id', 'uuid', '_rev', '_id']

  for (const [key, value] of Object.entries(doc)) {
    if (!ignored.includes(key)) {
      if (Array.isArray(value) && typeof value[0] === 'object') {
        out.push(<h4 id="document-view-key-title">{capitalCase(key)}</h4>)

        for (const edge in value) {
          for (const [edgeKey, edgeValue] of Object.entries(value[edge])) {
            if (edgeKey === 'name') {
              out.push(
                // eslint-disable-next-line no-script-url
                <Link href="javascript:;">
                  <a>
                    <p>{edgeValue}</p>
                  </a>
                </Link>
              )
            }
          }
        }
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          out.push(<h4 id="document-view-key-title">{capitalCase(key)}</h4>)
          for (const item of value) {
            out.push(<p id="document-view-sub-key">{item}</p>)
          }
        }
      } else if (key === 'name') {
        out = addToArray(out, 0, <h2 id="document-view-name">{value}</h2>)
      } else if (key === '@type') {
        out = addToArray(out, 1, <h4 id="document-view-type">{value}</h4>)
      } else if (key === 'about') {
        out = addToArray(out, 2, (<><h4>About</h4> <p id="document-view-key">{value}</p></>))
      } else if (value === '') {
        // do nothing
      } else if (key === 'lisa') {
        out.push(
          <>
            <h4 id="document-view-key-title">Category</h4>
            <p id="document-view-key">{value}</p>
          </>
        )
      } else {
        out.push(
          <div>
            <h4 id="document-view-key-title">{key[0].toUpperCase()}{key.substring(1)}</h4>
            <p id="document-view-key">{value}</p>
          </div>
        )
      }
    }
  }
  return out
}
