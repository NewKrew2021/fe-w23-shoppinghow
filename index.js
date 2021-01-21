// webpack config
const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware")
const config = require("./webpack.config.js")
const compiler = webpack(config);

// express
const express = require('express')
const app = express()
const routes = require('./lib/routes')
const port = 3000

// express use webpack middleware
app.use(webpackDevMiddleware(compiler));

// set root directories to serve static files
// (none)

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