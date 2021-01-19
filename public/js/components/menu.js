import { $ } from '../utils.js';

const LARGE_CATEGORY = ['패션 / 뷰티', '가전 / 컴퓨터', '가구 / 생활 / 건강'];
const MEDIUM_CATEGORY = ['패션 / 뷰티', '가전 / 컴퓨터', '가구 / 생활 / 건강'];
const SMALL_CATEGORY = ['패션 / 뷰티', '가전 / 컴퓨터', '가구 / 생활 / 건강'];

class Menu {
  constructor() {
    this.largeCategoryElement = $('.large-category');
    this.mediumCategoryElement = $('.medium-category');
    this.smallCategoryElement = $('.small-category');
  }

  createLargeCategoryElement() {
    return LARGE_CATEGORY.reduce((acc, largeCategory) => {
      return acc + `<li class="large-category__tab">${largeCategory}</li>`;
    }, '');
  }

  createMediumCategoryElement() {
    return MEDIUM_CATEGORY.reduce((acc, largeCategory) => {
      return acc + `<li class="medium-category__tab">${largeCategory}</li>`;
    }, '');
  }

  createSmallCategoryElement() {
    return SMALL_CATEGORY.reduce((acc, largeCategory) => {
      return acc + `<li class="small-category__tab">${largeCategory}</li>`;
    }, '');
  }

  init() {
    this.largeCategoryElement.innerHTML = this.createLargeCategoryElement();
    this.mediumCategoryElement.innerHTML = this.createMediumCategoryElement();
    this.smallCategoryElement.innerHTML = this.createSmallCategoryElement();
  }
}

export { Menu };
