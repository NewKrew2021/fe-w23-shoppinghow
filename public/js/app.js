import MainLayout from './main.js';
import UIevent from './uievent.js';
import SearchBox from './searchbox.js';
import Category from './category.js';

/* 레이아웃 초기 구성 */
const initLayout = new MainLayout({
    keywordURL : 'http://localhost:80/topkeyword',
    leftBannerURL : 'http://localhost:80/topleft',
    rightBannerURL : 'http://localhost:80/topright',
    hotBannerURL : 'http://localhost:80/hot',
    gridBannerURL : 'http://localhost:80/topgrid',
    keywordCnt : 10
});
initLayout.init();

/* 필요한 기능을 위한 이벤트 추가 - 최근 본 상품, 더보기 버튼, ...(추가) ... */
const eventController = new UIevent({ COL : 5, MORE_INDEX : 0});
eventController.init();

/* 검색창 모듈 */
const searchBox = new SearchBox({ COUNT : 10, SPEED : 600, HEIGHT : 32 });
searchBox.init();