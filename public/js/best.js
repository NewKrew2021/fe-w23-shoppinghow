import {myDomApi} from "./myDomApi.js"
import {themeData} from "./index.js"

const moreBtn = myDomApi.myQuerySelector("#more");

let themeLength = 5;

moreBtn.addEventListener("click", extendLayout);

const extendLayout = () => {
  let themeContainer = myDomApi.myQuerySelector("table.theme-container");
  let best = myDomApi.myQuerySelector("div.best");
  let newLayout = "<tbody style='display:inline-block'>";
  for(let idx=0; idx<5; idx++) {
    newLayout += `
      <th class="theme">
        <img class="theme-img">
        <div class="theme-title"></div>
        <div class="theme-info"></div>
        <img class="theme-icon" src="img/themeIcon.png"></img>
      </th>
    `
  }
  themeContainer.innerHTML += newLayout + "</tbody>";
  themeLength += 5;

  let themeImg = myDomApi.myQuerySelectorAll("img.theme-img");
  let themeTitle = myDomApi.myQuerySelectorAll("div.theme-title");
  let themeInfo = myDomApi.myQuerySelectorAll("div.theme-info");
  for(let idx=0; idx<themeLength; idx++){
    themeImg[idx].src = themeData[idx].src;
    themeTitle[idx].innerHTML = themeData[idx].title;
    themeInfo[idx].innerHTML = themeData[idx].subtitle;
  }
  moreBtn.innerHTML = `
      더보기 ( <red>${themeLength/5}</red> / ${Math.floor(themeData.length/5)} 건 ) 
  `
}

const themeClickListener = () => {
  const themeImgList = myDomApi.myQuerySelectorAll("img.theme-img");
  themeImgList.forEach( themeImg => {
    themeImg.addEventListener("click", () => {
      let shoppingList = JSON.parse(localStorage.getItem("shopping"));
      shoppingList[themeImg.src] = "";
      localStorage.removeItem("shopping");
      localStorage.setItem("shopping", JSON.stringify(shoppingList));
    });
  });
}

export {themeClickListener};