const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/view/index.html'));
});

app.get('/items', (req, res) =>{
    const pageNum=req.query.page;
    const start=pageNum*5;
    const data=require("./data/item.json"); // read data from json file
    const sliced=data.items.slice(start,start+5);
    res.json({items:sliced});
});

app.get('/hot-items', (req, res) =>{
    const data=require("./data/hotItem.json"); // read data from json file
    res.json({items:data.items});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})