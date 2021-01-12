const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');

const PORT = 8000;

const app = new Koa();
const router = new Router();

const api = require('./api');

app.use(serve(__dirname + '/public'));

router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is listening to port http://localhost:${PORT}`);
});
