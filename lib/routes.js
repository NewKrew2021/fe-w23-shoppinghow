const express = require('express')
const router = express.Router()
const item = require('./item')

// route /item
router.use('/items', item)

module.exports = router