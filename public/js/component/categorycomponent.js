import {myDomApi} from "../util/mydomapi.js"
import {URL} from "../url.js"

let canChange = true;
let x1, x2, x3, y1, y2, y3, targetPointer="FIRST";
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
  // console.log(depthFirst, depthSecond);
  // console.log(dataObject);
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
        x1 = (firstElement[idx].getBoundingClientRect().left + firstElement[idx].getBoundingClientRect().right)/2;
        y1 = (firstElement[idx].getBoundingClientRect().top + firstElement[idx].getBoundingClientRect().bottom)/2;
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
        x1 = (secondElement[idx].getBoundingClientRect().left + secondElement[idx].getBoundingClientRect().right)/2;
        y1 = (secondElement[idx].getBoundingClientRect().top + secondElement[idx].getBoundingClientRect().bottom)/2;
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

const categoryHover = () => {  
  categoryContainer.addEventListener("mouseover", event => {
    if(event.target.innerHTML !== `` && canChange){
      const targetClassName = event.target.className;
      if(targetClassName===firstClass || targetClassName===firstClickClass || targetClassName===firstBorderClass){
        targetPointer = "FIRST";
        depthFirst = event.target.innerHTML;
        depthSecond = dataObject[depthFirst][0];
        displayCategory();
      }
      else if(targetClassName===secondClass || targetClassName===secondClickClass){
        targetPointer = "SECOND";
        depthSecond = event.target.innerHTML;
        displayCategory();
      }
      else {
        targetPointer = "THIRD";
      }
    }
  })
}

const mouseMove = () => {
  categoryContainer.addEventListener("mousemove", event => {
    let line1 = (y2-y1)/(x2-x1)*(event.clientX-x1)-event.clientY+y1
    let line2 = (y3-y1)/(x3-x1)*(event.clientX-x1)-event.clientY+y1
    let line3 = x2-event.clientX;
    // console.log(line1, line2, line3);
    if(line1<=0 && line2>=0 && line3>=0) canChange = false;
    else canChange = true;
    // console.log(canChange)
  })
}

export {createCategoryContainer}