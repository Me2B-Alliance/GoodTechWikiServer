/**
 * Dependencies
 */
import Tags from '@yaireo/tagify/dist/react.tagify'
import { useEffect, useState } from 'react'
import { connectField } from 'uniforms'

/**
 * Local Dependencies
 */
import { Fetcher } from 'lib/helpers'
import regions from 'config/regions'

/**
 * MultiField Component
 */
function MultiField({
  onChange: onChangeUniform, value, label, name
}) {
  const [tags, setTags] = useState(value || [])
  const [tagifyProps, setTagifyProps] = useState({})

  const handleChange = (changedTags) => {
    // Fix tagify returning an empty string when no tags exist
    if (changedTags === '') {
      setTags([])
      onChangeUniform([])
    }
    if (changedTags) {
      // Parse tagify tags string
      const parsedTags = JSON.parse(changedTags)

      setTags(changedTags)

      const newTags = parsedTags.map((tag) => tag.value)

      // Return the updated tags to uniform
      onChangeUniform(newTags)
    } else {
      setTags([])
    }
  }

  // Tagify settings object
  const baseTagifySettings = {
    maxTags: 10,
    placeholder: 'Search or add items',
    dropdown: {
      enabled: 1, // always show suggestions dropdown
      highlightFirst: false,
      maxItems: 10
    },
    callbacks: {
    },
    addTagOnBlur: true, // add tag when clicking off field
    editTags: {
      clicks: 1
    },
    backspace: true,
    autoComplete: {
      rightKey: true
    }
  }

  // When component mounts
  useEffect(async () => {
    setTagifyProps({ loading: true })

    let _tags
    let serverTags
    // Fetch tags
    if (name === 'scope') {
      serverTags = regions
    } else if (name === 'productsAndOrServices') {
      serverTags = []
    } else {
      _tags = await Fetcher('getTags', { name })
      serverTags = _tags.map((tag) => tag.key)
    }

    // Update tagify props with fetched tags
    setTagifyProps((previousProps) => ({
      ...previousProps,
      loading: false,
      whitelist: serverTags,
      showFilteredDropdown: 'a'
    }))
  }, [])

  return (
    <div className="form-group">
      <div className="MultiField">
        <label> {label} </label>
        <Tags
          settings={baseTagifySettings}
          value={tags}
          {...tagifyProps}
          onChange={(event) => handleChange(event.target.value)}
        />
      </div>
    </div>
  )
}

export default connectField(MultiField)
