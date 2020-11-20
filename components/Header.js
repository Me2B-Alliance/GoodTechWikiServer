/**
 * Dependencies
 */
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

/**
 * Header
 */
export default function Header(props) {
  const { userInfo } = props

  const router = useRouter()

  const handleButtonLogin = () => {
    // Disable for now
    // router.push({
    //   pathname: '/oauth/github'
    // })
  }

  return (
    <div style={{ boxShadow: '0 0 2px 1px #686868' }}>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>
          <a href="/">
            <img height="40px" alt="" src="/Me2B_Logo-RGB-web.jpg" />
          </a>
        </Navbar.Brand>
        <Nav className="mr-auto ml-auto">
          <Navbar.Text id="header-title">
            Good Tech Wiki
          </Navbar.Text>
        </Nav>
        <Nav>
          {userInfo !== '' && userInfo
            && (
              <p>Logged in as {userInfo.username}
                (<a href="/logout">logout</a>)
              </p>
            )
            || (
              <Button onClick={handleButtonLogin} variant="warning">
                Sign up with github
                {' '}<FontAwesomeIcon size="lg" icon={faGithub} />
              </Button>
            )}
        </Nav>
      </Navbar>
    </div>
  )
}

Header.propTypes = {
  userInfo: PropTypes.string
}
