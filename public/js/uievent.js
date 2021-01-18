/*
    uievent.js
    UI 관련 이벤트를 위한 클래스
    
    (1) 더보기 기능 - addMoreContent
    (2) 최근 상품 팝업 기능 - show/hidePopupLayer
*/

/* 더보기 클릭 시 아이템 한줄 씩 추가하는 함수 */
import { dom, addHTML } from './util.js';
import Storage from './storage.js';

export default class UIevent{
    constructor(MORE_INDEX){
        /* 사용할 DOM 요소 추가 */
        this.clickedElement = dom('#expand').querySelector();
        this.expanded = dom('#row-more').querySelector();
        this.recentBtn = dom('#recent-btn').querySelector();
        this.innerPopup = dom('#popup-layer').querySelector();
        this.recentDiv = dom('#recent-btn').querySelector();
        this.MORE_INDEX = MORE_INDEX;
    }
    addMoreContent(col){
        this.clickedElement.addEventListener('click', () => {
            let expanded = dom('#row-more').querySelector();
            let storages;
            fetch('http://localhost:80/best')
                .then(res => res.json())
                .then(json => json.slice(this.MORE_INDEX, this.MORE_INDEX + col))
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
                .then(this.MORE_INDEX += col)
        });
    }

    showPopupLayer(){
        this.recentBtn.addEventListener('mouseover', () => {
            this.innerPopup.style.display = "block";
            // 마우스를 올릴 때, 로컬 스토리지의 모든 값을 가져와 출력한다. 
            let storages = new Storage();
            storages.getLocalStorage();
        });
    }

    hidePopupLayer(){
        this.recentDiv.addEventListener('mouseout', () => {
            this.innerPopup.style.display = "none";
        });
    }
}
