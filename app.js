const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set('data','./data');
app.set('dist','./dist');

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/'+ 'index.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
