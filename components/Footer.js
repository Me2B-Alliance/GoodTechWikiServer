/**
 * Dependencies
 */
import Link from 'next/link'
import {
  Image, Col, Row, Container
} from 'react-bootstrap'

/**
 * Footer Component
 */
export default function Footer() {
  const Copyright = () => (
    <p variant="body2">
      {`© ${new Date().getFullYear()} Good Tech Wiki. `}
      <a href="https://me2ba.org/">
        Me2b Alliance
      </a>
    </p>
  )

  return (
    <>
      <div id="footer" className="bg-light text-muted">
        <Container>
          <Row>
            <Col className="align-middle">
              <a href="https://me2ba.org">
                <Image className="my-3" priority height={60} width={160} src="/Me2B_Logo-RGB-web.jpg" />
              </a>
              <p>Powered by NextJs and React Bootstrap</p>
              <Copyright />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
