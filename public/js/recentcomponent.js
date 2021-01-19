import {myDomApi} from "./mydomapi.js"

const recentBtn = myDomApi.myQuerySelector("button.category-recent");
const popupLayer = myDomApi.myQuerySelector("div.recent-container");

const displayRecentContainer = () => popupLayer.className = "recent-container display";
const nonDisplayRecentContainer = () => popupLayer.className = "recent-container non-display";

recentBtn.addEventListener("mouseover", displayRecentContainer);
popupLayer.addEventListener("mouseover", displayRecentContainer);
recentBtn.addEventListener("mouseout", nonDisplayRecentContainer);
popupLayer.addEventListener("mouseout", nonDisplayRecentContainer);