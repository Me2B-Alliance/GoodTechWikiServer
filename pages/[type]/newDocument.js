/**
 * Dependencies
 */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Container, Button, Modal
} from 'react-bootstrap'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getSession } from 'next-auth/client'

/**
 * Local Dependencies
 */
import Header from 'components/Header'
import Footer from 'components/Footer'
import DocumentForm from 'components/DocumentForm'
import { Fetcher } from 'lib/helpers'

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

  const [modalVisible, setModalVisible] = useState(false)
  const [existingDoc, setExistingDoc] = useState({})

  const handleSubmit = async (docToAdd) => {
    if (docToAdd && docToAdd.name !== '') {
      const checkDock = await Fetcher('getDoc', { name: docToAdd.name, type })
      // If the document already exists show modal
      if (!checkDock.error) {
        setExistingDoc(checkDock)
        setModalVisible(true)
      } else {
        await Fetcher('addDoc', { name: docToAdd.name, type, doc: docToAdd })
        router.push(`/${type}/${docToAdd.name}`, `/${type}/${docToAdd.name}`)
      }
    }
  }

  return (
    <>
      <Header userInfo={session ? session.user : {}} />
      <div id="body">
        <div id="document-container">
          <Modal
            size="sm"
            show={modalVisible}
            onHide={() => setModalVisible(false)}
            aria-labelledby="document-exists-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="document-exists-modal">
                Document exists
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              A document with this name already exists. Navigate to it?
            </Modal.Body>
            <Modal.Footer style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button variant="success" size="sm" onClick={() => router.push(`/${type}/${existingDoc.name}`)}>Yes</Button>
              <Button variant="danger" size="sm" onClick={() => setModalVisible(false)}>No</Button>
            </Modal.Footer>
          </Modal>
          <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="secondary" style={{ color: 'white' }} onClick={() => { router.back() }}>
                <FontAwesomeIcon size="lg" width={20} icon={faArrowLeft} />
                {' '}Back
              </Button>
            </div>
            <DocumentForm type={type} handleSubmit={handleSubmit} />
          </Container>
        </div>
      </div>
      <Footer />
    </>
  )
}
