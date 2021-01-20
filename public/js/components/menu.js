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

    this.activatedCategoryIndex = {
      large: 0,
      medium: 0,
      small: 0,
    };

    this.activatedTab = $('.large-category').children[0];

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
        deleteClassFromElement(
          this.categoryElement['large'].childNodes[
            this.activatedCategoryIndex['large']
          ],
          'large-category__tab--activated'
        );
        this.activatedCategoryIndex['large'] = getIndexFromParent(
          this.activatedTab
        );
        this.activatedTab.classList.add('large-category__tab--activated');

        break;

      case 'medium-category__tab':
        // 삭제
        deleteClassFromElement(
          this.categoryElement['medium'].childNodes[
            this.activatedCategoryIndex['medium']
          ],
          'medium-category__tab--activated'
        );
        this.activatedCategoryIndex['medium'] = getIndexFromParent(
          this.activatedTab
        );
        // 추가
        this.activatedTab.classList.add('medium-category__tab--activated');

        this.activatedCategoryIndex['medium'] = getIndexFromParent(
          this.activatedTab
        );

        this.categoryData['small'] = this.categoryData['large'].data[
          this.activatedCategoryIndex['large']
        ].data[this.activatedCategoryIndex['medium']];

        this.renderCategory('small');

        break;

      case 'small-category__tab':
        deleteClassFromElement(
          this.categoryElement['small'].childNodes[
            this.activatedCategoryIndex['small']
          ],
          'small-category__tab--activated'
        );
        this.activatedCategoryIndex['small'] = getIndexFromParent(
          this.activatedTab
        );
        // 추가
        this.activatedTab.classList.add('small-category__tab--activated');
        this.activatedCategoryIndex['small'] = getIndexFromParent(
          this.activatedTab
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
        this.activatedCategoryIndex['large']
      ];
      this.categoryData['small'] = this.categoryData['large'].data[
        this.activatedCategoryIndex['large']
      ].data[this.activatedCategoryIndex['medium']];
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
