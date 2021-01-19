import {myDomApi} from "../util/mydomapi.js"

const categoryBtn = myDomApi.myQuerySelector("button.layer-btn");
console.log(categoryBtn)
const menuLayer = myDomApi.myQuerySelector("div.category-layer");

const displayCategoryContainer = () => menuLayer.className = "category-layer display";
const nonDisplayCategoryContainer = () => menuLayer.className = "category-layer non-display";

categoryBtn.addEventListener("mouseover", displayCategoryContainer);
menuLayer.addEventListener("mouseover", displayCategoryContainer);
categoryBtn.addEventListener("mouseout", nonDisplayCategoryContainer);
menuLayer.addEventListener("mouseout", nonDisplayCategoryContainer);

const createCategoryContainer = () => {
  let categoryContainer = myDomApi.myQuerySelector("div.category-layer");
  


  // let categoryContainer = myDomApi.myQuerySelector("div.img-container");
  // let shoppingList = JSON.parse(localStorage.getItem("shopping"));
  // if(shoppingList !== null) {
  //   let imgList = Object.keys(shoppingList);
  //   for(let idx=0; idx<Math.min(9, imgList.length); idx++){
  //     categoryContainer.innerHTML += `<img class="category-img" src="${imgList[idx]}"></img>`
  //   }
  // } 
}

export {createCategoryContainer}