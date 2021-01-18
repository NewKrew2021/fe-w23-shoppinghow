/*
    uievent.js
    UI 관련 이벤트를 위한 함수
*/

/* 더보기 클릭 시 아이템 한줄 씩 추가하는 함수 */
let index = 0;
let jsonArr;
function addMoreContent(col) {
    const clickedElement = dom('#expand').querySelector();
    clickedElement.addEventListener('click', () => {
        let expanded = dom('#row-more').querySelector();
        fetch('http://localhost:80/best')
            .then(res => res.json())
            .then(json => json.slice(index, index + col))
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
            .then(data => clickSaveStorage())
            .then(index += col)
    });
}
addMoreContent(5);

/* 최근본 상품 탭 - 팝업 레이어 마우스 오버, 아웃 이벤트 함수 */
function showPopupLayer() {
    const recentBtn = dom('#recent-btn').querySelector();
    const innerPopup = dom('#popup-layer').querySelector();
    recentBtn.addEventListener('mouseover', () => {
        innerPopup.style.display = "block";

        /* 마우스를 올릴 때, 로컬 스토리지의 모든 값을 가져와 출력한다. */
        getLocalStorage();
    });
}
function hidePopupLayer() {
    const recentDiv = dom('#recent-btn').querySelector();
    const innerPopup = dom('#popup-layer').querySelector();
    recentDiv.addEventListener('mouseout', () => {
        innerPopup.style.display = "none";
    });
}
showPopupLayer();
hidePopupLayer();
