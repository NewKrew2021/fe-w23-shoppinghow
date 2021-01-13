import { $ } from './utils.js';

const productItemList = [
  {
    title: '블루투스 이어폰 모음',
    description: '선 꼬일 걱정은 접고 음악에만 집중!',
    image:
      'https://shop1.daumcdn.net/thumb/S318x318/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FL10931831706.jpg%3Fut%3D20201028213402&scode=talkgift',
    tagList: ['테마'],
  },
  {
    title: '일석이조 뷰티템, 립앤치크',
    description: '볼은 물론, 입술도 화사하게',
    image:
      'https://shop1.daumcdn.net/thumb/S318x318/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FH9420832765.jpg%3Fut%3D20201124213620&scode=talkgift',
    tagList: ['테마'],
  },
  {
    title: '거울과 행거가 하나로!',
    description: '공간 활용력 최고인 수납 아이템',
    image:
      'https://shop1.daumcdn.net/thumb/S318x318/?fname=http%3A%2F%2Fshop1.daumcdn.net%2Fshophow%2Fp%2FZ11475945840.jpg%3Fut%3D20201210125514&scode=talkgift',
    tagList: ['테마'],
  },
  {
    title: '다이어트 플래너',
    description: '기록해서 살 빼세요!',
    image:
      'https://shop1.daumcdn.net/thumb/S318x318/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FK11837607394.jpg%3Fut%3D20210107105210&scode=talkgift',
    tagList: ['테마'],
  },
  {
    title: '배변 훈련을 위한 유아 변기',
    description: '아기도 변기에서 응가하고 싶어요!',
    image:
      'https://shop1.daumcdn.net/thumb/S318x318/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FV9549944795.jpg%3Fut%3D20200602102918&scode=talkgift',
    tagList: ['테마'],
  },
];

class ProductList {
  constructor() {
    this.productListElement = $('.product-list');
    this.productItemList;
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
    fetch('http://localhost:8000/api/product').then(response => {
      return response.json();
    });

  init() {
    this.fetchProductList().then(({ productItemList }) => {
      this.productListElement.innerHTML = this.createProductListTemplate(
        productItemList
      );
    });
  }
}
export { ProductList, productItemList };
