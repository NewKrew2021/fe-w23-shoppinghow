import Products from './public/js/products.js';
import CategoryNavbarManager from './public/js/CategoryNavbar.js';
import { initSlideshow } from './public/js/slideshow.js';
import './public/css/normalize.css';
import './public/css/index.css';
import './public/css/card.css';
import './public/css/products.css';
import './public/css/slideshow.css';
import './public/images';

function initProject() {
    initSlideshow();
    const products = new Products();
    const categoryNav = new CategoryNavbarManager();
}

initProject();