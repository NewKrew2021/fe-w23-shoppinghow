const Router = require('koa-router');
const carouselData = require('../data/carousel.json');
const productItemListData = require('../data/product-item-list.json');

const api = new Router();

api.get('/carousel', (ctx, next) => {
  ctx.body = carouselData;
});

api.get('/product', (ctx, next) => {
  ctx.body = productItemListData;
});

module.exports = api;
