const express = require('express')
const router = express.Router()

//const request = require('superagent')
//const async = require('async')
//
router.get('/organization/:id', (req, res) => {
  res.status(200).json({ something: 'hello!: ' + req.params.id })
})

module.exports = router
