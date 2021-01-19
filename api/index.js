const Router = require('koa-router');

const productItemListData = require('../data/product-item-list.json');
const menuData = require('../data/menu.json');

const api = new Router();

const PRODUCT_NUMBER_IN_LINE = 5;
const CAROUSEL_PRODUCT_NUMBER = 15;

api.get('/carousel', (ctx, next) => {
  const productNumber = Number(ctx.query.num);
  ctx.body = productItemListData.productItemList.slice(
    0,
    PRODUCT_NUMBER_IN_LINE * productNumber
  );
});

api.get('/product', (ctx, next) => {
  const productLineNumber = Number(ctx.query.num);

  ctx.body = productItemListData.productItemList.slice(
    productLineNumber * PRODUCT_NUMBER_IN_LINE,
    (productLineNumber + 1) * PRODUCT_NUMBER_IN_LINE
  );
});

api.get('/menu', (ctx, next) => {
  ctx.body = menuData;
});

module.exports = api;
