/*
 * Adapted from https://github.com/utazabanje/js-cookie-consent
 *
*/

const cookieConsent = (config) => {
  if (config === null || config === undefined) {
    return
  }
  const cookieAvailable = getCookie(config?.cookieName)
  const acceptAllKeysArray = []
  const box = document.createElement('div')
  const mainTextBox = createMainTextBox(config?.message, config?.learnMore)
  const toggleBoxInner = createMainToggleBox(config, box)
  box.setAttribute('id', 'js-cookie-consent-box')
  box.classList.add('slide-up')

  if (cookieAvailable !== null) {
    box.style.display = 'none'
  } else {
    for (let i = 0; i < config?.options.length; i++) {
      acceptAllKeysArray.push(config?.options[i].key)
    }

    box.appendChild(mainTextBox)
    box.appendChild(toggleBoxInner)
    const actionBtns = createActionButtonBox(config, acceptAllKeysArray, box)
    box.appendChild(actionBtns)

    document.body.appendChild(box)
  }
}

const createMainTextBox = (text, link) => {
  const textBox = document.createElement('div')
  const message = createMessage(text)
  //const linkBtn = createLearnMoreBox(link)
  textBox.classList.add('js-cookie-consent-main-text-box')
  textBox.appendChild(message)
  //textBox.appendChild(linkBtn)

  return textBox
}

const createMessage = (text) => {
  const message = document.createElement('div')
  message.classList.add('title')
  message.innerHTML = text

  return message
}

const createLearnMoreBox = (link) => {
  const learnMoreBox = document.createElement('span')
  const linkBtn = createLearnMoreLink(link)
  learnMoreBox.classList.add('cookie-consent-learn-more-box')
  learnMoreBox.appendChild(linkBtn)

  return learnMoreBox
}

const createLearnMoreLink = (link) => {
  const emptyLink = document.createElement('a')
  const learnMore = document.createElement('a')
  learnMore.innerHTML = 'Learn More'
  learnMore.setAttribute('href', link)
  learnMore.setAttribute('target', '_blank')
  learnMore.setAttribute('rel', 'noopener noreferrer')
  learnMore.classList.add('cookie-consent-learn-more')

  if (link === undefined || link === null || link?.length === 0) {
    return emptyLink
  }
  return learnMore
}

const createMainToggleBox = (config, mainBox) => {
  const box = document.createElement('div')
  const keysArray = []
  const acceptAllKeysArray = []
  const saveBtn = createSaveCookieBox(config, mainBox, config?.color)

  box.classList.add('js-cookie-consent-toogle-box', 'closed')

  if (config?.options.length > 0) {
    for (let i = 0; i < config?.options.length; i++) {
      createToggleBtns(box, config?.options[i], config?.color)
      if (config.options[i].checked) {
        keysArray.push(config?.options[i].key)
      }

      acceptAllKeysArray.push(config?.options[i].key)
    }

    sessionStorage.setItem('categories', JSON.stringify(keysArray))
  }

  box.appendChild(saveBtn)

  return box
}

const createToggleBtns = (elem, options, color) => {
  const innerBox = crateToggleContainerElement()
  const title = createTitleElement(options?.title)
  const description = createDescriptionElement(options?.description)
  const label = createLabelElement(options?.key)
  const input = createInputElement(options?.checked)
  const slider = createSliderElement(options, color)

  label.appendChild(input)
  label.appendChild(slider)
  innerBox.appendChild(title)
  innerBox.appendChild(label)
  innerBox.appendChild(description)

  elem.appendChild(innerBox)

  return innerBox
}

const crateToggleContainerElement = () => {
  const innerBox = document.createElement('div')
  innerBox.classList.add('js-cookie-consent-toogle-box-inner')

  return innerBox
}

const createTitleElement = (title) => {
  const titleContainer = document.createElement('p')
  titleContainer.classList.add('cookie-consent-settings-title')
  titleContainer.innerHTML = title

  return titleContainer
}

const createDescriptionElement = (description) => {
  const descriptionContainer = document.createElement('span')
  descriptionContainer.classList.add('settings-subtitle')
  descriptionContainer.innerHTML = description

  return descriptionContainer
}

const createActionButtonBox = (config, keys, box) => {
  const btnBox = document.createElement('div')
  const accept = createAcceptBtn(config, box, config?.color, keys)
  const openSettings = createOpenSettingsBtn(box)
  btnBox.classList.add('cookie-consent-btn-box')

  btnBox.appendChild(accept)
  btnBox.appendChild(openSettings)

  return btnBox
}

const createAcceptBtn = (config, box, color, keys) => {
  const acceptAllCookies = document.createElement('button')
  acceptAllCookies.innerHTML = 'Accept all'
  acceptAllCookies.setAttribute('id', 'acceptAllCookies')
  acceptAllCookies.classList.add('cookie-consent-button', 'accept')

  if (color) {
    acceptAllCookies.style.backgroundColor = color
  }

  acceptAllCookies.addEventListener('click', () => acceptCookies(config, box, keys))

  return acceptAllCookies
}

const createOpenSettingsBtn = (box) => {
  const openSettings = document.createElement('button')
  openSettings.innerHTML = 'Cookie settings'
  openSettings.setAttribute('id', 'openCookieSettings')
  openSettings.classList.add('cookie-consent-button', 'open-settings')

  openSettings.addEventListener('click', () => {
    const isOpen = box.classList.contains('slide-up')
    box.setAttribute('class', isOpen ? 'slide-down' : 'slide-up')
  })

  return openSettings
}

const createSaveCookieBox = (config, box, color) => {
  const saveBox = document.createElement('div')
  const btn = createSaveCookieBtn(config, box, color)
  saveBox.classList.add('save-cookie-consent-btn-box')

  saveBox.appendChild(btn)

  return saveBox
}

const createSaveCookieBtn = (config, box, color) => {
  const saveCookie = document.createElement('button')
  saveCookie.innerHTML = 'Save cookie settings'
  saveCookie.setAttribute('id', 'saveCookieSettings')
  saveCookie.classList.add('cookie-consent-button', 'save-cookies')

  if (color) {
    saveCookie.style.backgroundColor = color
  }

  saveCookie.addEventListener('click', () => {
    const savedCookies = sessionStorage.getItem('categories')

    setCookie(config?.cookieName, savedCookies, config?.expiration)
    box.style.display = 'none'
  })

  return saveCookie
}

const createSliderElement = (options, color) => {
  const span = document.createElement('span')
  span.classList.add('slider', 'round', options?.key)

  if (options?.disabled) {
    span.classList.add('disabled')
  }

  if (options?.checked) {
    span.classList.add('checked')

    if (color) {
      span.style.backgroundColor = color
    }
  }

  span.addEventListener('click', (e) => {
    if (e.target.className.includes('disabled')) {
      e.preventDefault()
    } else {
      if (e.target.className.includes('checked')) {
        e.target.classList.remove('checked')
        e.target.style.backgroundColor = '#ccc'
      } else {
        e.target.classList.add('checked')
        e.target.style.backgroundColor = color
      }
      e.stopPropagation()
      toggleValueInArray(options?.key)
    }
  })

  return span
}

const createLabelElement = () => {
  const label = document.createElement('label')
  label.classList.add('switch')

  return label
}

const createInputElement = (checked) => {
  const input = document.createElement('input')
  input.setAttribute('type', 'checkbox')

  if (checked) {
    input.setAttribute('checked', '')
  } else {
    input.removeAttribute('checked')
  }

  return input
}

const toggleValueInArray = (value) => {
  const categories = sessionStorage.getItem('categories')
  const categoriesGDPR = JSON.parse(categories)
  const idx = categoriesGDPR.indexOf(value)

  if (idx !== -1) {
    categoriesGDPR.splice(idx, 1)
  } else {
    categoriesGDPR.push(value)
  }

  sessionStorage.setItem('categories', JSON.stringify(categoriesGDPR))
}

const acceptCookies = (config, box, keys) => {
  setCookie(config?.cookieName, JSON.stringify(keys), config?.expiration)
  box.style.display = 'none'
}

const getCookie = (name) => {
  if (document.cookie.length) {
    const nameEQ = `${name}=`
    const ca = document.cookie.split(';')

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]

      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length)
      }

      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length)
      }
    }
  }

  return null
}

const setCookie = (name, value, exdays, path) => {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  const expires = `expires=${d.toUTCString()}`

  document.cookie = `${name}=${value};${expires};path=${path || '/'}`
}

module.exports = cookieConsent
