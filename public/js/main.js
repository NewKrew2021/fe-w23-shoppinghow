import { Carousel } from "./carousel.js";
import { DOMSearchAPI } from "./DOM_search_api.js";
import { getBasicItemHTML, getBasicItemHTMLs, getBasicItemDOM, getBestItemHTML, 
    getCarouselItemDOM, getCarouselBoxHTML, getBoxDOM, getMarginDOM, getMoreBtnDOM, getSubjectDOM } from "./render.js";
import { MyPromise } from "./promise.js";
import { initCategory } from "./category.js";
import "../css/common.css";
import "../css/style.css";

const URL = "http://localhost:3000";
const domAPI = new DOMSearchAPI(document);
const mainContainerDOM = domAPI.querySelector(".container");
const basicContainerDOM = domAPI.querySelector(".container--basic-item");
const moreBtnDOM = domAPI.querySelector(".container__more");
const myStorage = window.localStorage;

const marginHeight = 20;
let basicItemCnt = 0; // 현재 화면에 노출된 기본 상품 개수

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
    const categories = data[4].data;

    const categoryInfo = initCategory(categories);
    domAPI.querySelector("#category").appendChild(categoryInfo.boxDOM);
    domAPI.querySelector(".category--large").className="category--large--picked";
    domAPI.querySelector(".category--medium").className="category--medium--picked";
    domAPI.querySelector(".category--small").className="category--small--picked";

    domAPI.querySelector(".category--large__item").className="category--large__item--picked";
    domAPI.querySelector(".category--medium__item").className="category--medium__item--picked";
    domAPI.querySelector(".category--small__item").className="category--small__item--picked";

    // 한 행씩 렌더링
    mainContainerDOM.appendChild(getMarginDOM(marginHeight));
    mainContainerDOM.appendChild(getBoxDOM(getCarouselBoxHTML(), getBestItemHTML(bests[0])));

    const carouselDOMs = carousels.map((item) => getCarouselItemDOM(item.src));
    const bigCarousel = new Carousel(mainContainerDOM.lastChild.firstChild, carouselDOMs, 485, 340);
    bigCarousel.init(1, 0.3);
    bigCarousel.render();

    mainContainerDOM.appendChild(getBoxDOM());
    const hotDOMs = hots.map(item => {
        return getBasicItemDOM(item);
    });
    const smallCarousel = new Carousel(mainContainerDOM.lastChild, hotDOMs, 260, 380);
    smallCarousel.init(1, 0.3);
    smallCarousel.render();

    mainContainerDOM.appendChild(getMarginDOM(marginHeight));

    // default 10개 표시    
    basicContainerDOM.appendChild(getSubjectDOM("모든 상품 품절주의!"));  
    basicContainerDOM.appendChild(getBoxDOM(getBasicItemHTMLs(basics.slice(basicItemCnt, basicItemCnt + 5))));
    basicItemCnt += 5;
    basicContainerDOM.appendChild(getBoxDOM(getBasicItemHTMLs(basics.slice(basicItemCnt, basicItemCnt + 5))));
    basicItemCnt += 5;
}

const initEventListener = function () {
    const rviDOM = domAPI.querySelector("#lvi");
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
        getItemData("basic", 0, 10),
        getItemData("category")
    ]).then(data => {
        myStorage.clear();
        initPage(data);
        initEventListener();
    });
});
