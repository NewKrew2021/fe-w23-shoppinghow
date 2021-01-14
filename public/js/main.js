import { $ } from './utils.js';
import { ProductList } from './productList.js';
import { Carousel } from './carousel.js';

const CAROUSEL_LINE_NUMBER = 15;

const init = () => {
  const productMoreArea = $('.product-more-area');
  const productList = new ProductList();

  const carousel = new Carousel(CAROUSEL_LINE_NUMBER);

  carousel.init();
  productList.init();

  productMoreArea.addEventListener('click', () => {
    productList.addNewProductLine();
  });
};

init();
