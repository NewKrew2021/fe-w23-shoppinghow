import {URL} from "../url.js"
import {myDomApi} from "../util/MyDomApi.js"
import {HtmlTemplate} from "../util/HtmlTemplate.js"

let [themeData, themeLength] = [ , 5];
const [extendCnt, moreBtn] = [5, myDomApi.myQuerySelector("#more")];

const createThemeContainer = () => {
  createLayout();
  requestThemeItem()
  .then(result => {
    themeData = JSON.parse(result)["items"];
    putThemeItem();
  })
  .then(themeClickListener)
}

async function requestThemeItem() {
  const request = new Request(URL + "/theme");
  const response = await fetch(request);
  const result = await response.text();
  return result;
}

const putThemeItem = () => {
  let themeImg = myDomApi.myQuerySelectorAll("img.theme-img");
  let themeTitle = myDomApi.myQuerySelectorAll("div.theme-title");
  let themeInfo = myDomApi.myQuerySelectorAll("div.theme-info");
  for(let idx=themeLength-extendCnt; idx<themeLength; idx++){
    themeImg[idx].src = themeData[idx].src;
    themeTitle[idx].innerHTML = themeData[idx].title;
    themeInfo[idx].innerHTML = themeData[idx].subtitle;
  }
}

const extendLayout = () => {
  createLayout();
  themeLength += extendCnt;
  putThemeItem();
  moreBtn.innerHTML = 
      HtmlTemplate.themeMoreBtn.front + `${themeLength/extendCnt}` +
      HtmlTemplate.themeMoreBtn.mid + `${Math.floor(themeData.length/extendCnt)}` +
      HtmlTemplate.themeMoreBtn.back;
  
}

const createLayout = () => {
  let themeContainer = myDomApi.myQuerySelector("table.theme-container");
  let newLayout = "<tbody style='display:inline-block'>";
  for(let idx = 0; idx < extendCnt; idx++) {
    newLayout += HtmlTemplate.themeLayout;
  }
  themeContainer.innerHTML += newLayout + HtmlTemplate.themeTbody;
}

const themeClickListener = () => {
  const themeTable = myDomApi.myQuerySelector("table.theme-container");
  themeTable.addEventListener("click", event=> {
    let shoppingList = JSON.parse(localStorage.getItem("shopping"));
    if(shoppingList===null) shoppingList={};
    shoppingList[event.target.src] = "";
    localStorage.removeItem("shopping");
    localStorage.setItem("shopping", JSON.stringify(shoppingList));
  })
}

moreBtn.addEventListener("click", extendLayout);

export {createThemeContainer}