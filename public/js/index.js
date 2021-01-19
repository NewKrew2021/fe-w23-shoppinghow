import {createCarouselContainer} from "./carousel.js"
import {createTrendContainer} from "./component/trendcomponent.js"
import {createBestContainer} from "./component/bestcomponent.js"
import {createRecentContainer} from "./component/recentcomponent.js"
import {createInputContainer} from "./component/inputcomponent.js"
import {createThemeContainer} from "./component/themecomponent.js"

window.addEventListener("DOMContentLoaded", () => {
  createBestContainer();
  createCarouselContainer();
  createThemeContainer();
  createTrendContainer();
  createRecentContainer();
  createInputContainer();
})
