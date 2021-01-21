const { $ } = require('../utils');

import { $ } from '../utils';

class SearchBox {
  constructor() {
    this.HTMLelement = {
      searchBox: $('.search-box'),
      input: $('.search-box__input'),
      button: $('.search-box__button'),
    };
  }
}

export { SearchBox };
