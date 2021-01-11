const Koa = require('koa');
const Router = require('koa-router');

const PORT = 8000;

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'index page';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is listening to port http://localhost:${PORT}`);
});
