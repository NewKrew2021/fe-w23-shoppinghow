const getBasicItemHTML = function (info) {
    let html = `<div class="container__item--basic border-gray">
        <img class="container__item--basic__img" src=${info.src}>
        <div class="container__item--basic__title">${info.title}</div>
        <div class="container__item--basic__sub-title">${info.subtitle}</div>
        <div class="container__item--basic__price">${info.price}원</div>
        <div class="container__item--basic__company">${info.company}</div>
        </div>`;
    return html;
}

const getBasicItemHTMLs = function(infos) {
    return infos.reduce((acc, cur) => {
        return acc + getBasicItemHTML(cur);
    }, "");
}

const getBasicItemDOM = function(info) {
    const element = document.createElement("div");
    element.setAttribute("class", "container__item--basic border-gray");
    element.setAttribute("style", "position: absolute; top: 0; left: 0");
    element.innerHTML = `<img class="container__item--basic__img" src=${info.src}>
        <div class="container__item--basic__title">${info.title}</div>
        <div class="container__item--basic__sub-title">${info.subtitle}</div>
        <div class="container__item--basic__price">${info.price}원</div>
        <div class="container__item--basic__company">${info.company}</div>`;
    return element;
}

const getBestItemHTML = function (info) {
    let html = `<div class="container__item--best border-gray">
        <img src="${info.src}" class="margin-auto container__item--best__img">
        </div>`;
    return html;
}

const getCarouselItemDOM = function(src) {
    const element = document.createElement("img");
    element.setAttribute("src", src);
    element.setAttribute("class", "container__item--carousel__img");
    return element;
}

const getCarouselBoxHTML = function () {
    let html = `<div class="container__item--carousel border-gray">
        </div>`;
    return html;
}

// box: 화면의 한 행
const getBoxDOM = function() {
    const dom = document.createElement("div");
    dom.setAttribute("class", "container__box horizontal");
    
    let html = [...arguments].join("");
    dom.innerHTML = html;

    return dom;
}

// margin: 화면 가로 여백
const getMarginDOM = function (height) {
    const dom = document.createElement("div");
    dom.setAttribute("class", "container__margin");
    dom.setAttribute("style", `height:${height}px`);
    return dom;
}

const getMoreBtnDOM = function() {
    const dom = document.createElement("div");
    dom.setAttribute("class", "container__more");
    dom.innerHTML = `<div class="margin-center">더보기</div>`;
    return dom;
}

const getSubjectDOM = function(content) {
    const dom = document.createElement("div");
    dom.setAttribute("class", "container__subject");
    dom.innerText = content;
    return dom;
}