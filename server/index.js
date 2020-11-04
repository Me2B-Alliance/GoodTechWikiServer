/* eslint-disable no-undef */
const express = require('express')
const next = require('next')
const compression = require('compression')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

const wiki = require('./wiki')

const documents = require('../data/docs.json')

const apiRoutes = require('./routes')

// wiki.import(documents)

app.prepare()
  .then(() => {
    const server = express()

    server.use(compression())
    // server.use('/api', apiRoutes)

    // ?text=:t&page=:p&cat=:c
    server.get('/organizations', (req, res) => {
      const actualPage = '/'

      const queryParams = {
        ...req.query
      }

      const dbQuery = { '@type': 'Organization' }

      if (queryParams.cat) {
        dbQuery.lisa = queryParams.cat
      }

      wiki.find({
        selector: {
          ...dbQuery
        }
      }).then((results) => {
        const out = {
          docs: results.docs,
          ...queryParams
        }
        app.render(req, res, actualPage, out)
      })
    })

    server.get('/events', (req, res) => {
      const actualPage = '/'

      wiki.find({
        selector: {
          '@type': 'Event'
        }
      }).then((results) => {
        app.render(req, res, actualPage, results)
      })
    })

    server.get('/products', (req, res) => {
      const actualPage = '/'

      wiki.find({
        selector: {
          '@type': 'Product'
        }
      }).then((results) => {
        app.render(req, res, actualPage, results)
      })
    })

    server.get('/publications', (req, res) => {
      const actualPage = '/'

      wiki.find({
        selector: {
          '@type': 'Publication'
        }
      }).then((results) => {
        app.render(req, res, actualPage, results)
      })
    })

    server.get('/workinggroups', (req, res) => {
      const actualPage = '/'

      wiki.find({
        selector: {
          '@type': 'WorkingGroup'
        }
      }).then((results) => {
        app.render(req, res, actualPage, results)
      })
    })

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
