import { $, deleteClassFromElement, getIndexFromParent } from '../utils.js';

const HOST = 'http://localhost';
const PORT = 8000;

const SQUARED = 2;
const MOUSE_MAX_SPEED = 5;

const SMALL = 'small';
const MEDIUM = 'medium';
const LARGE = 'large';
const MENU_POP_UP = 'menu__pop-up';
const CATEGORY_MENU = 'menu';

const MENU_TEMPLATE = {
  categoryTab(type, title) {
    return `<li class="${type}-category__tab">${title}</li>`;
  },
  firstCategoryTab(type, title) {
    return `<li class="${type}-category__tab ${type}-category__tab--activated">${title}</li>`;
  },
};

class CategoryMenu {
  constructor() {
    this.categoryData = {
      [LARGE]: null,
      [MEDIUM]: null,
      [SMALL]: null,
    };

    this.categoryElement = {
      [CATEGORY_MENU]: $('.menu'),
      [MENU_POP_UP]: $(`.${MENU_POP_UP}`),
      [LARGE]: $('.large-category'),
      [MEDIUM]: $('.medium-category'),
      [SMALL]: $('.small-category'),
    };

    this.activeCategoryIndex = {
      [LARGE]: 0,
      [MEDIUM]: 0,
      [SMALL]: 0,
    };

    this.currentX = 0;
    this.currentY = 0;
  }

  createCategoryHTML(data, type) {
    return data.reduce((acc, { title }, index) => {
      if (index === 0 && type !== SMALL)
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
      case MEDIUM:
        this.activeCategoryIndex[MEDIUM] = 0;

        this.categoryData[MEDIUM] = this.categoryData[LARGE].data[
          this.activeCategoryIndex[LARGE]
        ];
        break;
      case SMALL:
        this.activeCategoryIndex[SMALL] = 0;

        this.categoryData[SMALL] = this.categoryData[LARGE].data[
          this.activeCategoryIndex[LARGE]
        ].data[this.activeCategoryIndex[MEDIUM]];
        break;
    }
  }

  toggleTabActivation(activatedTab) {
    switch (activatedTab.className) {
      case 'large-category__tab':
        this.deletePrevActivation(LARGE);
        this.activeTab(LARGE, activatedTab);
        this.initCategory(MEDIUM);
        this.renderCategory(MEDIUM);
        this.initCategory(SMALL);
        this.renderCategory(SMALL);
        break;

      case 'medium-category__tab':
        this.deletePrevActivation(MEDIUM);
        this.activeTab(MEDIUM, activatedTab);
        this.initCategory(SMALL);
        this.renderCategory(SMALL);
        break;

      case 'small-category__tab':
        this.deletePrevActivation(SMALL);
        this.activeTab(SMALL, activatedTab);
        break;
    }
    return;
  }

  handleMouseMove({ clientX, clientY, target }) {
    if (this.calculateMouseMovement(clientX, clientY) < MOUSE_MAX_SPEED) {
      this.toggleTabActivation(target);
    }

    this.currentX = clientX;
    this.currentY = clientY;
  }

  addCurrentTabEvent() {
    $('.menu__pop-up').addEventListener('mousemove', event =>
      this.handleMouseMove(event)
    );
  }

  async fetchMenuData() {
    let menuData = await fetch(`${HOST}:${PORT}/api/menu`);
    return menuData.json();
  }

  renderCategory(type) {
    this.categoryElement[type].innerHTML = this.createCategoryHTML(
      this.categoryData[type].data,
      type
    );
  }

  renderMenu() {
    this.renderCategory(LARGE);
    this.renderCategory(MEDIUM);
    this.renderCategory(SMALL);
  }

  initMenuData(res) {
    {
      this.categoryData[LARGE] = res;
      this.categoryData[MEDIUM] = this.categoryData[LARGE].data[
        this.activeCategoryIndex[LARGE]
      ];
      this.categoryData[SMALL] = this.categoryData[LARGE].data[
        this.activeCategoryIndex[LARGE]
      ].data[this.activeCategoryIndex[MEDIUM]];
    }
  }

  addMouseOverEvent() {
    this.categoryElement[CATEGORY_MENU].addEventListener('mouseenter', () => {
      this.categoryElement[MENU_POP_UP].style.display = 'flex';
      $('.menu__icon').classList.add('menu__icon--activated');
      $('.menu__icon').innerText = '✕';
    });

    this.categoryElement[CATEGORY_MENU].addEventListener('mouseleave', () => {
      this.categoryElement[MENU_POP_UP].style.display = 'none';
      deleteClassFromElement($('.menu__icon'), 'menu__icon--activated');
      $('.menu__icon').innerText = '☰';
    });
  }

  init() {
    this.fetchMenuData()
      .then(res => this.initMenuData(res))
      .then(() => this.renderMenu());
    this.addMouseOverEvent();
    this.addCurrentTabEvent();
  }
}

export { CategoryMenu };
