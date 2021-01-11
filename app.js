const express = require("express");
const app = express();
const fs = require("fs");

app.set("views", __dirname + "/view");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

const server = app.listen(3000, function() {
    console.log("Express server has started on port 3000");
});

app.use(express.static('public'));
app.use(express.json());

const router = require("./router/router.js")(app, fs);