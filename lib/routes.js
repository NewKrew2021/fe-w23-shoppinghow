const express = require('express')
const router = express.Router()
const item = require('./item')
const search = require('./search')

// route /item
router.use('/items', item)

// route /search
router.use('/search', search)

module.exports = router