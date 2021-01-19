const LARGE_CATEGORY = ['패션 / 뷰티', '가전 / 컴퓨터', '가구 / 생활 / 건강'];

class Menu {
  constructor() {}
  createLargeCategoryElement() {
    return LARGE_CATEGORY.reduce((acc, largeCategory) => {
      return acc + `<li class="large-category__tab">${largeCategory}</li>`;
    }, '');
  }
}

export { Menu };
