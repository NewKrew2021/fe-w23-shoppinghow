import { $ } from './utils.js';
import { ProductList } from './productList.js';
import { Carousel } from './carousel.js';

const init = () => {
  const productMoreArea = $('.product-more-area');
  const productList = new ProductList();

  const carousel = new Carousel(3);
  carousel.fetchProductList().then(res => {
    console.log(carousel.parseProductListDataByIndex(res));
  });
  productList.init();

  productMoreArea.addEventListener('click', () => {
    productList.addNewProductLine();
  });
};

init();
