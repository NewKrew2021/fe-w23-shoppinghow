import { initHome } from "./js/Home";
import { initHeaderNav } from "./js/HeaderNav";
import { initHotCarouselSection } from "./js/HotCarouselSection";
import { initItemSection } from "./js/ItemSection";
import {initMenu} from "./js/Menu";
import {initSearchBar} from"./js/searchBar";
(function initApp() {
    initHome();
    initHeaderNav();
    initHotCarouselSection();
    initItemSection();
    initMenu();
    initSearchBar();
})();