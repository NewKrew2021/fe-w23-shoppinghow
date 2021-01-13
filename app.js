const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/view/index.html'));
});

app.get('/best', (req, res) =>{
    const data=require("./data/data.json"); // read data from json file
    res.json(data);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})