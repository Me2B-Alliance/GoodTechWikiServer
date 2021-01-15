/**
 * Dependencies
 */
import { getSession } from 'next-auth/client'
import { Container, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

/**
 * Local Dependencies
 */
import Sidebar from 'components/Sidebar'
import Header from 'components/Header'
import Footer from 'components/Footer'

/**
 * getServerSideProps
 */
export async function getServerSideProps(ctx) {
  const { req } = ctx
  const session = await getSession({ req })
  return {
    props: {
      session
    }
  }
}

/**
 * App Index Page
 */
export default function Page(props) {
  const { session } = props

  return (
    <>
      <Header userInfo={session ? session.user : {}} />
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
                  Start browsing the wiki by navigating to a type
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  )
}

Page.propTypes = {
  session: PropTypes.object
}
