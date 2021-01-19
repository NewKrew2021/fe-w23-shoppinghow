import { $, deleteClassFromElement } from '../utils.js';

const HOST = 'http://localhost';
const PORT = 8000;

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

const SQUARED = 2;

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
      Math.pow(newX - this.currentX, SQUARED) +
      Math.pow(newY - this.currentY, SQUARED)
    );
  }

  toggleTabActivation() {
    const targetClassName = this.activatedTab.className;

    switch (targetClassName) {
      case 'large-category__tab':
        this.activatedTab.classList.add('large-category__tab--activated');
        break;
      case 'large-category__tab large-category__tab--activated':
        deleteClassFromElement(
          this.activatedTab,
          'large-category__tab--activated'
        );
        break;
      case 'medium-category__tab':
        this.activatedTab.classList.add('medium-category__tab--activated');
        break;
      case 'medium-category__tab medium-category__tab--activated':
        deleteClassFromElement(
          this.activatedTab,
          'medium-category__tab--activated'
        );
        break;
      case 'small-category__tab':
        this.activatedTab.classList.add('small-category__tab--activated');
        break;
      case 'small-category__tab small-category__tab--activated':
        deleteClassFromElement(
          this.activatedTab,
          'small-category__tab--activated'
        );
        break;
    }
    return;
  }

  handleMouseMove(event) {
    if (this.calculateMouseMovement(event.clientX, event.clientY) < 5) {
      this.toggleTabActivation();
      this.activatedTab = event.target;
      this.toggleTabActivation();
    }

    this.currentX = event.clientX;
    this.currentY = event.clientY;
  }

  addCurrentTabEvent() {
    $('.menu__pop-up').addEventListener('mousemove', event =>
      this.handleMouseMove(event)
    );
  }

  fetchMenuData() {
    return fetch(`${HOST}:${PORT}/api/menu`).then(res => res.json());
  }

  init() {
    this.largeCategoryElement.innerHTML = this.createLargeCategoryElement();
    this.mediumCategoryElement.innerHTML = this.createMediumCategoryElement();
    this.smallCategoryElement.innerHTML = this.createSmallCategoryElement();

    this.addCurrentTabEvent();
    this.fetchMenuData();
  }
}

export { Menu };
