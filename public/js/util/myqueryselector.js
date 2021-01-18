// find some matched elements
function findElements(selector, findAll) {
  const elements = []
  const visitingStack = [document.documentElement]

  // use DFS to find elements
  // start from <html>
  while (visitingStack.length) {
    const nowElement = visitingStack.pop()

    // check the element
    if (nowElement.matches(selector)) {
      if (findAll) {
        // let's find more
        elements.push(nowElement)
      } else {
        // found the first one and it's the end
        return nowElement
      }
    }

    // visit children
    Array
      .from(nowElement.children)
      .reduceRight((_, childElement) => {
        visitingStack.push(childElement)
      }, undefined)
  }

  return elements
}

// find the first node that matches selector
// return element or null
export function findOne(selector) {
  return findElements(selector, false)
}
export { findOne as myQuerySelector }

// find all nodes that match selector
// return array of element (not a NodeList!)
export function find(selector) {
  return findElements(selector, true)
}
export { find as myQuerySelectorAll }