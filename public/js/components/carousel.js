import { $ } from '../utils.js';

const HOST = 'http://localhost:8000';
const PRODUCT_NUMBER_IN_ONE_LINE = 7;
const PRODUCT_ITEM_WIDTH = '270px';
const CAROUSEL_RIGHT_BUTTON_CLASS_NAME = 'carousel__right-button';
const CAROUSEL_LEFT_BUTTON_CLASS_NAME = 'carousel__left-button';

class Carousel {
  constructor(productTotalLineNumber = 15) {
    this.currentIndex = 0;
    this.productTotalLineNumber = productTotalLineNumber;
    this.carouselProductListData;
    this.isCarouselChanging = false;
    this.carouselElement = $('.carousel');
  }

  createTagListTemplate(tagList) {
    const tagReducer = (acc, tag) =>
      acc + `<div class="product-tag">${tag}</div>`;
    return tagList.reduce(tagReducer);
  }

  createProductListTemplate(productItemList) {
    const productListContent = productItemList.reduce(
      (acc, { image, title, description, tagList }) =>
        acc +
        `<li class="product-item">
              <img
                class="product-item__image"
                src="${image}"
              />
              <div class="product-item__title">${title}</div>
              <div class="product-item__description">
                ${description}
              </div>
              <div class="product-tag-list">
                <div class="product-tag">
                ${this.createTagListTemplate(tagList)}
                </div>
              </div>
            </li>`,
      ''
    );
    return `<ul class="product-list__row">${productListContent}</ul>`;
  }
  createProductItemTemplate(productItem) {
    const { image, title, description, tagList } = productItem;
    return `<li class="product-item">
    <img
      class="product-item__image"
      src="${image}"
    />
    <div class="product-item__title">${title}</div>
    <div class="product-item__description">
      ${description}
    </div>
    <div class="product-tag-list">
      <div class="product-tag">
      ${this.createTagListTemplate(tagList)}
      </div>
    </div>
  </li>`;
  }

  createProductListTemplate(productItemList, startItemIndex, endItemIndex) {
    let productListContent = '';
    for (let index = startItemIndex; index <= endItemIndex; index++) {
      const convertedIndex =
        (index + this.productTotalLineNumber) % this.productTotalLineNumber;
      productListContent += createProductItemTemplate(
        productItemList[convertedIndex]
      );
    }

    return `<ul class="product-list__row">${productListContent}</ul>`;
  }

  fetchProductList = () =>
    fetch(`${HOST}/api/carousel/?num=${this.productTotalLineNumber}`)
      .then(response => response.json())
      .then(res => {
        this.carouselProductListData = res;
      });
  createLeftButton() {
    return `
        <div class="${CAROUSEL_LEFT_BUTTON_CLASS_NAME}">
            <p>&#10094;</p>
        </div>
        `;
  }
  createRightButton() {
    return `
        <div class="${CAROUSEL_RIGHT_BUTTON_CLASS_NAME}">
            <p>&#10095;</p>
        </div>
        `;
  }

  parseProductListDataByIndex(carouselProductListData, index) {
    const startIndex =
      (index + this.productTotalLineNumber) % this.productTotalLineNumber;
    return carouselProductListData.slice(
      startIndex,
      startIndex + PRODUCT_NUMBER_IN_ONE_LINE
    );
  }

  createCarouselProductList = carouselProductListData => {
    return `
        <div class="carousel-product-list">
            <div class="carousel-product-list__current">${this.createProductListTemplate(
              this.parseProductListDataByIndex(
                carouselProductListData,
                this.currentIndex
              )
            )}</div>
        </div>
        `;
  };

  // 오른쪽으로 이동
  moveToRight() {
    $(
      '.carousel-product-list'
    ).style.transform = `translate3d(-${PRODUCT_ITEM_WIDTH},0,0)`;
    this.currentIndex = (this.currentIndex + 1) % this.productTotalLineNumber;

    setTimeout(() => {
      this.carouselElement.innerHTML =
        this.createLeftButton() +
        this.createRightButton() +
        this.createCarouselProductList(this.carouselProductListData);
      this.isCarouselChanging = false;
    }, 1000);
  }

  // 왼쪽으로 이동
  moveToLeft() {
    $(
      '.carousel-product-list'
    ).style.transform = `translate3d(${PRODUCT_ITEM_WIDTH},0,0)`;
    this.currentIndex = (this.currentIndex - 1) % this.productTotalLineNumber;

    setTimeout(() => {
      this.carouselElement.innerHTML =
        this.createLeftButton() +
        this.createRightButton() +
        this.createCarouselProductList(this.carouselProductListData);
      this.isCarouselChanging = false;
    }, 1000);
  }

  // 버튼 이벤트 등록
  addButtonEvent() {
    this.carouselElement.addEventListener('click', event => {
      if (this.isCarouselChanging) return;
      this.isCarouselChanging = true;
      if (event.target.className === CAROUSEL_RIGHT_BUTTON_CLASS_NAME) {
        this.moveToRight();
      }
      if (event.target.className === CAROUSEL_LEFT_BUTTON_CLASS_NAME) {
        this.moveToLeft();
      }
    });
  }
  // 생성
  init() {
    this.fetchProductList().then(() => {
      this.carouselElement.innerHTML =
        this.createLeftButton() +
        this.createRightButton() +
        this.createCarouselProductList(this.carouselProductListData);
    });
    this.addButtonEvent();
  }
}

export { Carousel };
