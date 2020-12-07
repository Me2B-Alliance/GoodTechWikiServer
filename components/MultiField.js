/**
 * Dependencies
 */
import Tags from '@yaireo/tagify/dist/react.tagify'
import { useEffect, useState } from 'react'
import { connectField } from 'uniforms'

/**
 * MultiField Component
 */
function MultiField({ onChange: onChangee, value, label, name }) {
  const [tags, setTags] = useState(value || [])
  const [tagifyProps, setTagifyProps] = useState({})

  const fetchTags = async () => {
    const results = await fetch(`/api/documents/tags?type=${name}`)
      .then((res) => res.json())
    const _tags = results.map((tag) => tag.key)
    return _tags
  }

  const handleChange = (changedTags) => {
    if (changedTags === '') {
      setTags([])
      onChangee([])
    }
    if (changedTags) {
      const parsedTags = JSON.parse(changedTags)
      setTags(changedTags)
      const newTags = parsedTags.map((tag) => tag.value)
      onChangee(newTags)
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
      // add: callback,
      // remove: callback,
      // input: callback,
      // edit: callback,
      // invalid: callback,
      // click: callback,
      // keydown: callback,
      // focus: callback,
      // blur: callback,
      // "edit:input": callback,
      // "edit:updated": callback,
      // "edit:start": callback,
      // "edit:keydown": callback,
      // "dropdown:show": callback,
      // "dropdown:hide": callback,
      // "dropdown:select": callback
    },
    addTagOnBlur: false,
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
    const serverTags = await fetchTags()
    setTagifyProps((lastProps) => ({
      ...lastProps,
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
