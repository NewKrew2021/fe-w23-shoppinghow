import MainLayout from './main.js';
import { dom } from './util.js';
import UIevent from './uievent.js';

/* 레이아웃 초기 구성 */
const initLayout = new MainLayout();
initLayout.addNav();
initLayout.addLeftBanner();
initLayout.addRightBanner();
initLayout.addGrid();
initLayout.addBottom();

/* 필요한 기능을 위한 이벤트 추가 - 최근 본 상품, 더보기 버튼, ...(추가) ... */
const eventController = new UIevent(0);
eventController.addMoreContent(5);
eventController.hidePopupLayer();
eventController.showPopupLayer();