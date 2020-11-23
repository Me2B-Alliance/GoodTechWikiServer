/**
 * Dependencies
 */
import { useRouter } from 'next/router'
import { AutoForm, SubmitField, AutoField } from 'uniforms-bootstrap4'
import { Container, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/client'

/**
 * Local Dependencies
 */
import OrganizationSchema from 'lib/schemas/OrganizationSchema'
import { getDoc } from '../api/documents/[type]/[slug]'

/**
 * getServerSideProps
 */
export async function getServerSideProps(ctx) {
  const { title, type } = ctx.params

  const doc = await getDoc(title, decodeURIComponent(type))

  if (!doc) {
    return {
      notFound: true
    }
  }

  return { props: { query: ctx.query, doc: doc || null } }
}

/**
 * Single Document Page
 *
 * "/[type]/[Title]"
 */
export default function Page(props) {
  // Initial
  const router = useRouter()
  const [session, loading] = useSession()
  const { doc } = props

  // const { slug, type } = router.query
  const editing = session

  return (
    <div id="body">
      <Container>
        <div id="document-container">
          <Button variant="secondary" onClick={() => { router.back() }}>
            <FontAwesomeIcon size="lg" width={20} icon={faArrowLeft} />{' '}
            Back
          </Button>
          <AutoForm schema={OrganizationSchema} model={doc}>
            <AutoField disabled={!editing} name="orgName" />
            <AutoField disabled={!editing} name="description" />
            <AutoField disabled={!editing} name="lisa" />
            <AutoField disabled={!editing} name="website" />
            {
              editing
              && <SubmitField />
            }
          </AutoForm>
        </div>
      </Container>
    </div>
  )
}

Page.propTypes = {
  doc: PropTypes.object
}
