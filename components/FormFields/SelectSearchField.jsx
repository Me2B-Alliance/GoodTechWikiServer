/**
 * Dependencies
 */
import { useEffect, useState } from 'react'
import { connectField } from 'uniforms'
import Creatable from 'react-select/creatable'
import Select from 'react-select'

/**
 * Local Dependencies
 */
import { Fetcher } from 'lib/helpers'

const engagements = [
  'Product Design & Dev Practices', 'Technology Standards',
  'Industry Advocacy and Education', 'Tools/Infrastructure/Services Development for B-s',
  'Tools Development for Me-s', 'Product Testing', 'Org Compliance and Testing',
  'Regulation, Legal, Policy', 'Consumer Advocacy and Education', 'Other'
]

/**
 * MultiField Component
 */
function SelectSearchField({
  onChange: onChangeUniform, value, label, name
}) {
  const [tags, setTags] = useState()
  const [selectedTag, setSelectedTag] = useState()

  // When component mounts
  useEffect(async () => {
    // Fetch tags
    if (name !== 'lisa') {
      const _tags = await Fetcher('getTags', { name })
      const serverTags = _tags.map((tag) => ({ value: tag.key, label: tag.key }))

      setTags(serverTags)
    } else {
      setTags(engagements.map((eng) => ({ value: eng, label: eng })))
    }
    if (value) {
      setSelectedTag({ value, label: value })
    }
  }, [])

  const handleChange = (newValue, actionMeta) => {
    setSelectedTag(newValue)
    if (actionMeta.action === 'clear') {
      onChangeUniform('')
    } else {
      onChangeUniform(newValue.value)
    }
  }
  const handleInputChange = () => {
    //
  }

  return (

    <div className="form-group">
      <div className="SelectSearchField">
        <label> {label} </label>
        {name === 'lisa'
          && (
            <Select
              style={{ zIndex: 'inherit' }}
              onChange={handleChange}
              onInputChange={handleInputChange}
              options={tags}
              placeholder="Select a category"
              value={selectedTag}
            />
          )
          || (
            <Creatable
              style={{ zIndex: 'inherit' }}
              isClearable
              onChange={handleChange}
              onInputChange={handleInputChange}
              options={tags}
              placeholder="Search and select or create an item"
              value={selectedTag}
            />
          )}
      </div>
    </div>
  )
}
export default connectField(SelectSearchField)
