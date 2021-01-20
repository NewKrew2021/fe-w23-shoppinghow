import {createCarouselContainer} from "./component/CarouselView.js"
import {createTrendContainer} from "./component/TrendView.js"
import {createBestContainer} from "./component/BestView.js"
import {createRecentContainer} from "./component/RecentView.js"
import {createInputContainer} from "./component/InputView.js"
import {createThemeContainer} from "./component/ThemeView.js"
import {createCategoryContainer} from "./component/CategoryView.js"

window.addEventListener("DOMContentLoaded", () => {
  createBestContainer();
  createCarouselContainer();
  createThemeContainer();
  createTrendContainer();
  createRecentContainer();
  createInputContainer();
  createCategoryContainer();
})
