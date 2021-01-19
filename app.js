const express = require("express");
const app = express();
const fs = require("fs");

const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const config = require("./webpack.config.js");

app.use(express.static(__dirname + "/public"));
app.use(express.json());

const compiler = webpack(config);
app.use(middleware(compiler, {
    publicPath: config.output.publicPath,
    serverSideRender: true
  }));

app.use(hotMiddleware(compiler));

app.set("views", __dirname + "/view");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);



const server = app.listen(3000, function () {
  console.log("Express server has started on port 3000");
});

const router = require("./router/router.js")(app, fs);