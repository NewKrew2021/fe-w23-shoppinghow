import { $ } from './utils.js';

const HOST = 'http://localhost:8000';

class ProductList {
  constructor() {
    this.productListElement = $('.product-list');
    this.productItemList;
    this.productItemLine = 1;
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

  fetchProductList = productLineNumber =>
    fetch(`${HOST}/api/product/?num=${productLineNumber}`).then(response => {
      return response.json();
    });

  addNewProductLine() {
    this.productItemLine += 1;
    this.fetchProductList(this.productItemLine).then(productItemList => {
      this.productListElement.innerHTML += this.createProductListTemplate(
        productItemList
      );
    });
    $('.more-product-text__count').innerText = this.productItemLine;
  }

  init() {
    this.fetchProductList(this.productItemLine).then(productItemList => {
      this.productListElement.innerHTML = this.createProductListTemplate(
        productItemList
      );
    });
  }
}
export { ProductList };
