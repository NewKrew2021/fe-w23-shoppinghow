import {createCarouselContainer} from "./component/carouselcomponent.js"
import {createTrendContainer} from "./component/trendcomponent.js"
import {createBestContainer} from "./component/bestcomponent.js"
import {createRecentContainer} from "./component/recentcomponent.js"
import {createInputContainer} from "./component/inputcomponent.js"
import {createThemeContainer} from "./component/themecomponent.js"
import {createCategoryContainer} from "./component/categorycomponent.js"

window.addEventListener("DOMContentLoaded", () => {
  createBestContainer();
  createCarouselContainer();
  createThemeContainer();
  createTrendContainer();
  createRecentContainer();
  createInputContainer();
  createCategoryContainer();
})
