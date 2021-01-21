import { findOne, myFetchGET, myFetchPOST } from "../util"

const htmlElements = {}

function initRecommendBox(box, data) {
  // {data} is array of recommended keywords(string)

  function getListItemHtmlString(text) {
    return `
      <li>
        <a href="#" class="d-block hover-bg-bright px-4 py-2">
          ${text}
        </a>
      </li>`
  }

  if (data.length > 0) {
    // append list items
    box.innerHTML = `
      <ul class="list-no-style">
        ${data.reduce((htmlString, word) => htmlString + getListItemHtmlString(word), '')}
      </ul>`
  } else {
    // no data
    box.innerHTML = `<p class="gray p-4">Nothing to recommend<p>`
  }
}

function initHotSearchBox(box, data) {
  // {data} is array of hot keywords(string)

  function getListItemHtmlString(i, text) {
    return `
      <li>
        <a href="#" class="d-block py-2">
          <strong>${i}</strong> ${text}
        </a>
      </li>`
  }

  function getListPartialHtmlString(data, start, end) {
    let i = start + 1
    return data.slice(start, end).reduce((htmlString, word) => 
      htmlString + getListItemHtmlString(i++, word), '')
  }

  // append hot keywords
  box.innerHTML = `
    <div class="px-4">
      <p>
        <strong class="gray">
          인기 쇼핑 키워드
        </strong>
      </p>
      <ol class="d-flex list-no-style">
        <div class="flex-1">
          ${getListPartialHtmlString(data, 0, 5)}
        </div>
        <div class="flex-1">
          ${getListPartialHtmlString(data, 5, 10)}
        </div>
      </ol>
    </div>`
}

async function inputEventHandler() {
  const keyword = input_search.value.trim() || '';

  // no keyword
  if (!keyword) {
    // show hot search keywords
    htmlElements.search_recommend.classList.add('d-none')
    htmlElements.hot_search.classList.remove('d-none')
    return
  } else {
    // show recommend keywords
    htmlElements.hot_search.classList.add('d-none')
    htmlElements.search_recommend.classList.remove('d-none')
  }

  // fetch and show recommended keywords
  const recommendData = await myFetchPOST('/search/recommend', { keyword })
  initRecommendBox(htmlElements.search_recommend, recommendData)
}

// init search bar
export async function initSearchBar() {
  htmlElements.input_search = findOne('#input_search')
  htmlElements.search_helper = findOne('#search_helper')
  htmlElements.search_recommend = findOne('#search_recommend')
  htmlElements.hot_search = findOne('#hot_search')

  // show suggestion
  htmlElements.input_search.addEventListener('input', inputEventHandler)
  htmlElements.input_search.addEventListener('focus', inputEventHandler)

  // show hot-searched keywords
  const hotSearchedData = await myFetchGET('/search/hot')
  initHotSearchBox(htmlElements.hot_search, hotSearchedData)
}