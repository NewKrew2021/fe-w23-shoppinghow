const Router = require('koa-router');

const api = new Router();

api.get('/carousel', (ctx, next) => {
  ctx.body = 'GET ' + ctx.request.path;
});

module.exports = api;
