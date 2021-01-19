import {myDomApi} from "../util/mydomapi.js"
import {URL} from "../url.js"
import {MyPromise} from "../util/mypromise.js"

let trendFirstIndex = 0;
let clickStartTime, trendData;
let isMouseUp = false;
const changTime = 2000; //ms
const trendImgCnt = 5;
const prevBtn = myDomApi.myQuerySelector("#trendPrev");
const nextBtn = myDomApi.myQuerySelector("#trendNext");

const mySetTimeout = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve(), changTime);
});

const createTrendContainer = () => {
  let trendContainer = myDomApi.myQuerySelector("table.trend-container");
  let newLayout = "";
  trendContainer.innerHTML += `<caption class="trend-caption">지금 뜨는 테마 카테고리</caption>`;
  for(let idx=0; idx<trendImgCnt; idx++) {
    newLayout += `
      <th class="trend">
        <img class="trend-img"">
        <div class="trend-title"></div>
        <div class="trend-info"></div>
        <img class="trend-icon" src="img/themeIcon.png"></img>
      </th>
    `
  }
  trendContainer.innerHTML += newLayout;

  let trendImg = myDomApi.myQuerySelectorAll("img.trend-img");
  let trendTitle = myDomApi.myQuerySelectorAll("div.trend-title");
  let trendInfo = myDomApi.myQuerySelectorAll("div.trend-info");

  const request = new Request(URL + "/trend");
  fetch(request)
  .then(response => response.text())
  .then(result => {
    trendData = JSON.parse(result)["items"]
    for(let idx=0; idx<trendImgCnt; idx++){
      trendImg[idx].src = trendData[idx].src;
      trendTitle[idx].innerHTML = trendData[idx].title;
      trendInfo[idx].innerHTML = trendData[idx].subtitle;
    }
  })
  .catch(error => console.log('error', error));
  trendClickListener();
}

prevBtn.addEventListener("mousedown", () => {
  clickStartTime = new Date();
  const checkPrevClick = setInterval((clickStartTime => {
    if(isMouseUp) {
      clearInterval(checkPrevClick);
      mySetTimeout
      .then(() => isMouseUp=false)
      .catch(error => console.log(error));
    }
    else changeImg(trendFirstIndex += -2);
  }),changTime);
});

prevBtn.addEventListener("mouseup", () => {
  const clickTime = new Date() - clickStartTime;
  isMouseUp = true;
  if(clickTime < changTime) changeImg(trendFirstIndex += -1);
});

nextBtn.addEventListener("mousedown", () => {
  clickStartTime = new Date();
  const checkPrevClick = setInterval((clickStartTime => {
    if(isMouseUp) {
      clearInterval(checkPrevClick);
      mySetTimeout
      .then(() => isMouseUp=false)
      .catch(error => console.log(error));
    }
    else changeImg(trendFirstIndex += 2);
  }),changTime);
});

nextBtn.addEventListener("mouseup", () => {
  const clickTime = new Date() - clickStartTime;
  isMouseUp = true;
  if(clickTime < changTime) changeImg(trendFirstIndex += 1);
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
  const trendImgList = myDomApi.myQuerySelectorAll("img.trend-img");
  trendImgList.forEach( trendImg => {
    trendImg.addEventListener("click", () => {
      let shoppingList = JSON.parse(localStorage.getItem("shopping"));
      shoppingList[trendImg.src] = "";
      localStorage.removeItem("shopping");
      localStorage.setItem("shopping", JSON.stringify(shoppingList));
    });
  });
}

export {createTrendContainer};