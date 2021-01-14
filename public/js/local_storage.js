const STORAGE_KEY_RECENT = 'RECENT'
const STORAGE_INIT_VALUE_RECENT = JSON.stringify([])

// initialize the recent viewed item list
function initRecent() {
  localStorage.setItem(STORAGE_KEY_RECENT, STORAGE_INIT_VALUE_RECENT)
}

// load the list
function loadRecent() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_RECENT) || STORAGE_INIT_VALUE_RECENT)
}

// add a new item into the list
function saveRecent(data) {
  const { href, src } = data
  const nowItem = JSON.stringify({ href, src })
  const newRecent = [nowItem].concat(loadRecent().filter(item => item != nowItem))

  // save the new list
  localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(newRecent))
}