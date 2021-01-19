import { $, deleteClassFromElement } from '../utils.js';

const LARGE_CATEGORY = ['패션 / 뷰티', '가전 / 컴퓨터', '가구 / 생활 / 건강'];
const MEDIUM_CATEGORY = [
  '패션 / 뷰티',
  '가전 / 컴퓨터',
  '가구 / 생활 / 건강',
  '패션 / 뷰티',
  '가전 / 컴퓨터',
  '가구 / 생활 / 건강',
  '패션 / 뷰티',
  '가전 / 컴퓨터',
  '가구 / 생활 / 건강',
  '패션 / 뷰티',
  '가전 / 컴퓨터',
  '가구 / 생활 / 건강',
];
const SMALL_CATEGORY = [
  '패션 / 뷰티',
  '가전 / 컴퓨터',
  '가구 / 생활 / 건강',
  '패션 / 뷰티',
  '가전 / 컴퓨터',
  '가구 / 생활 / 건강',
  '패션 / 뷰티',
  '가전 / 컴퓨터',
  '가구 / 생활 / 건강',
];

class Menu {
  constructor() {
    this.largeCategoryElement = $('.large-category');
    this.mediumCategoryElement = $('.medium-category');
    this.smallCategoryElement = $('.small-category');
    this.activatedTab = $('.large-category').children[0];
    this.currentX = 0;
    this.currentY = 0;
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

  calculateMouseMovement(newX, newY) {
    return (
      Math.pow(newX - this.currentX, 2) + Math.pow(newY - this.currentY, 2)
    );
  }

  addCurrentTabEvent() {
    $('.menu__pop-up').addEventListener('mousemove', event => {
      if (this.calculateMouseMovement(event.clientX, event.clientY) < 5) {
        deleteClassFromElement(this.activatedTab, 'tab__activated');
        this.activatedTab = event.target;
        this.activatedTab.classList.add('tab__activated');
      }
      this.currentX = event.clientX;
      this.currentY = event.clientY;
    });
  }

  init() {
    this.largeCategoryElement.innerHTML = this.createLargeCategoryElement();
    this.mediumCategoryElement.innerHTML = this.createMediumCategoryElement();
    this.smallCategoryElement.innerHTML = this.createSmallCategoryElement();
    console.log(this.activatedTab);
    this.addCurrentTabEvent();
  }
}

export { Menu };
