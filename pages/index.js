/**
 * Dependencies
 */
import { Container, Row, Col } from 'react-bootstrap'

/**
 * Local Dependencies
 */
import Sidebar from 'components/Sidebar'

/**
 * App Index Page
 */
export default function Page() {
  return (
    <div id="body">
      <Container>
        <Row>
          <Col md={3} className="d-none d-md-block" style={{ paddingTop: '180px' }}>
            <Sidebar />
          </Col>
          <Col>
            <div>
              <p>
                This wiki was developed by the Me2B Alliance and is offered
                as a public utility to help people find organizations who
                are working on more respectful technology.
              </p>
              <p>
                Start browsing the wiki by selecting a type in the sidebar
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
