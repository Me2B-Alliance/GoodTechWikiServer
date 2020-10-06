/* eslint-disable no-undef */
const express = require('express')
const next = require('next')
const compression = require('compression')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

const apiRoutes = require('./routes')

app.prepare()
  .then(() => {
    const server = express()

    server.use(compression())
    // server.use('/api', apiRoutes)

    server.get('/organization/:id', (req, res) => {
      const actualPage = '/'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/search/engagement=:s,purpose=:p,tag=:t,text=:tx', (req, res) => {
      // console.log(req)
      const actualPage = '/index'
      const queryParams = { engagement: req.params.s, purpose: req.params.p, tag: req.params.t, text: req.params.tx }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })

  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
