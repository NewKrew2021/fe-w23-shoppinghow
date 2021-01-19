import {myDomApi} from "./mydomapi.js"
import {trendData, trendImgCnt} from "./index.js"
import {MyPromise} from "./mypromise.js"

let trendFirstIndex = 0;
let clickStartTime;
let isMouseUp = false;
const changTime = 2000; //ms
const prevBtn = myDomApi.myQuerySelector("#trendPrev");
const nextBtn = myDomApi.myQuerySelector("#trendNext");

const mySetTimeout = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve(), changTime);
});

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

export {trendClickListener};