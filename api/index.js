const Router = require('koa-router');
const carouselData = require('../data/carousel.json');

const api = new Router();

api.get('/carousel', (ctx, next) => {
  console.log(carouselData);
  ctx.body = 'GET ' + ctx.request.path;
});

module.exports = api;
