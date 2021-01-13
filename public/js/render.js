const more = (containerDOM) => {
    const element = document.createElement("div");
    element.setAttribute("class", "container__more");
    element.innerHTML = `<div style="margin:0 auto">더보기</div>`;
    return element;
}

const subject = (content) => {
    const element = document.createElement("div");
    element.setAttribute("class", "container__subject");
    element.innerText = content;
    return element;
}

function box() {
    const boxElement = document.createElement("div");
    boxElement.setAttribute("class", "container__box horizontal");
    boxElement.innerHTML = `${[...arguments].join("")}`;
    return boxElement;
}

function margin(height) {
    const marginElement = document.createElement("div");
    marginElement.setAttribute("class", "container__margin");
    marginElement.setAttribute("style", `height:${height}px`);
    return marginElement;
}

function carousel(imgSrc) {
    let element = `<div class="container__item--carousel border-gray">
    <img class="container__item--carousel__img margin-auto" src=${imgSrc}>
    </div>`;
    return element;
}

function bestItem(imgSrc) {
    let element = `<div class="container__item--best border-gray">
    <img class="container__item--best__img margin-auto" src="${imgSrc}">
    </div>`;
    return element;
}

function basicItem(info) {
    let element = `<div class="container__item--basic border-gray">`;
    element += basicItemImg(info.src);
    element += basicItemTitle(info.title);
    element += basicItemSubTitle(info.subtitle);
    element += basicItemPrice(info.price);
    element += basicItemCompany(info.company);
    element += `</div>`;
    return element;
}

function basicItemImg(imgSrc) {
    return `<img class="container__item--basic__img" src=${imgSrc}>`;
}
function basicItemTitle(title) {
    return `<div class="container__item--basic__title">${title}</div>`;
}
function basicItemSubTitle(subTitle) {
    return `<div class="container__item--basic__sub-title">${subTitle}</div>`;
}
function basicItemPrice(price) {
    return `<div class="container__item--basic__price">${price}원</div>`;
}
function basicItemCompany(company) {
    return `<div class="container__item--basic__company">${company}</div>`;
}