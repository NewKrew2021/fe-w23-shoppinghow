import { $, deleteClassFromElement } from '../utils';

const HOST = 'http://localhost';
const PORT = 8000;

const INTERVAL_TIME = 1000;

const CLASS_NAME = {
  searchBox: 'search-box',
  recommand: 'search-recommand',
};

const SEARCHBOX_TEMPLATE = {
  recommandItem(item, searchingWord) {
    let highlightIndex = item.indexOf(searchingWord);

    return `<li class="search-recommand__item" data-value="${item}">${item.slice(
      0,
      highlightIndex
    )}<span class="search-recommand__item--highlight">${item.substr(
      highlightIndex,
      searchingWord.length
    )}</span>${item.slice(highlightIndex + searchingWord.length)}</li>`;
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
    this.inputInterval = null;
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
      return (
        acc +
        SEARCHBOX_TEMPLATE.recommandItem(item, this.HTMLelement['input'].value)
      );
    }, ``);
  }

  addItemClickEvent() {
    this.HTMLelement['recommand'].addEventListener('mouseover', event => {
      if (event.target.className === 'search-recommand__item')
        this.HTMLelement['input'].value = event.target.dataset.value;
    });
  }

  inputDebounce(newEvent) {
    if (this.inputInterval) {
      clearInterval(this.inputInterval);
    }
    this.inputInterval = setInterval(newEvent, INTERVAL_TIME);
  }

  async getRecommand() {
    if (this.HTMLelement['input'].value === '') return;
    let recommandList = await this.fetchData(
      this.HTMLelement['input'].value
    ).then(res => res.json());

    this.HTMLelement['recommand'].innerHTML = this.renderRecommand(
      recommandList
    );
  }

  init() {
    this.addEventOnElement(
      'input',
      'keyup',
      this.inputDebounce(this.getRecommand.bind(this))
    );
    this.addFocusEvent();
    this.addItemClickEvent();
  }
}

export { SearchBox };
