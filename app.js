const express = require('express');
const app = express();
const port = 3000;
const util=require('./js/util.js');

const path = require('path');
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public/dist'));
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/public/dist/index.html'));
});

app.get('/items', (req, res) =>{
    const pageNum=req.query.page;
    const start=pageNum*5;
    const data=require("./data/item.json"); 
    const sliced=data.items.slice(start,start+5);
    res.json({items:sliced});
});

app.get('/hot-items', (req, res) =>{
    const data=require("./data/hotItem.json"); 
    res.json({items:data.items});
});

app.get('/keyword-result', (req, res) =>{
    const data=require("./data/keyword.json").data; 
    const keyword=req.query.keyword;
    const filtered = data.filter(d => 
        util.isMatch(d,keyword)
    );
    const limited =filtered.slice(0,10);
    res.json({keywordData:limited});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});