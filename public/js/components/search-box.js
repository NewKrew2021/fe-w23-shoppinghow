import { $, deleteClassFromElement } from '../utils';

const HOST = 'http://localhost';
const PORT = 8000;

const CLASS_NAME = {
  searchBox: 'search-box',
  recommand: 'search-recommand',
};

const SEARCHBOX_TEMPLATE = {
  recommandItem(item) {
    return `<li class="search-recommand__item">${item}</li>`;
  },
};

class SearchBox {
  constructor() {
    this.recommandList = [];
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
    this.addEventOnElement('input', 'focus', () => {
      this.addFocusStyle('recommand');
      this.addFocusStyle('searchBox');
    });

    this.addEventOnElement('input', 'blur', () => {
      this.deleteFocusStyle('recommand');
      this.deleteFocusStyle('searchBox');
    });
  }

  fetchData(searchingWord) {
    let params = { word: searchingWord };
    let query = Object.keys(params)
      .map(
        key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
      )
      .join('&');

    let url = `${HOST}:${PORT}/api/recommand?${query}`;
    return fetch(url);
  }

  renderRecommand(recommandList) {
    return recommandList.reduce((acc, item) => {
      return acc + SEARCHBOX_TEMPLATE.recommandItem(item);
    }, ``);
  }

  async getRecommand() {
    let recommandList = await this.fetchData(
      this.HTMLelement['input'].value
    ).then(res => res.json());

    this.HTMLelement['recommand'].innerHTML = this.renderRecommand(
      recommandList
    );
  }

  init() {
    this.addEventOnElement('input', 'keyup', this.getRecommand.bind(this));
    this.addFocusEvent();
  }
}

export { SearchBox };
