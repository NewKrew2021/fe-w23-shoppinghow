import { findOne, myFetchPOST } from "../util"

function initRecommendBox(box, data) {
  // {data} is array of recommended keywords(string)

  let htmlString = ''

  if (data.length > 0) {
    // open list
    htmlString += `<ul class="list-no-style">`

    // append list items
    htmlString += data.reduce((htmlString, word) => htmlString + `
      <li>
        <a href="#" class="d-block hover-bg-bright px-4 py-2 text-small">
          ${word}
        </a>
      </li>
    `, '')

    // close list
    htmlString += `</ul>`
  } else {
    // no data
    htmlString += `<p class="gray p-4">Nothing to recommend<p>`
  }

  box.innerHTML = htmlString 
}

// init search bar
export function initSearchBar() {
  const input_search = findOne('#input_search')
  const search_helper = findOne('#search_helper')
  const search_recommend = findOne('#search_recommend')
  const hot_search = findOne('#hot_search')

  input_search.addEventListener('input', async (e) => {
    const keyword = input_search.value.trim() || '';

    // handle exception: no keyword
    if (!keyword) {
      return
    }

    // fetch and show recommended keywords
    const recommendData = await myFetchPOST('/search/recommend', { keyword })
    initRecommendBox(search_recommend, recommendData)
  })
}