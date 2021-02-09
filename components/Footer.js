/**
 * Dependencies
 */
import {
  Image, Container
} from 'react-bootstrap'

/**
 * Footer Component
 */
export default function Footer() {
  return (
    <>
      <div id="footer" className="text-muted">
        <Container>
          <div className="row d-flex justify-content-center align-items-center">
            <p className="pr-2 mb-0 text-dark">Provided by the</p>
            <a href="https://me2ba.org">
              <Image className="my-3" height={60} width={160} src="/Me2B_Logo-RGB-web.jpg" />
            </a>
          </div>
        </Container>
      </div>
    </>
  )
}
