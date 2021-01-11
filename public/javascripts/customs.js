const _getElementById = (currentElement, id) => {
  if (currentElement.id === id) return currentElement;

  for (let childElement of currentElement.children) {
    const searchResult = _getElementById(childElement, id);
    if (searchResult !== null) return searchResult;
  }

  return null;
};

const _getElementByClassName = (currentElement, className) => {
  if (currentElement.className === className) return currentElement;

  for (let childElement of currentElement.children) {
    const searchResult = _getElementByClassName(childElement, className);
    if (searchResult !== null) return searchResult;
  }

  return null;
};

const _getElementByTagName = (currentElement, tagName) => {
  if (currentElement.tagName.toLowerCase() === tagName) return currentElement;

  for (let childElement of currentElement.children) {
    const searchResult = _getElementByTagName(childElement, tagName);
    if (searchResult !== null) return searchResult;
  }

  return null;
};

const _querySelector = (parent = document.body, target) => {
  let getElementFunc;
  let selector;
  switch (target[0]) {
    case '.':
      getElementFunc = _getElementByClassName;
      selector = target.substr(1);
      break;
    case '#':
      getElementFunc = _getElementById;
      selector = target.substr(1);
      break;
    default:
      getElementFunc = _getElementByTagName;
      selector = target;
  }
  console.log(selector);

  for (let childElement of parent.children) {
    const searchResult = getElementFunc(childElement, selector);
    if (searchResult !== null) return searchResult;
  }
  return null;
};

export { _querySelector };
