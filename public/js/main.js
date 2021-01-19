import { $ } from './utils.js';
import { ProductList } from './components/productList.js';
import { Carousel } from './components/carousel.js';
import { Menu } from './components/menu.js';

require('../sass/style.sass');

const CAROUSEL_LINE_NUMBER = 15;

const init = () => {
  const productMoreArea = $('.product-more-area');
  const productList = new ProductList();
  const menu = new Menu();

  const carousel = new Carousel(CAROUSEL_LINE_NUMBER);

  carousel.init();
  productList.init();
  menu.init();

  productMoreArea.addEventListener('click', () => {
    productList.addNewProductLine();
  });
};

init();
