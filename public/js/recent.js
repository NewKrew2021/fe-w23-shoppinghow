import {myDomApi} from "./myDomApi.js"

const recentBtn = myDomApi.myQuerySelector("button.category-recent");
const popupLayer = myDomApi.myQuerySelector("div.recent-container");

recentBtn.addEventListener("mouseover", ()=>{
  popupLayer.className = "recent-container display";
});

popupLayer.addEventListener("mouseover", ()=>{
  popupLayer.className = "recent-container display";
});

recentBtn.addEventListener("mouseout", ()=>{
  popupLayer.className = "recent-container non-display";
});

popupLayer.addEventListener("mouseout", ()=>{
  popupLayer.className = "recent-container non-display";
});