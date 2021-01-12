const Router = require('koa-router');
const carouselData = require('../data/carousel.json');

const api = new Router();

api.get('/carousel', (ctx, next) => {
  ctx.body = carouselData;
});

module.exports = api;
