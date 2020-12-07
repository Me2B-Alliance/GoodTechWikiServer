/**
 * Dependencies
 */
import React from 'react'
import { useRouter } from 'next/router'
import {
  Container, Button, OverlayTrigger, Popover, Row
} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {
  faArrowLeft, faEdit, faTrash, faBan
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getSession } from 'next-auth/client'

/**
 * Local Dependencies
 */
import wiki from 'lib/wiki'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Form from 'components/Form'
import Document from 'components/Document'

/**
 * getServerSideProps
 */
export async function getServerSideProps(ctx) {
  const { title, type } = ctx.params
  const { req } = ctx

  const session = await getSession({ req })

  const doc = await wiki.getDoc(title, decodeURIComponent(type))

  if (!doc || doc.err) {
    return {
      notFound: true
    }
  }

  return { props: { query: ctx.query, doc: doc || null, session } }
}

/**
 * Single Document Page
 *
 * "/[type]/[Title]"
 */
export default function Page(props) {
  const router = useRouter()
  const { type } = router.query
  const { doc: _doc, session } = props

  const [doc, setDoc] = React.useState(_doc)
  const [editing, setEditing] = React.useState(false)
  const [deletePopoverVisible, setDeletePopoverVisible] = React.useState(false)

  const addDocFetch = async (docToAdd) => {
    const results = await fetch(
      `/api/documents/${type}/${docToAdd.name}?`,
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

  const deleteDocFetch = async (docToDelete) => {
    const results = await fetch(
      `/api/documents/${type}/${docToDelete.name}?`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ doc: docToDelete, delete: true })
      }
    )
      .then((res) => res.json())
    return results
  }

  const handleSubmit = async (docToAdd) => {
    if (docToAdd !== doc) {
      const res = await addDocFetch(docToAdd)
      setDoc(res.updatedDoc)
      setEditing(false)
    } else {
      // TODO: do something if nothing needs to change
    }
  }

  const handleEditClick = () => {
    if (session) {
      if (editing) {
        setEditing(false)
      } else {
        setEditing(true)
      }
    }
  }

  const handleDeleteClick = async () => {
    if (session) {
      await deleteDocFetch(doc)
      router.push(`/${type}`)
    }
  }

  const handlePopoverToggle = () => {
    setDeletePopoverVisible(!deletePopoverVisible)
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Delete?</Popover.Title>
      <Popover.Content>
        Are you sure you want to delete
        <p>&quot;{doc.name}&quot;?</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '5px' }}>
          <Button size="sm" variant="success" onClick={() => handleDeleteClick()}>Yes</Button>
          <Button size="sm" variant="danger" onClick={() => handlePopoverToggle()}>No</Button>
        </div>
      </Popover.Content>
    </Popover>
  )

  return (
    <>
      <Header userInfo={session ? session.user : {}} />
      <div id="body">
        <div id="document-container">
          <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="secondary" style={{ color: 'white' }} onClick={() => { router.back() }}>
                <FontAwesomeIcon size="lg" width={20} icon={faArrowLeft} />
                &nbsp; Back
              </Button>
              {session
                && (
                  <div>
                    { !editing
                      && (
                        <OverlayTrigger show={deletePopoverVisible} trigger="click" placement="bottom" overlay={popover}>
                          <Button variant="danger" style={{ marginRight: '20px' }} onClick={() => setDeletePopoverVisible(true)}>
                            <FontAwesomeIcon size="lg" width={20} icon={faTrash} />
                          &nbsp; Delete
                          </Button>
                        </OverlayTrigger>
                      )}
                    <Button variant="primary" onClick={() => handleEditClick()}>
                      <FontAwesomeIcon size="lg" width={20} icon={editing && faBan || faEdit} />
                      &nbsp; {editing && 'Cancel' || 'Edit'}
                    </Button>
                  </div>
                )}
            </div>
            {editing
              && <Form type={type} doc={doc} handleSubmit={handleSubmit} />
              || <Document doc={doc} />}
          </Container>
        </div>
      </div>
      <Footer />
    </>
  )
}

Page.propTypes = {
  doc: PropTypes.object,
  session: PropTypes.object
}
