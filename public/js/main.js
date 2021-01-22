import { $ } from './utils.js';
import { ProductList } from './components/productList.js';
import { Carousel } from './components/carousel.js';
import { CategoryMenu } from './components/menu.js';
import { SearchBox } from './components/search-box';

const CAROUSEL_LINE_NUMBER = 15;

const init = () => {
  const productMoreArea = $('.product-more-area');
  const productList = new ProductList();
  const categoryMenu = new CategoryMenu();
  const searchBox = new SearchBox();

  const carousel = new Carousel(CAROUSEL_LINE_NUMBER);

  carousel.init();
  productList.init();
  categoryMenu.init();
  searchBox.init();

  productMoreArea.addEventListener('click', () => {
    productList.addNewProductLine();
  });
};

export { init };
