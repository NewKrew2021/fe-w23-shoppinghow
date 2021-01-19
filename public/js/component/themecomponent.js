import {URL} from "../url.js"
import {myDomApi} from "../util/mydomapi.js"


let [themeData, themeLength] = [ , 5];
const [themeImgCnt, extendCnt, moreBtn] = [5, 5, myDomApi.myQuerySelector("#more")];

const createThemeContainer = () => {
  let themeContainer = myDomApi.myQuerySelector("table.theme-container");
  let newLayout = "<tbody style='display:inline-block'>";
  for(let idx=0; idx<themeImgCnt; idx++) {
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

  let themeImg = myDomApi.myQuerySelectorAll("img.theme-img");
  let themeTitle = myDomApi.myQuerySelectorAll("div.theme-title");
  let themeInfo = myDomApi.myQuerySelectorAll("div.theme-info");

  const request = new Request(URL + "/theme");
  fetch(request)
  .then(response => response.text())
  .then(result => {
    themeData = JSON.parse(result)["items"];
    for(let idx=0; idx<themeImgCnt; idx++){
      themeImg[idx].src = themeData[idx].src;
      themeTitle[idx].innerHTML = themeData[idx].title;
      themeInfo[idx].innerHTML = themeData[idx].subtitle;
    }
  })
  .catch(error => console.log('error', error));
  themeClickListener();
}

const extendLayout = () => {
  let themeContainer = myDomApi.myQuerySelector("table.theme-container");
  let best = myDomApi.myQuerySelector("div.best");
  let newLayout = "<tbody style='display:inline-block'>";
  for(let idx = 0; idx < extendCnt; idx++) {
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
  themeLength += extendCnt;

  let themeImg = myDomApi.myQuerySelectorAll("img.theme-img");
  let themeTitle = myDomApi.myQuerySelectorAll("div.theme-title");
  let themeInfo = myDomApi.myQuerySelectorAll("div.theme-info");
  for(let idx=0; idx<themeLength; idx++){
    themeImg[idx].src = themeData[idx].src;
    themeTitle[idx].innerHTML = themeData[idx].title;
    themeInfo[idx].innerHTML = themeData[idx].subtitle;
  }
  moreBtn.innerHTML = `
      더보기 ( <red>${themeLength/extendCnt}</red> / ${Math.floor(themeData.length/extendCnt)} 건 ) 
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

moreBtn.addEventListener("click", extendLayout);

export {createThemeContainer}