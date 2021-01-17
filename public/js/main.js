const URL = "http://localhost:3000";
const domAPI = new DOMSearchAPI(document);
const mainContainerDOM = domAPI.querySelector(".container");
const basicContainerDOM = domAPI.querySelector(".container--basic-item");
const moreBtnDOM = domAPI.querySelector(".container__more");
const myStorage = window.localStorage;
let basicItemCnt = 10;

const getItemData = async function (itemType) {
    let url = `${URL}/${itemType}`;
    if (itemType === "basic") url += `?idx=${arguments[1]}&cnt=${arguments[2]}`;
    const res = await fetch(url);
    const resData = await res.json();
    return resData;
}

// 기본 페이지 렌더링
const initPage = function (data) {
    const carousels = data[0].items;
    const bests = data[1].items;
    const hots = data[2].items;
    const basics = data[3].items;

    const mainContainerDOM = domAPI.querySelector(".container");
    const basicContainerDOM = domAPI.querySelector(".container--basic-item");

    mainContainerDOM.appendChild(getBoxDOM(getCarouselItemHTML(), getBestItemHTML(bests[0])));
    const c = new Carousel(mainContainerDOM.lastChild.firstChild, carousels);
    c.init();
    c.render();
    mainContainerDOM.appendChild(getBoxDOM(getBasicItemHTMLs(hots.slice(0, 5))));

    // default 10개 표시
    basicContainerDOM.appendChild(getSubjectDOM("모든 상품 품절주의!"));  
    basicContainerDOM.appendChild(getBoxDOM(getBasicItemHTMLs(basics.slice(0, 5))));
    basicContainerDOM.appendChild(getBoxDOM(getBasicItemHTMLs(basics.slice(5, 10))));
}

const initEventListener = function () {
    const rviDOM = domAPI.querySelector(".header__nav__menu");
    const popupDOM = domAPI.querySelector(".popup");
    rviDOM.addEventListener("mouseover", () => {
        popupDOM.style.display = "block";
        let html = `<div class="popup__title">최근 본 상품 ${myStorage.length}개</div><br>`;
        for (let i = 0; i < myStorage.length; i++) {
            html += `<img class="popup__img" src="${myStorage.getItem(myStorage.key(i))}">`;
        }
        popupDOM.innerHTML = html;
    });
    rviDOM.addEventListener("mouseout", () => {
        popupDOM.style.display = "none";
    });

    // basic item 이벤트
    basicContainerDOM.addEventListener("click", (e) => {
        const imgElement = e.target;
        if(imgElement.tagName === "IMG") {
            const key = imgElement.nextElementSibling.innerText;
            myStorage.setItem(key, imgElement.src);
        }
    });

    // 더보기 버튼
    moreBtnDOM.addEventListener("click", () => {
        getItemData("basic", basicItemCnt, 5).then(data => 
            basicContainerDOM.appendChild(getBoxDOM(getBasicItemHTMLs(data.items)))
        );
        basicItemCnt += 5;
    });
}

window.addEventListener("DOMContentLoaded", (e) => {
    Promise.all([
        getItemData("carousel"),
        getItemData("best"),
        getItemData("hot"),
        getItemData("basic", 0, 10)
    ]).then(data => {
        myStorage.clear();
        initPage(data);
        initEventListener();
    });
});