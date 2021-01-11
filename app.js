const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index.html'));
});

app.get('/data', function(req, res) {
    const data=require("./data/data.json"); // read data from json file
    console.log("data read",data);
    res.json(data);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})