import {myDomApi} from "../util/MyDomApi.js"
import {MyPromise} from "../util/MyPromise.js"
import {HtmlTemplate} from "../util/HtmlTemplate.js"
import {URL} from "../url.js"

let [trendFirstIndex, isMouseUp, clickStartTime, trendData] = [0, false];
const [changeTime, trendImgCnt] = [2000, 5];
const prevBtn = myDomApi.myQuerySelector("#trendPrev");
const nextBtn = myDomApi.myQuerySelector("#trendNext");

const mySetTimeout = new MyPromise((resolve, reject) => {
  setTimeout(resolve, changeTime);
});

const createTrendContainer = () => {
  let trendContainer = myDomApi.myQuerySelector("table.trend-container");
  let newLayout = "";
  trendContainer.innerHTML += HtmlTemplate.trendTitle;
  for(let idx=0; idx<trendImgCnt; idx++) {
    newLayout += HtmlTemplate.trendLayout;
  }
  trendContainer.innerHTML += newLayout;
  requestTrendItem()
  .then(result => {
    trendData = JSON.parse(result)["items"];
    putTrendItem();
  })
  .then(trendClickListener)
}

async function requestTrendItem() {
  const request = new Request(URL + "/trend");
  const response = await fetch(request);
  const result = await response.text();
  return result;
}

const putTrendItem = () => {
  let trendImg = myDomApi.myQuerySelectorAll("img.trend-img");
  let trendTitle = myDomApi.myQuerySelectorAll("div.trend-title");
  let trendInfo = myDomApi.myQuerySelectorAll("div.trend-info");
  for(let idx=0; idx<trendImgCnt; idx++){
    trendImg[idx].src = trendData[idx].src;
    trendTitle[idx].innerHTML = trendData[idx].title;
    trendInfo[idx].innerHTML = trendData[idx].subtitle;
  }
}

prevBtn.addEventListener("mousedown", () => {
  clickStartTime = new Date();
  isMouseUp = false;
  const checkPrevClick = setTimeout((clickStartTime => {
    if(isMouseUp===false) changeImg(trendFirstIndex += -2);
  }),changeTime);
});

prevBtn.addEventListener("mouseup", () => {
  const clickTime = new Date() - clickStartTime;
  isMouseUp = true;
  if(clickTime < changeTime) changeImg(trendFirstIndex += -1);
});

nextBtn.addEventListener("mousedown", () => {
  clickStartTime = new Date();
  isMouseUp = false;
  const checkNextClick = setTimeout((clickStartTime => {
    if(isMouseUp===false) changeImg(trendFirstIndex += 2);
  }),changeTime);
});

nextBtn.addEventListener("mouseup", () => {
  const clickTime = new Date() - clickStartTime;
  isMouseUp = true;
  if(clickTime < changeTime) changeImg(trendFirstIndex += 1);
});

const changeImg = curImg => {
  let trendImg = myDomApi.myQuerySelectorAll("img.trend-img");
  const imgsLength = trendData.length;
  if (curImg >= imgsLength) trendFirstIndex = 0;
  if (curImg < 0) trendFirstIndex = imgsLength-1;
  let trendIdx = trendFirstIndex;
  for(let idx=0; idx<trendImgCnt; idx++){
    trendImg[idx].src = trendData[trendIdx].src;
    trendIdx+=1;
    if (trendIdx >= imgsLength) trendIdx = 0;
    if (trendIdx < 0) trendIdx = imgsLength-1;
  }
}

const trendClickListener = () => {  
  const trendTable = myDomApi.myQuerySelector("table.trend-container");
  trendTable.addEventListener("click", event=> {
    let shoppingList = JSON.parse(localStorage.getItem("shopping"));
    if(shoppingList===null) shoppingList={};
    shoppingList[event.target.src] = "";
    localStorage.removeItem("shopping");
    localStorage.setItem("shopping", JSON.stringify(shoppingList));
  })
}

export {createTrendContainer};