import CategoryNavbarManager from './public/js/CategoryNavbar.js';
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

function initProject() {
    const slideshow = new SlideShowView();
    const products = new ProductView();
    const categoryNav = new CategoryNavbarManager();
    RecentProductView.init();
}

initProject();