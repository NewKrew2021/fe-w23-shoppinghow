const Router = require('koa-router');
const carouselData = require('../data/carousel.json');
const productItemListData = require('../data/product-item-list.json');

const api = new Router();
const PRODUCT_NUMBER_IN_LINE = 5;

api.get('/carousel', (ctx, next) => {
  ctx.body = carouselData;
});

api.get('/product', (ctx, next) => {
  const productLineNumber = Number(ctx.query.num);

  ctx.body = productItemListData.productItemList.slice(
    productLineNumber * PRODUCT_NUMBER_IN_LINE,
    (productLineNumber + 1) * PRODUCT_NUMBER_IN_LINE
  );
});

module.exports = api;
