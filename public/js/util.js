// find all nodes that match selector
function find(selector, rootNode = document) {
  return rootNode.querySelectorAll(selector)
}

// find the first node that matches selector
function findOne(selector, rootNode = document) {
  return rootNode.querySelector(selector)
}

// fetch item or item-list from the server
function fetchItems(route, data = {}) {
  // make query-string
  if (Object.keys(data).length) {
    route += '?' + objectToQueryString(data)
  }

  return fetch(`/items${route}`)
    .then(response => response.json())
}

// convert object to query-string
// only support simple object: no array or object as a property
function objectToQueryString(obj) {
  return Object
    .keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')
}