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

  addFocusEvent() {
    this.HTMLelement.input.addEventListener('focus', event => {
      this.addFocusStyle('recommand');
      this.addFocusStyle('searchBox');
    });

    this.HTMLelement.input.addEventListener('blur', event => {
      this.deleteFocusStyle('recommand');
      this.deleteFocusStyle('searchBox');
    });
  }

  init() {
    this.addFocusEvent();
  }
}

export { SearchBox };
