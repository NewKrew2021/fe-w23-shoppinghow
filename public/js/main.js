import { $ } from './utils.js';
import { ProductList } from './productList.js';

const init = () => {
  const productMoreArea = $('.product-more-area');
  const productList = new ProductList();
  productList.init();

  productMoreArea.addEventListener('click', () => {
    productList.addNewProductLine();
  });
};

init();
