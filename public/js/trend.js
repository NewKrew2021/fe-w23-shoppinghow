import {myDomApi} from "./myDomApi.js"

let trendFirstIndex = 0;

let clickStartTime;
let isMouseUp = false;
const prevBtn = myDomApi.myQuerySelector("#trendPrev");
const nextBtn = myDomApi.myQuerySelector("#trendNext");

prevBtn.addEventListener("mousedown", () => {
  clickStartTime = new Date();
  const checkPrevClick = setInterval((clickStartTime => {
    if(isMouseUp) {
      clearInterval(checkPrevClick);
      setTimeout(()=>isMouseUp=false, 2000);
    }
    else changeImg(trendFirstIndex += -2);
  }),2000);
});

prevBtn.addEventListener("mouseup", () => {
  const clickTime = new Date() - clickStartTime;
  isMouseUp = true;
  if(clickTime < 2000) changeImg(trendFirstIndex += -1);
});

nextBtn.addEventListener("mousedown", () => {
  clickStartTime = new Date();
  const checkPrevClick = setInterval((clickStartTime => {
    if(isMouseUp) {
      clearInterval(checkPrevClick);
      setTimeout(()=>isMouseUp=false, 2000);
    }
    else changeImg(trendFirstIndex += 2);
  }),2000);
});

nextBtn.addEventListener("mouseup", () => {
  const clickTime = new Date() - clickStartTime;
  isMouseUp = true;
  if(clickTime < 2000) changeImg(trendFirstIndex += 1);
});

const changeImg = curImg => {
  const imgs = myDomApi.myQuerySelectorAll("th.trend");
  const imgsLength = imgs.length;
  imgs.forEach( img => img.className = "trend non-display");
  if (curImg > imgs.length) trendFirstIndex = 1;
  if (curImg < 1) trendFirstIndex = imgsLength-1;
  let idx=trendFirstIndex;
  for(let cnt=0; cnt<5; cnt++){
    if(idx>imgsLength-1) idx=0;
    imgs[idx].className = "trend fade";
    idx += 1;
  }
}
