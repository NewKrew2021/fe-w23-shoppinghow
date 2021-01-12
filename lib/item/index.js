const express = require('express')
const router = express.Router()

// JSON data
const bestItems = require('./best.json').items
const hotItems = require('./hot.json').items
const bestPromotions = require('./best_promotion.json').items
const carouselPromotions = require('./carousel_promotion.json').items

// return the number of best items
router.get('/n_best', (req, res) => {
  res.json(bestItems.length)
})

router.get('/best', (req, res) => {
  const pageIndex = parseInt(req.query.pageIndex || 0)
  const pageSize = parseInt(req.query.pageSize || 5)
  res.json(bestItems.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize))
})

router.get('/hot', (req, res) => {
  res.json(hotItems)
})

router.get('/best_promotion', (req, res) => {
  const randomIndex = Math.floor(Math.random() * bestPromotions.length)
  res.json(bestPromotions[randomIndex])
})

router.get('/carousel_promotion', (req, res) => {
  res.json(carouselPromotions)
})

module.exports = router
