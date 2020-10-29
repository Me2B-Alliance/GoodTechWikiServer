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

    server.get('/organizations', (req, res) => {
      const actualPage = '/'

      wiki.find({
        selector: {
          '@type': 'Organization'
        }
      }).then((results) => {
        app.render(req, res, actualPage, results)
      })
    })

    server.get('/organizations?text=:t&page=:p', (req, res) => {
      const actualpage = '/'
      const queryparams = { text: req.params.t, page: req.params.p, type: 'organizations' }
      app.render(req, res, actualpage, queryparams)
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

    server.get('/events?text=:t&page=:p', (req, res) => {
      const actualPage = '/'
      const queryParams = { text: req.params.t, page: req.params.p, type: 'events' }
      app.render(req, res, actualPage, queryParams)
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

    server.get('/products?text:t&page=:p', (req, res) => {
      const actualPage = '/'
      const queryParams = { text: req.params.t, page: req.params.p, type: 'products' }
      app.render(req, res, actualPage, queryParams)
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

    server.get('/publications?text=:t&page=:p', (req, res) => {
      const actualPage = '/'
      const queryParams = { text: req.params.t, page: req.params.p, type: 'publications' }
      app.render(req, res, actualPage, queryParams)
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

    server.get('/workinggroups?text=:t&page=:p', (req, res) => {
      const actualPage = '/'
      const queryParams = { text: req.params.t, page: req.params.p, type: 'workinggroups' }
      app.render(req, res, actualPage, queryParams)
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
