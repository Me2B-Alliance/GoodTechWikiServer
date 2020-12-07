/**
 * Dependencies
 */
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

/**
 * Footer Component
 */
export default function Footer() {
  const Copyright = () => (
    <p variant="body2">
      {`© ${new Date().getFullYear()} Good Tech Wiki. `}
      <a href="https://github.com/Me2B-Alliance">
        Me2b Alliance
      </a>
    </p>
  )

  return (
    <>
      {/*
      <div id="footer-cookie-notice">
        <Container>
          <Row>
            <Col>
              <p>
                The Me2B Alliance avoids the use of cookies.
                Currently, this site doesn’t include the use of any cookies.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      */}
      <div id="footer">
        <Container>
          <Row>
            <Col>
              <p>Powered by NextJs, Express and React Bootstrap</p>
              <Copyright />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
