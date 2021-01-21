import {myDomApi} from "../util/MyDomApi.js"
import {URL} from "../url.js"

let canChange = true;
let x1, x2, x3, y1, y2, y3, x4, y4, targetPointer="FIRST", curEvent;
let [numOfFirst, numOfSecond, numOfThird] = [10, 15, 15];
let depthFirst, depthSecond, categoryData, categoryFirst, categorySecond, categoryThird, dataObject = {};

let firstClass = "category-first";
let firstClickClass = "category-first category-first-click";
let firstBorderClass = "category-first category-first-border";
let secondClass = "category-second";
let secondClickClass = "category-second category-second-click";
let thirdClass = "category-third";

let categoryContainer = myDomApi.myQuerySelector("div.category-layer");
let categoryImage = myDomApi.myQuerySelector("img.category-img");
const categoryBtn = myDomApi.myQuerySelector("button.layer-btn");
const menuLayer = myDomApi.myQuerySelector("div.category-layer");


const displayCategoryContainer = () => {
  menuLayer.className = "category-layer display";
  categoryImage.src = "/img/categoryBtn2.png";
}
const nonDisplayCategoryContainer = () => {
  menuLayer.className = "category-layer non-display";
  categoryImage.src = "/img/categoryBtn1.png";
}

categoryBtn.addEventListener("mouseover", displayCategoryContainer);
menuLayer.addEventListener("mouseover", displayCategoryContainer);
categoryBtn.addEventListener("mouseout", nonDisplayCategoryContainer);
menuLayer.addEventListener("mouseout", nonDisplayCategoryContainer);

const createCategoryContainer = () => {
  categoryContainer.innerHTML = `
          <div class="category-depth depth-1"></div>
          <div class="category-depth depth-2"></div>
          <div class="category-depth depth-3"></div>
        `
  categoryFirst = myDomApi.myQuerySelector("div.depth-1");
  categorySecond = myDomApi.myQuerySelector("div.depth-2");
  categoryThird = myDomApi.myQuerySelector("div.depth-3");
  for(let idx=0; idx<numOfFirst; idx++){
    categoryFirst.innerHTML += `<div class="${firstClass}"></div>`;
  }
  for(let idx=0; idx<numOfSecond; idx++){
    categorySecond.innerHTML += `<div class="${secondClass}"></div>`;
    categoryThird.innerHTML += `<div class="${thirdClass}"></div>`;
  }
  requestCategoryItem();
  categoryHover();
  mouseMove();
}

const requestCategoryItem = () => {
  const request = new Request(URL + "/category");
  fetch(request)
  .then(response => response.text())
  .then(result => makeDataObject(result))
  .then(displayCategory)
  .catch(error => console.log('error', error));
}


const makeDataObject = (result) => {
  categoryData = JSON.parse(result)["data"];
  let firstList = [];
  for(let first=0; first<categoryData.length; first++) {
    let secondList = [];
    for(let second=0; second<categoryData[first].data.length; second++) {
      let ThirdList = [];
      for(let third=0; third<categoryData[first].data[second].data.length; third++) {
        ThirdList.push(categoryData[first].data[second].data[third].title)
      }
      secondList.push(categoryData[first].data[second].title)
      dataObject[categoryData[first].data[second].title] = ThirdList;
    }
    firstList.push(categoryData[first].title);
    dataObject[categoryData[first].title]=secondList;
  }
  dataObject["root"] = firstList;
  depthFirst = categoryData[0].title;
  depthSecond = categoryData[0].data[0].title;
}

const displayCategory = () => {
  const firstElement = myDomApi.myQuerySelectorAll("div.category-first");
  const secondElement = myDomApi.myQuerySelectorAll("div.category-second");
  const thirdElement = myDomApi.myQuerySelectorAll("div.category-third");
  for(let idx=0; idx<numOfFirst; idx++) {
    if(depthFirst === dataObject["root"][idx]){
      if(depthFirst === dataObject["root"][0]) firstElement[idx].className = firstBorderClass;
      else firstElement[idx].className = firstClickClass;
      if(targetPointer === "FIRST") {
        y1 = firstElement[idx].getBoundingClientRect().top;
        y4 = firstElement[idx].getBoundingClientRect().bottom;
      }
    }
    else firstElement[idx].className = firstClass;
    if(dataObject["root"][idx] === undefined) firstElement[idx].innerHTML=``;
    else firstElement[idx].innerHTML = dataObject["root"][idx];
  }
  for(let idx=0; idx<numOfSecond; idx++) {
    if(depthSecond === dataObject[depthFirst][idx]) {
      secondElement[idx].className = secondClickClass;
      if(targetPointer === "SECOND") {
        y1 = secondElement[idx].getBoundingClientRect().top;
        y4 = secondElement[idx].getBoundingClientRect().bottom;
      }
    }
    else secondElement[idx].className = secondClass;
    if(dataObject[depthFirst][idx] === undefined) secondElement[idx].innerHTML=``;
    else {
      secondElement[idx].innerHTML = dataObject[depthFirst][idx];
      if(targetPointer === "FIRST") {
        if(idx===0) {
          x2 = secondElement[idx].getBoundingClientRect().x;
          y2 = secondElement[idx].getBoundingClientRect().y;
        }
        else {
          x3 = secondElement[idx].getBoundingClientRect().x;
          y3 = secondElement[idx].getBoundingClientRect().bottom;
        }
      }
    }
  }
  for(let idx=0; idx<numOfThird; idx++) {
    thirdElement[idx].className = thirdClass;
    if(dataObject[depthSecond][idx] === undefined) thirdElement[idx].innerHTML=``;
    else {
      thirdElement[idx].innerHTML = dataObject[depthSecond][idx];
      if(targetPointer === "SECOND") {
        if(idx===0) {
          x2 = thirdElement[idx].getBoundingClientRect().x;
          y2 = thirdElement[idx].getBoundingClientRect().y;
        }
        else {
          x3 = thirdElement[idx].getBoundingClientRect().x;
          y3 = thirdElement[idx].getBoundingClientRect().bottom;
        }
      }
    }
  }
}

const setTargetPointer = (target) => {
  if(target.className===firstClass || target.className===firstClickClass || target.className===firstBorderClass){
    targetPointer = "FIRST";
    depthFirst = target.innerHTML;
    depthSecond = dataObject[depthFirst][0];
    displayCategory();
  }
  else if(target.className===secondClass || target.className===secondClickClass){
    targetPointer = "SECOND";
    depthSecond = target.innerHTML;
    displayCategory();
  }
  else targetPointer = "THIRD";
}

const categoryHover = () => {  
  categoryContainer.addEventListener("mouseover", event => {
    if(event.target.innerHTML === ``) return;
    if(canChange) {
      x1 = x4 = event.clientX;
      setTargetPointer(event.target)
    }
    isStay(event);
  })
}

const isStay = (prevEvent) => {
  setTimeout(()=>{
    if(curEvent.target === prevEvent.target) {
      x1 = x4 = curEvent.clientX;
      setTargetPointer(curEvent.target)
    }
  }, 250);
}

const mouseMove = () => {
  categoryContainer.addEventListener("mousemove", event => {
    curEvent = event;
    let line1 = (y2-y1)/(x2-x1)*(event.clientX-x1)-event.clientY+y1
    let line2 = (y3-y4)/(x3-x4)*(event.clientX-x4)-event.clientY+y4
    let line3 = x2-event.clientX;
    let line4 = x4-event.clientX;
    
    if(line1<=0 && line2>=0 && line3>=0 && line4<=0) canChange = false;
    else {
      if(canChange === false) {
        x1 = x4 = event.clientX;
        setTargetPointer(event.target);
      }
      canChange = true;
    } 
  })
}

export {createCategoryContainer}