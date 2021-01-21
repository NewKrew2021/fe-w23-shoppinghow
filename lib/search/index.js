const express = require('express')
const router = express.Router()

// JSON data
const { data } = require('./search_recommend_data.json')

// return recommended search data
router.post('/recommend', (req, res) => {
  // the number of data
  const keyword = req.body.keyword?.trim() || ''
  const n_data = parseInt(req.body.nData || 10)

  // find matched data
  const matched = data.filter(word => word.includes(keyword)).slice(0, n_data)

  // response the matched data
  res.json(matched)
})

// return hot-searched data
router.get('/hot', (req, res) => {
  // the number of data
  const n_data = parseInt(req.query.n_data || 10)

  // find hot data (pick randomly for test)
  const hot = data.filter(() => Math.random() < 0.1).slice(0, n_data)

  // response the matched data
  res.json(hot)
})

module.exports = router
