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
      <div id="footer">
        <Container>
          <Row>
            <Col>
              <p>Powered by NextJs and React Bootstrap</p>
              <Copyright />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
