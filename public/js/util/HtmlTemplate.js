export const HtmlTemplate = {
  divDefault: {
    front: `<div class=`,
    back: `></div>`
  },
  searchDefault: `<div class="keyword-title">인기 쇼핑 키워드</div>`,
  searchExtend: {
    front: `<div class="keyword"><span class="keyword-number">`,
    mid: `</span>&nbsp;&nbsp;&nbsp;`,
    back: `</div>`
  },
  searchNoResult: `<div class="search-result">추천 키워드가 없습니다.</div>`,
  searchResult: {
    front: `<span class="font-bold">`,
    mid1: `</span>`,
    mid2: `<div class="search-result">`,
    back: `</div>`
  },
  categoryDefault: `
    <div class="category-depth depth-1"></div>
    <div class="category-depth depth-2"></div>
    <div class="category-depth depth-3"></div>
  `,
  recentImg: {
    front: `<img class="recent-img" src=`,
    back: `></img>`
  },
  themeMoreBtn: {
    front: `더보기 ( <red>`,
    mid: `</red> / `,
    back: `건 )`,
  },
  themeLayout: `
    <th class="theme">
      <img class="theme-img">
      <div class="theme-title"></div>
      <div class="theme-info"></div>
      <img class="theme-icon" src="img/themeIcon.png"></img>
    </th>
  `,
  themeTbody: `</tbody>`,
  trendLayout: `
    <th class="trend">
      <img class="trend-img"">
      <div class="trend-title"></div>
      <div class="trend-info"></div>
      <img class="trend-icon" src="img/themeIcon.png"></img>
    </th>
  `,
  trendTitle: `<caption class="trend-caption">지금 뜨는 테마 카테고리</caption>`,
}

