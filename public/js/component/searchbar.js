import { findOne, myFetchPOST } from "../util"

// init search bar
export function initSearchBar() {
  const input_search = findOne('#input_search')
  const search_helper = findOne('#search_helper')
  const search_recommend = findOne('#search_recommend')
  const hot_search = findOne('#hot_search')

  input_search.addEventListener('input', (e) => {
    const keyword = input_search.value.trim() || '';

    // handle exception: no keyword
    if (!keyword) {
      return
    }

    // fetch recommended keywords
    myFetchPOST('/search/recommend', { keyword })
    .then(console.log)
    .catch(console.log)
  })
}