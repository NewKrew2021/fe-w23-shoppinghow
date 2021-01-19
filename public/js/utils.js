import { _querySelector } from './customs.js';

const _$ = (target, parent = document) => {
  return _querySelector(parent, target);
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

const _addBubbledEventListener = (
  eventType,
  eventDelegatedElement,
  selector,
  callback
) => {
  eventDelegatedElement.addEventListener(eventType, event => {
    if (event.taget === selector) callback(event);
  });
};

const getIndexFromParent = element => {
  let elementIndex = 0;

  while (element !== null && element.previousSibling !== null) {
    element = element.previousSibling;
    elementIndex += 1;
  }

  return elementIndex;
};

export {
  _$,
  $,
  createNewElement,
  deleteClassFromElement,
  _addBubbledEventListener,
  getIndexFromParent,
};
