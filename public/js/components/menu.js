import { $, deleteClassFromElement, getIndexFromParent } from '../utils.js';

const HOST = 'http://localhost';
const PORT = 8000;

const SQUARED = 2;
const MOUSE_MAX_SPEED = 5;

const MENU_TEMPLATE = {
  categoryTab(type, title) {
    return `<li class="${type}-category__tab">${title}</li>`;
  },
};

class Menu {
  constructor() {
    this.menuData = null;
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

  createCategoryHTML(data, type) {
    return data.reduce((acc, { title }) => {
      return acc + MENU_TEMPLATE.categoryTab(type, title);
    }, ``);
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
        this.smallCategoryIndex = getIndexFromParent(this.activatedTab);
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

  renderMenu() {
    const mediumCategoryData = this.menuData.data[this.largeCategoryIndex];
    const smallCategoryData = this.menuData.data[this.largeCategoryIndex].data[
      this.mediumCategoryIndex
    ];

    this.largeCategoryElement.innerHTML = this.createCategoryHTML(
      this.menuData.data,
      'large'
    );

    this.mediumCategoryElement.innerHTML = this.createCategoryHTML(
      mediumCategoryData.data,
      'medium'
    );

    this.smallCategoryElement.innerHTML = this.createCategoryHTML(
      smallCategoryData.data,
      'small'
    );
  }

  init() {
    this.fetchMenuData()
      .then(res => {
        this.menuData = res;
      })
      .then(() => this.renderMenu());

    this.addCurrentTabEvent();
  }
}

export { Menu };
