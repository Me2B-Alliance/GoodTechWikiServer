/**
 * Dependencies
 */
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signIn, signOut } from 'next-auth/client'
import Image from 'next/image'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

/**
 * Header Component
 */
export default function Header({ userInfo }) {
  return (
    <div id="header">
      <Navbar bg="light" variant="light">
        <Navbar.Brand>
          <a href="/">
            <Image priority height={38} width={112} src="/Me2B_Logo-RGB-web.jpg" />
          </a>
        </Navbar.Brand>
        <Nav className="mr-auto ml-auto">
          <Navbar.Text id="header-title">
            Good Tech Wiki
          </Navbar.Text>
        </Nav>
        <Nav>
          {userInfo.name
            && (
              <p id="header-logged-in-text">Logged in as {userInfo.name}
                (
                <Button variant="link" onClick={() => signOut()}>logout</Button>
                )
              </p>
            )
            || (
              <Button style={{ color: 'white' }} onClick={() => signIn('github')} variant="secondary">
                Sign in with github
                {' '}<FontAwesomeIcon size="lg" width={20} icon={faGithub} />
              </Button>
            )}
        </Nav>
      </Navbar>
    </div>
  )
}

Header.propTypes = {
  userInfo: PropTypes.object
}
