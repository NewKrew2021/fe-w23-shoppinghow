const Koa = require('koa');
const serve = require('koa-static');

const PORT = 8000;

const app = new Koa();

app.use(serve(__dirname + '/public'));

app.listen(PORT, () => {
  console.log(`Server is listening to port http://localhost:${PORT}`);
});
