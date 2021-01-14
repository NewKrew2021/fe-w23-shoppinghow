const myStorage = window.localStorage;
myStorage.clear();

const more = () => {
    const element = document.createElement("div");
    element.setAttribute("class", "container__more");
    element.innerHTML = `<div class="margin-center">더보기</div>`;
    return element;
}

const subject = (content) => {
    const element = document.createElement("div");
    element.setAttribute("class", "container__subject");
    element.innerText = content;
    return element;
}

function promotionBox() {
    const boxElement = document.createElement("div");
    boxElement.setAttribute("class", "container__box horizontal");
    boxElement.innerHTML = [...arguments].join("");
    return boxElement;
}

function box(infoArr) {
    const boxElement = document.createElement("div");
    boxElement.setAttribute("class", "container__box horizontal");

    const result = infoArr.map(info => basicItem(info));
    boxElement.innerHTML = result.join("");

    // 클릭 상품 저장을 위해 이벤트 등록
    boxElement.addEventListener("click", (e) => {
        const imgElement = e.target;
        if(imgElement.tagName === "IMG") {
            const key = imgElement.parentNode.childNodes[1].innerText;
            myStorage.setItem(key, imgElement.src);
        }
    });

    return boxElement;
}

function margin(height) {
    const marginElement = document.createElement("div");
    marginElement.setAttribute("class", "container__margin");
    marginElement.setAttribute("style", `height:${height}px`);
    return marginElement;
}

function carousel() {
    let element = `<div class="container__item--carousel border-gray">
    </div>`;
    return element;
}

function bestItem(src) {
    let element = `<div class="container__item--best border-gray">
    <img src="${src}" class="margin-auto container__item--best__img">
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

// basic item 정보
const basicItemImg = imgSrc => `<img class="container__item--basic__img" src=${imgSrc}>`;
const basicItemTitle = title => `<div class="container__item--basic__title">${title}</div>`;
const basicItemSubTitle = subTitle => `<div class="container__item--basic__sub-title">${subTitle}</div>`;
const basicItemPrice = price => `<div class="container__item--basic__price">${price}원</div>`;
const basicItemCompany = company => `<div class="container__item--basic__company">${company}</div>`;