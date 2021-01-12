const express = require('express')
const router = express.Router()

// JSON data
const { items: bestItems } = require('./best.json')
const { items: hotItems } = require('./hot.json')
const { items: bestPromotions } = require('./best_promotion.json')
const { items: carouselPromotions } = require('./carousel_promotion.json')

// return the number of best items
router.get('/n_best', (req, res) => {
  res.json(bestItems.length)
})

// return some best items
router.get('/best', (req, res) => {
  const pageIndex = parseInt(req.query.pageIndex || 0)
  const pageSize = parseInt(req.query.pageSize || 5)
  res.json(bestItems.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize))
})

// return all hot items
router.get('/hot', (req, res) => {
  res.json(hotItems)
})

// return a random best-promotion data
router.get('/best_promotion', (req, res) => {
  const randomIndex = Math.floor(Math.random() * bestPromotions.length)
  res.json(bestPromotions[randomIndex])
})

// return all carousel-promotion data
router.get('/carousel_promotion', (req, res) => {
  res.json(carouselPromotions)
})

module.exports = router
