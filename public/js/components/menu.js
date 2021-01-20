import { $, deleteClassFromElement, getIndexFromParent } from '../utils.js';

const HOST = 'http://localhost';
const PORT = 8000;

const SQUARED = 2;
const MOUSE_MAX_SPEED = 5;

const MENU_TEMPLATE = {
  categoryTab(type, title) {
    return `<li class="${type}-category__tab">${title}</li>`;
  },
  firstCategoryTab(type, title) {
    return `<li class="${type}-category__tab ${type}-category__tab--activated">${title}</li>`;
  },
};

class Menu {
  constructor() {
    this.categoryData = {
      large: null,
      medium: null,
      small: null,
    };

    this.categoryElement = {
      large: $('.large-category'),
      medium: $('.medium-category'),
      small: $('.small-category'),
    };

    this.activeCategoryIndex = {
      large: 0,
      medium: 0,
      small: 0,
    };

    this.currentX = 0;
    this.currentY = 0;
  }

  createCategoryHTML(data, type) {
    return data.reduce((acc, { title }, index) => {
      if (index === 0 && type !== 'small')
        return acc + MENU_TEMPLATE.firstCategoryTab(type, title);
      return acc + MENU_TEMPLATE.categoryTab(type, title);
    }, ``);
  }

  calculateMouseMovement(newX, newY) {
    return (
      Math.pow(newX - this.currentX, SQUARED) +
      Math.pow(newY - this.currentY, SQUARED)
    );
  }

  deletePrevActivation(type) {
    deleteClassFromElement(
      this.categoryElement[type].childNodes[this.activeCategoryIndex[type]],
      `${type}-category__tab--activated`
    );
  }

  activeTab(type, activatedTab) {
    this.activeCategoryIndex[type] = getIndexFromParent(activatedTab);
    activatedTab.classList.add(`${type}-category__tab--activated`);
  }

  initCategory(type) {
    switch (type) {
      case 'medium':
        this.activeCategoryIndex['medium'] = 0;

        this.categoryData['medium'] = this.categoryData['large'].data[
          this.activeCategoryIndex['large']
        ];
        break;
      case 'small':
        this.activeCategoryIndex['small'] = 0;

        this.categoryData['small'] = this.categoryData['large'].data[
          this.activeCategoryIndex['large']
        ].data[this.activeCategoryIndex['medium']];
        break;
    }
  }

  toggleTabActivation(activatedTab) {
    switch (activatedTab.className) {
      case 'large-category__tab':
        this.deletePrevActivation('large');
        this.activeTab('large', activatedTab);
        this.initCategory('medium');
        this.renderCategory('medium');
        this.initCategory('small');
        this.renderCategory('small');
        break;

      case 'medium-category__tab':
        this.deletePrevActivation('medium');
        this.activeTab('medium', activatedTab);
        this.initCategory('small');
        this.renderCategory('small');
        break;

      case 'small-category__tab':
        this.deletePrevActivation('small');
        this.activeTab('small', activatedTab);
        break;
    }
    return;
  }

  handleMouseMove(event) {
    if (
      this.calculateMouseMovement(event.clientX, event.clientY) <
      MOUSE_MAX_SPEED
    ) {
      this.toggleTabActivation(event.target);
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

  renderCategory(type) {
    this.categoryElement[type].innerHTML = this.createCategoryHTML(
      this.categoryData[type].data,
      type
    );
  }

  renderMenu() {
    this.renderCategory('large');
    this.renderCategory('medium');
    this.renderCategory('small');
  }

  initMenuData(res) {
    {
      this.categoryData['large'] = res;
      this.categoryData['medium'] = this.categoryData['large'].data[
        this.activeCategoryIndex['large']
      ];
      this.categoryData['small'] = this.categoryData['large'].data[
        this.activeCategoryIndex['large']
      ].data[this.activeCategoryIndex['medium']];
    }
  }

  init() {
    this.fetchMenuData()
      .then(res => this.initMenuData(res))
      .then(() => this.renderMenu());

    this.addCurrentTabEvent();
  }
}

export { Menu };
