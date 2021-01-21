import MainLayout from './main.js';
import UIevent from './uievent.js';
import SearchBox from './searchbox.js';
import Category from './category.js';

/* 모듈에 필요한 초기화용 객체 */
const initLayoutObj = {
    keywordURL : 'http://localhost:80/topkeyword',
    leftBannerURL : 'http://localhost:80/topleft',
    rightBannerURL : 'http://localhost:80/topright',
    hotBannerURL : 'http://localhost:80/hot',
    gridBannerURL : 'http://localhost:80/topgrid',
    keywordCnt : 10
}
const uiEventObj = {
    COL : 5,
    MORE_INDEX : 0
}
const searchBoxObj = {
    RELEASE_TIME : 350,
    COUNT : 10,
    SPEED : 600,
    HEIGHT : 32
}
const categoryObj = {
    URL : 'http://localhost:80/category'
}

/* 레이아웃 초기 구성 */
const initLayout = new MainLayout(initLayoutObj);
initLayout.init();

/* 필요한 기능을 위한 이벤트 추가 - 최근 본 상품, 더보기 버튼, ...(추가) ... */
const eventController = new UIevent(uiEventObj);
eventController.init();

/* 검색창 모듈 */
const searchBox = new SearchBox(searchBoxObj);
searchBox.init();

/* 카테고리 모듈 */
const category = new Category(categoryObj);
category.init();