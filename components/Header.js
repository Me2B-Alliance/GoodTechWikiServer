/**
 * Dependencies
 */
import Image from 'next/image'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signIn, signOut } from 'next-auth/client'
import PropTypes from 'prop-types'
import { Container, NavDropdown } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

/**
 * Header Component
 */
export default function Header({ userInfo }) {
  return (
    <div id="header">
      <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
        <Container>
          <Nav className="mr-auto">
            <Navbar.Brand href="/" id="header-title">
              <div className="row d-flex align-items-center">
                <div className="column pr-3 pl-3 pt-md-1">
                  <Image height={30} width={30} src="/Me2B_logo_white.png" />
                </div>
                <div className="column">
                  <h3 className="d-block d-md-none font-weight-bold text-light">
                    Good Tech Wiki
                  </h3>
                  <h1 className="d-none d-md-block font-weight-bold text-light">
                    Good Tech Wiki
                  </h1>
                </div>
              </div>
            </Navbar.Brand>
          </Nav>

          <Navbar.Toggle aria-controls="navbar-nav-collapse" />
          <Nav>
            <Navbar.Collapse id="navbar-nav-collapse">
              <Nav>
                <div className="d-none d-md-block text-light">
                  {userInfo.name
                  && (
                    <Nav.Item id="header-logged-in-text">
                      <strong className="text-light">
                        Logged in as {userInfo.name}
                      </strong>
                      (
                      <Button variant="primary" onClick={() => signOut()}>logout</Button>
                      )
                    </Nav.Item>
                  )
                  || (
                    <Nav.Link className="text-white font-weight-normal" onClick={() => signIn('github')} variant="secondary">
                      Sign in with GitHub
                      {' '}<FontAwesomeIcon size="lg" width={20} icon={faGithub} />
                    </Nav.Link>
                  )}
                </div>
                <div className="d-block d-md-none" title="Navigate" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/">Home</NavDropdown.Item>
                  <NavDropdown.Item href="/organizations">Organizations</NavDropdown.Item>
                  <NavDropdown.Item href="/events">Events</NavDropdown.Item>
                  <NavDropdown.Item href="/publications">Publications</NavDropdown.Item>
                  <NavDropdown.Item href="/products">Products</NavDropdown.Item>
                  <NavDropdown.Item href="/workinggroups">Working Groups</NavDropdown.Item>
                  {userInfo.name
                  && (
                    <NavDropdown.Item onClick={() => signOut()} id="header-logged-in-text">
                      Sign out ({userInfo.name})
                    </NavDropdown.Item>
                  )
                  || (
                    <NavDropdown.Item onClick={() => signIn('github')} variant="secondary">
                      Sign in with github
                      {' '}<FontAwesomeIcon size="lg" width={20} icon={faGithub} />
                    </NavDropdown.Item>
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

Header.propTypes = {
  userInfo: PropTypes.object
}
