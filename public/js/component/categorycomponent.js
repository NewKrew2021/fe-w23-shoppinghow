import {myDomApi} from "../util/mydomapi.js"
import {URL} from "../url.js"

let [depthIdxFirst, depthIdxSecond] = [0, 0];
let categoryData, categoryFirst, categorySecond, categoryThird;

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
  .then(result => {
    categoryData = JSON.parse(result)["data"];
    displayCategory();
  })
  .catch(error => console.log('error', error));
}

const displayCategory = () => {
  const categoryDataLen = [
    categoryData.length,
    categoryData[depthIdxFirst].data.length,
    categoryData[depthIdxFirst].data[depthIdxSecond].data.length
  ]
  for(let idx=0; idx<categoryDataLen[0]; idx++) {
    if(depthIdxFirst===idx) categoryFirst.innerHTML += `<div class="category-first category-first-click">${categoryData[idx].title}</div>`;
    else categoryFirst.innerHTML += `<div class="category-first">${categoryData[idx].title}</div>`;
  }
  for(let idx=0; idx<categoryDataLen[1]; idx++) {
    if(depthIdxSecond===idx) categorySecond.innerHTML += `<div class="category-second category-second-click">${categoryData[depthIdxFirst].data[idx].title}</div>`
    else categorySecond.innerHTML += `<div class="category-second">${categoryData[depthIdxFirst].data[idx].title}</div>`
  }
  for(let idx=0; idx<categoryDataLen[2]; idx++) {
    categoryThird.innerHTML += `<div class="category-second">${categoryData[depthIdxFirst].data[depthIdxSecond].data[idx].title}</div>`
  }
}

const categoryHover = () => {
  // categoryContainer.addEventListener("onclick", event => {
  //   console.log(event.target);
  //   if(event.target.class==="category-first"){
  //     for(let idx=0; idx<categoryDataLen[0]; idx++) {
  //       // if(event.target.class===) 
  //     }
  //   }
  //   else{

  //   }
  // })
}

export {createCategoryContainer}