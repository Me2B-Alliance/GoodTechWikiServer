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
              <Image className="my-3" height={40} width={110} src="/Me2B_Logo.png" />
            </a>
          </div>
        </Container>
      </div>
    </>
  )
}
