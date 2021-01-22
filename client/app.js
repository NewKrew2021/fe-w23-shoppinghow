import CategoryNavbarManager from './public/js/CategoryNavbar.js';
import Header from './public/js/HeaderView.js';
import ProductView from './public/js/ProductView.js';
import RecentProductView from './public/js/RecentProductView.js';
import SlideShowView from './public/js/SlideshowView.js';
import './public/css/normalize.css';
import './public/css/default.css';
import './public/css/index.css';
import './public/css/card.css';
import './public/css/products.css';
import './public/css/slideshow.css';
import './public/images';
import ProductsSlideshow from './public/js/ProductsSlideshow.js';

function initProject() {
    Header.render();
    const slideshow = new SlideShowView();
    const products = new ProductView();
    const categoryNav = new CategoryNavbarManager();
    RecentProductView.init();
    const productsSlideshow = new SlideShowView(ProductsSlideshow.config);
}

initProject();