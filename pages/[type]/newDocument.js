/**
 * Dependencies
 */
import React from 'react'
import { useRouter } from 'next/router'
import {
  Container, Button
} from 'react-bootstrap'
import { faArrowLeft, faEdit, faUndo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getSession } from 'next-auth/client'

/**
 * Local Dependencies
 */
import Header from 'components/Header'
import Footer from 'components/Footer'
import Form from 'components/Form'

/**
 * getServerSideProps
 */
export async function getServerSideProps(ctx) {
  const { req } = ctx

  const session = await getSession({ req })

  if (!session) {
    return {
      notFound: true
    }
  }

  return { props: { session } }
}

export default function Page(props) {
  const router = useRouter()
  const { type } = router.query
  const { session } = props

  const addDocFetch = async (docToAdd) => {
    const results = await fetch(
      `/api/documents/${type}/${docToAdd.name}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ doc: docToAdd })
      }
    )
      .then((res) => res.json())
    return results
  }

  const handleSubmit = async (docToAdd) => {
    if (docToAdd) {
      await addDocFetch(docToAdd)
      router.push(`/${type}/${docToAdd.name}`)
    } else {
      // TODO: do something if nothing needs to change
    }
  }

  return (
    <>
      <Header userInfo={session ? session.user : {}} />
      <div id="body">
        <div id="document-container">
          <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="secondary" style={{ color: 'white' }} onClick={() => { router.back() }}>
                <FontAwesomeIcon size="lg" width={20} icon={faArrowLeft} />
                {' '}Back
              </Button>
            </div>
            <Form type={type} handleSubmit={handleSubmit} />
          </Container>
        </div>
      </div>
      <Footer />
    </>
  )
}
