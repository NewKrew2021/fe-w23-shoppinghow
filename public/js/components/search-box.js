import { $, deleteClassFromElement } from '../utils';

const CLASS_NAME = {
  searchBox: 'search-box',
  recommand: 'search-recommand',
};

class SearchBox {
  constructor() {
    this.HTMLelement = {
      searchBox: $(`.${CLASS_NAME.searchBox}`),
      input: $('.search-box__input'),
      button: $('.search-box__button'),
      recommand: $(`.${CLASS_NAME.recommand}`),
    };
  }

  addFocusStyle(type) {
    this.HTMLelement[type].classList.add(`${CLASS_NAME[type]}__focus`);
  }

  deleteFocusStyle(type) {
    deleteClassFromElement(
      this.HTMLelement[type],
      `${CLASS_NAME[type]}__focus`
    );
  }

  addEventOnElement(elementType, eventType, callbackFunction) {
    this.HTMLelement[elementType].addEventListener(eventType, callbackFunction);
  }

  addFocusEvent() {
    addEventOnElement('input', 'focus', () => {
      this.addFocusStyle('recommand');
      this.addFocusStyle('searchBox');
    });

    this.addEventOnElement('input', 'blur', () => {
      this.deleteFocusStyle('recommand');
      this.deleteFocusStyle('searchBox');
    });
  }

  init() {
    this.addFocusEvent();
  }
}

export { SearchBox };
