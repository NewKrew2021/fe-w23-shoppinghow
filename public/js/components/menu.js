import { $, deleteClassFromElement, getIndexFromParent } from '../utils.js';

const HOST = 'http://localhost';
const PORT = 8000;

const SQUARED = 2;
const MOUSE_MAX_SPEED = 5;

class Menu {
  constructor() {
    this.largeCategoryElement = $('.large-category');
    this.mediumCategoryElement = $('.medium-category');
    this.smallCategoryElement = $('.small-category');
    this.activatedTab = $('.large-category').children[0];
    this.largeCategoryIndex = 0;
    this.mediumCategoryIndex = 0;
    this.smallCategoryIndex = 0;
    this.currentX = 0;
    this.currentY = 0;
  }

  createLargeCategoryElement(menuData) {
    return menuData.reduce((acc, { title }) => {
      return acc + `<li class="large-category__tab">${title}</li>`;
    }, '');
  }

  createMediumCategoryElement(mediumCategoryData) {
    return mediumCategoryData.reduce((acc, { title }) => {
      return acc + `<li class="medium-category__tab">${title}</li>`;
    }, '');
  }

  createSmallCategoryElement(smallCategoryData) {
    return smallCategoryData.reduce((acc, { title }) => {
      return acc + `<li class="small-category__tab">${title}</li>`;
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
    if (
      this.calculateMouseMovement(event.clientX, event.clientY) <
      MOUSE_MAX_SPEED
    ) {
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
  renderMenu(menuData) {
    const mediumCategoryData = menuData.data[this.largeCategoryIndex];
    const smallCategoryData =
      menuData.data[this.largeCategoryIndex].data[this.mediumCategoryIndex];

    this.largeCategoryElement.innerHTML = this.createLargeCategoryElement(
      menuData.data
    );
    this.mediumCategoryElement.innerHTML = this.createMediumCategoryElement(
      mediumCategoryData.data
    );
    this.smallCategoryElement.innerHTML = this.createSmallCategoryElement(
      smallCategoryData.data
    );
  }

  init() {
    this.fetchMenuData().then(res => {
      this.renderMenu(res);
    });

    this.addCurrentTabEvent();
  }
}

export { Menu };
