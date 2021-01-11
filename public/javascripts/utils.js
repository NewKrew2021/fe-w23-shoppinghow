const customQuerySelector = (currentElement = document.body, target) => {
  switch (target[0]) {
    case '.':
      console.log(currentElement.className);
      if (currentElement.className === target.substr(1)) return currentElement;
      break;
    case '#':
      console.log(currentElement.id);
      if (currentElement.id === target.substr(1)) return currentElement;
      break;
    default:
      console.log(currentElement.tagName);
      if (currentElement.tagName.toLowerCase() === target)
        return currentElement;
  }
  for (let childElement of currentElement.children) {
    const searchResult = customQuerySelector(childElement, target);
    if (searchResult !== null) return searchResult;
  }
  return null;
};

const $ = (target, parent = document) => {
  return parent.querySelector(target);
};

const createNewElement = (tag, className, innerText) => {
  const newElement = document.createElement(tag);
  newElement.className = className;
  newElement.innerText = innerText;
  return newElement;
};

const deleteClassFromElement = (element, className) => {
  element.classList.remove(className);
};

export { $, createNewElement, deleteClassFromElement };
