/**
 * Dependencies
 */
import React from 'react'
import { useRouter } from 'next/router'
import {
  Container, Button, OverlayTrigger, Popover, Row, Col
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
import DocumentForm from 'components/DocumentForm'
import Document from 'components/Document'
import DocumentHistory from 'components/DocumentHistory'
import { Fetcher } from 'lib/helpers'

/**
 * getServerSideProps
 */
export async function getServerSideProps(ctx) {
  const { title, type } = ctx.params
  const { req } = ctx

  const session = await getSession({ req })

  const doc = await wiki.getDoc(title, type)
  const logs = await wiki.getLogsByDocumentId(doc._id)

  if (!doc || doc.error) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      query: ctx.query, doc: doc || null, session, logs
    }
  }
}

/**
 * Single Document Page
 *
 * "/[type]/[Title]"
 */
export default function Page(props) {
  const router = useRouter()
  const { type } = router.query
  const { doc: _doc, session, logs } = props

  const [doc, setDoc] = React.useState(_doc)
  const [editing, setEditing] = React.useState(false)
  const [historyVisible, setHistoryVisible] = React.useState(false)
  const [deletePopoverVisible, setDeletePopoverVisible] = React.useState(false)

  const handleSubmit = async (docToAdd) => {
    if (docToAdd !== doc) {
      const res = await Fetcher('addDoc',
        {
          doc: docToAdd, name: docToAdd.name, type: docToAdd['@type']
        })

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
        setHistoryVisible(false)
      } else {
        setEditing(true)
      }
    }
  }

  const handleDeleteClick = async () => {
    if (session) {
      await Fetcher('deleteDoc', { name: doc.name, type: doc['@type'], doc })
      router.push(`/${type}`)
    }
  }

  const handlePopoverToggle = () => {
    setDeletePopoverVisible(!deletePopoverVisible)
  }

  const handleHistoryClick = () => {
    setHistoryVisible(!historyVisible)
  }

  const popover = (
    <Popover>
      <Popover.Title as="h3">Delete?</Popover.Title>
      <Popover.Content>
        Are you sure you want to delete
        <p>&quot;{doc.name}&quot;?</p>
        <div id="document-delete-popover">
          <Button
            size="sm"
            variant="success"
            onClick={() => handleDeleteClick()}
          >
            Yes
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handlePopoverToggle()}
          >
            No
          </Button>
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
            <div id="document-header-buttons">
              <Row>
                <Col md={4} xs="auto" style={{ display: 'flex', alignItems: 'flex-center', justifyContent: 'flex-start' }}>
                  <Button variant="secondary" style={{ color: 'white' }} onClick={() => { router.back() }}>
                    <FontAwesomeIcon size="lg" width={20} icon={faArrowLeft} />
                &nbsp; Back
                  </Button>
                </Col>
                <Col md={4} xs="auto" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                  {!editing
                    && <Button variant="success" onClick={() => handleHistoryClick()}>{historyVisible ? 'Document' : 'History'}</Button>}
                </Col>
                <Col md={4} xs="auto">
                  {session
                    && (
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <OverlayTrigger show={deletePopoverVisible} trigger="click" placement="bottom" overlay={popover}>
                          <Button variant="danger" style={{ marginRight: '20px' }} onClick={() => setDeletePopoverVisible(true)}>
                            <FontAwesomeIcon size="lg" width={20} icon={faTrash} />
                          &nbsp; Delete
                          </Button>
                        </OverlayTrigger>
                        <Button variant="primary" onClick={() => handleEditClick()}>
                          <FontAwesomeIcon size="lg" width={20} icon={editing && faBan || faEdit} />
                          {editing && 'Cancel' || 'Edit'}
                        </Button>
                      </div>
                    )}
                </Col>
              </Row>
            </div>
            {editing
              && <DocumentForm type={type} doc={doc} handleSubmit={handleSubmit} />}
            {!editing && !historyVisible
              && <Document doc={doc} />}
            {historyVisible && !editing
              && <DocumentHistory logs={logs.docs} docId={doc._id} />}
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
