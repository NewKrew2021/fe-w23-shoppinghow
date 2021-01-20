// refer: https://expressjs.com/ko/starter/hello-world.html
const express = require('express')
const app = express()
const routes = require('./lib/routes')
const port = 3000

// set root directories to serve static files
app.use(express.static('public'))
app.use(express.static('views'))

// parse application/json
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// use router
app.use('/', routes)

// start the server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})