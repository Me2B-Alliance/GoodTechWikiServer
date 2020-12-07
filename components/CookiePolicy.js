/**
 * Dependencies
 */
import { parseCookies, setCookie } from 'nookies'
import { useEffect, useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'

/**
 * CookiePolicy Component
 */
export default function CookiePolicy() {
  const [modalShow, setModalShow] = useState(false)
  const [cookieShown, setCookieShown] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  useEffect(() => {
    setLoaded(true)
  }, [])

  function CookieModal() {
    return (
      <div id="cookie-info-modal">
        <Modal size="lg" centered show={modalShow} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Cookie Details</Modal.Title>
          </Modal.Header>
          <Modal.Body id="cookie-info-modal-body">
            <p>
              This website only uses cookies that are strictly necessary to
              provide you with service.
            </p>
            <h4>Mandatory</h4>
            <p>
              Mandatory Cookies: The Me2BA uses mandatory cookies in two scenarios:
              (1) We track if you’ve viewed the Cookie Policy, in order to be
              compliant with the world’s most rigorous cookie consent practices
              from the European Union and the GDPR. So you will see a field
              (CookieLawInfoConsent) that may look like a unique identifier, but
              it isn’t.
              (2) When you sign in and when you are in the membership
              portal. The membership portal is built off of Salesforce, and
              Salesforce requires these cookies to secure the login
              process/session and provide their services. These cookies are for
              security and for remembering you when you log in. We have reviewed
              these cookies and don't see any risks with them. You can learn
              more about the cookies used here. Note that the Salesforce Google
              Analytics cookie [_ga] has been disabled; we have mandated our 3rd
              party partner, Virtual Inc., who provides the membership portal,
              to disable the _ga cookie.
            </p>
            <h4>Non-Mandatory</h4>
            <p>
              Functional Cookies: The Me2BA currently doesn't use any other cookies to
              improve the usability of the website, or personalize your
              experience.
            </p>
            <p>
              Analytics Cookies: The Me2BA does not use any analytics cookies. These can be a
              key way for information to be shared across sites, so we don't
              use them.
            </p>
            Advertising Cookies: The Me2BA doesn't use advertising cookies. These are
            another key way information can be shared across sites.
            <p />
          </Modal.Body>
        </Modal>
      </div>
    )
  }

  function readCookieValue(name) {
    const cookies = parseCookies({})
    return cookies[name]
  }

  function addCookie(name, value) {
    setCookie(null, name, value, {
      maxAge: 1 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    })
  }

  function onPolicyRead() {
    addCookie('viewed_cookie_policy', 'yes')
    setCookieShown(false)
  }

  const cookie = readCookieValue('viewed_cookie_policy')

  if (!cookieShown && cookie !== 'yes' && loaded) {
    setCookieShown(true)
  }

  return (
    <>
      {cookieShown
        && (
          <div id="cookie-info-bar">
            <Container>
              <h5>Me2b Cookie Policy</h5>
              <div id="cookie-info-bar-content">
                <a> We only use cookies that are absolutely necessary to provide our service.</a>
                <div>
                  <Button variant="link" onClick={() => handleShow()}>Cookie Details</Button>
                  <Button size="sm" variant="success" onClick={() => onPolicyRead()}>OK</Button>
                </div>
              </div>
            </Container>
            <CookieModal />
          </div>
        )}
    </>
  )
}
