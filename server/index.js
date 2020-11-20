/* eslint-disable no-undef */

/**
 * Dependencies
 */
const express = require('express')
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const session = require('express-session')
const next = require('next')
const compression = require('compression')
require('dotenv').config()

/**
 * Dev dependencies
 */
const wiki = require('./wiki')
const apiRoutes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next() }
//   res.redirect('/login')
// }

/**
 * index
 */
app.prepare()
  .then(() => {
    const server = express()

    server.use(compression())
    server.use(session({ secret: 'a secret', cookie: { maxAge: 24000 } }))
    server.use(passport.initialize())
    server.use(passport.session())

    passport.use(new GitHubStrategy({
      clientID: process.env.GH_CLIENT_ID,
      clientSecret: process.env.GH_CLIENT_SECRET,
      callbackURL: process.env.GH_CLIENT_CALLBACKURL
    },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(function () {
          return done(null, profile)
        })
      }))

    server.get('/', (req, res) => {
      const actualPage = '/'
      const out = {
        userInfo: req.user || ''
      }
      app.render(req, res, actualPage, out)
    })

    server.get('/organizations', (req, res) => {
      const actualPage = '/'

      const queryParams = {
        ...req.query
      }

      const dbQuery = { '@type': 'Organization' }

      // Set the org category if it's being filtered for
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
          userInfo: req.user || '',
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
        const out = {
          docs: results.docs,
          userInfo: req.user || ''
        }
        app.render(req, res, actualPage, out)
      })
    })

    server.get('/products', (req, res) => {
      const actualPage = '/'

      wiki.find({
        selector: {
          '@type': 'Product'
        }
      }).then((results) => {
        const out = {
          docs: results.docs,
          userInfo: req.user || ''
        }
        app.render(req, res, actualPage, out)
      })
    })

    server.get('/publications', (req, res) => {
      const actualPage = '/'

      wiki.find({
        selector: {
          '@type': 'Publication'
        }
      }).then((results) => {
        const out = {
          docs: results.docs,
          userInfo: req.user || ''
        }
        app.render(req, res, actualPage, out)
      })
    })

    server.get('/workinggroups', (req, res) => {
      const actualPage = '/'

      wiki.find({
        selector: {
          '@type': 'WorkingGroup'
        }
      }).then((results) => {
        const out = {
          docs: results.docs,
          userInfo: req.user || ''
        }
        app.render(req, res, actualPage, out)
      })
    })

    server.get('/oauth/github', passport.authenticate('github', { scope: ['user:email'] }))

    server.get('/oauth/callback/github',
      passport.authenticate('github', { failureRedirect: '/' }),
      async (req, res) => {
        res.redirect('/')
      })

    server.get('/logout', (req, res) => {
      req.logout()
      res.redirect('/')
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
