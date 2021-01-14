const HOST = 'http://localhost:8000';
const PRODUCT_NUMBER_IN_ONE_LINE = 5;

class Carousel {
  constructor(productTotalLineNumber) {
    this.currentIndex = 0;
    this.productTotalLineNumber = productTotalLineNumber;
    this.carouselProductListData;
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

  parseProductListDataByIndex(carouselProductListData) {
    const startIndex =
      (this.currentIndex + this.productTotalLineNumber) %
      this.productTotalLineNumber;
    return carouselProductListData.slice(
      PRODUCT_NUMBER_IN_ONE_LINE * startIndex,
      PRODUCT_NUMBER_IN_ONE_LINE * (startIndex + 1)
    );
  }

  createCarouselProductList = carouselProductListData => {
    return `
        <div class="carousel-product-list">
            <div class="carousel-product-list__before">${this.createProductListTemplate()}</div>
            <div class="carousel-product-list__current">${this.createProductListTemplate()}</div>
            <div class="carousel-product-list__after">${this.createProductListTemplate()}</div>
        </div>;
        `;
  };

  // 오른쪽으로 이동
  moveToRight() {}
  // 왼쪽으로 이동
  moveToLeft() {}
  // 버튼 이벤트 등록
  addButtonEvent() {}
  // 생성
  init() {}
}

export { Carousel };
