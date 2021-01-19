/*
    uievent.js
    UI 관련 이벤트를 위한 클래스
    
    (1) 더보기 기능 - addMoreContent
    (2) 최근 상품 팝업 기능 - show/hidePopupLayer
*/

/* 더보기 클릭 시 아이템 한줄 씩 추가하는 함수 */
import { dom, addHTML } from './util.js';
import Storage from './storage.js';

export default class UIevent {
    constructor(obj) {
        /* 사용할 DOM 요소 추가 */
        this.clickedElement = dom('#expand').querySelector();
        this.expanded = dom('#row-more').querySelector();
        this.recentBtn = dom('#recent-btn').querySelector();
        this.innerPopup = dom('#popup-layer').querySelector();
        this.recentDiv = dom('#recent-btn').querySelector();
        this.loginBtn = dom('#login').querySelector();
        this.MORE_INDEX = obj.MORE_INDEX;
        this.COL = obj.COL;
    }

    addMoreContent() {
        let expanded = dom('#row-more').querySelector();
        let storages;
        fetch('http://localhost:80/best')
            .then(res => res.json())
            .then(json => json.slice(this.MORE_INDEX, this.MORE_INDEX + this.COL))
            .then(data => data.forEach(element => {
                addHTML(expanded, `
                            <ul id="grid-ul-2" class="grid-ul">
                            <li class="grid-banner">
                            <img class="banner-img" src=${element.src}>
                            <p class="title">${element.title}</p>
                            <p class="subtext">${element.text}</p>
                            <img class="theme-btn" src="/images/theme.png"></li>
                            </ul>
                    `)
            }))
            .then(data => { storages = new Storage(); })
            .then(data => storages.clickSaveHandler())
            .then(() => { this.MORE_INDEX += this.COL }) //
    }
    showPopupLayer() {
        const storages = new Storage();
        this.innerPopup.style.display = "block";
        storages.getLocalStorage();
    }

    hidePopupLayer() {
        this.innerPopup.style.display = "none";
    }

    removeStorage() {
        this.loginBtn.addEventListener('click', localStorage.clear());
    }

    onEvent() {
        this.clickedElement.addEventListener('click', this.addMoreContent.bind(this));
        this.recentBtn.addEventListener('mouseover', this.showPopupLayer.bind(this));
        this.recentBtn.addEventListener('mouseout', this.hidePopupLayer.bind(this));
        this.loginBtn.addEventListener('click', this.removeStorage.bind(this));
    }

    init() {
        this.onEvent();
    }
}
