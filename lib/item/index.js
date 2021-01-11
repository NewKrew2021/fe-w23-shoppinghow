const express = require('express')
const router = express.Router()

// JSON data
const bestItems = require('./best.json').items
const hotItems = require('./hot.json').items
const bestPromotions = require('./best_promotion.json').items
const carouselPromotions = require('./carousel_promotion.json').items

router.get('/best', (req, res) => {
})

router.get('/hot', (req, res) => {
})

router.get('/best_promotion', (req, res) => {
  const randomIndex = Math.floor(Math.random() * bestPromotions.length)
  res.json(bestPromotions[randomIndex])
})

router.get('/carousel_promotion', (req, res) => {
  res.json(carouselPromotions)
})

module.exports = router
