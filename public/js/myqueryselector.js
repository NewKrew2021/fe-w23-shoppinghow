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

// return element or null
function myQuerySelector(selector) {
  return findElements(selector, false)
}

// return array of element (not a NodeList!)
function myQuerySelectorAll(selector) {
  return findElements(selector, true)
}
