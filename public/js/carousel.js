import { $ } from './utils.js';

const HOST = 'http://localhost:8000';
const PRODUCT_NUMBER_IN_ONE_LINE = 5;

class Carousel {
  constructor(productTotalLineNumber) {
    this.currentIndex = 0;
    this.productTotalLineNumber = productTotalLineNumber;
    this.carouselProductListData;
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

  fetchProductList = () =>
    fetch(`${HOST}/api/carousel/?num=${this.productTotalLineNumber}`).then(
      response => {
        return response.json();
      }
    );
  createLeftButton() {
    return `
        <div class="carousel__left-button">
            <p>&#10094;</p>
        </div>
        `;
  }
  createRightButton() {
    return `
        <div class="carousel__right-button">
            <p>&#10095;</p>
        </div>
        `;
  }

  parseProductListDataByIndex(carouselProductListData, index) {
    const startIndex =
      (index + this.productTotalLineNumber) % this.productTotalLineNumber;
    return carouselProductListData.slice(
      PRODUCT_NUMBER_IN_ONE_LINE * startIndex,
      PRODUCT_NUMBER_IN_ONE_LINE * (startIndex + 1)
    );
  }

  createCarouselProductList = carouselProductListData => {
    return `
        <div class="carousel-product-list">
            <div class="carousel-product-list__before">${this.createProductListTemplate(
              this.parseProductListDataByIndex(
                carouselProductListData,
                this.currentIndex - 1
              )
            )}</div>
            <div class="carousel-product-list__current">${this.createProductListTemplate(
              this.parseProductListDataByIndex(
                carouselProductListData,
                this.currentIndex
              )
            )}</div>
            <div class="carousel-product-list__after">${this.createProductListTemplate(
              this.parseProductListDataByIndex(
                carouselProductListData,
                this.currentIndex + 1
              )
            )}</div>
        </div>
        `;
  };

  // 오른쪽으로 이동
  moveToRight() {
    $('.carousel-product-list').style.transform = 'translate3d(-1350px,0,0)';
    this.currentIndex = (this.currentIndex + 1) % this.productTotalLineNumber;
  }
  // 왼쪽으로 이동
  moveToLeft() {
    $('.carousel-product-list').style.transform = 'translate3d(1350px,0,0)';
    this.currentIndex = (this.currentIndex - 1) % this.productTotalLineNumber;
  }
  // 버튼 이벤트 등록
  addButtonEvent() {}
  // 생성
  init() {
    const carouselElement = $('.carousel');
    this.fetchProductList().then(res => {
      carouselElement.innerHTML =
        this.createLeftButton() +
        this.createRightButton() +
        this.createCarouselProductList(res);
    });
    carouselElement.addEventListener('click', event => {
      if (event.target.className === 'carousel__right-button') {
        this.moveToRight();
      }
      if (event.target.className === 'carousel__left-button') {
        this.moveToLeft();
      }
    });
  }
}

export { Carousel };
