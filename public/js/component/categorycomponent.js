import {myDomApi} from "../util/mydomapi.js"
import {URL} from "../url.js"

let depthFirst, depthSecond, categoryData, categoryFirst, categorySecond, categoryThird, dataObject = {};

let firstClass = "category-first";
let firstClickClass = "category-first category-first-click";
let firstBorderClass = "category-first category-first-border";
let secondClass = "category-second";
let secondClickClass = "category-second category-second-click";
let thirdClass = "category-third";

let categoryContainer = myDomApi.myQuerySelector("div.category-layer");
const categoryBtn = myDomApi.myQuerySelector("button.layer-btn");
const menuLayer = myDomApi.myQuerySelector("div.category-layer");
const displayCategoryContainer = () => menuLayer.className = "category-layer display";
const nonDisplayCategoryContainer = () => menuLayer.className = "category-layer non-display";

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
  requestCategoryItem();
  categoryHover();
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
  console.log(depthFirst, depthSecond)
  let [newHtmlFirst, newHtmlSecond, newHtmlThird]=[``, ``, ``];
  Array.prototype.forEach.call(dataObject["root"], data => {
    if(depthFirst===data) {
      if(data === dataObject["root"][0]) newHtmlFirst += `<div class="${firstBorderClass}">${data}</div>`;
      else newHtmlFirst += `<div class="${firstClickClass}">${data}</div>`;
    }
    else newHtmlFirst += `<div class="${firstClass}">${data}</div>`;
  })
  Array.prototype.forEach.call(dataObject[depthFirst], data => {
    if(depthSecond===data) newHtmlSecond += `<div class="${secondClickClass}">${data}</div>`
    else newHtmlSecond += `<div class="${secondClass}">${data}</div>`
  })
  Array.prototype.forEach.call(dataObject[depthSecond], data => {
    newHtmlThird += `<div class="${thirdClass}">${data}</div>`;
  })
  categoryFirst.innerHTML = newHtmlFirst;
  categorySecond.innerHTML = newHtmlSecond;
  categoryThird.innerHTML = newHtmlThird;
}

const categoryHover = () => {
  categoryContainer.addEventListener("mouseover", event => {
    const targetClassName = event.target.className;
    if(targetClassName===firstClass || targetClassName===firstClickClass || targetClassName===firstBorderClass){
      depthFirst = event.target.innerHTML;
      depthSecond = dataObject[depthFirst][0];
      displayCategory();
    }
    else if(targetClassName===secondClass || targetClassName===secondClickClass){
      depthSecond = event.target.innerHTML;
      displayCategory();
    }
    else {
    }
    
  })
}

export {createCategoryContainer}