import { initHome } from "./js/Home";
import { initHeaderNav } from "./js/HeaderNav";
import { initHotCarouselSection } from "./js/HotCarouselSection";
import { initItemSection } from "./js/ItemSection";
import {initMenu} from "./js/Menu";
(function initApp() {
    initHome();
    initHeaderNav();
    initHotCarouselSection();
    initItemSection();
    initMenu();
})();