import {myDomApi} from "./myDomApi.js"

let trandFirstIndex = 0;

let clickStartTime;
let isMouseUp = false;
const prevBtn = myDomApi.myQuerySelector("#trandPrev");
const nextBtn = myDomApi.myQuerySelector("#trandNext");

prevBtn.addEventListener("mousedown", () => {
  clickStartTime = new Date();
  const checkPrevClick = setInterval((clickStartTime => {
    if(isMouseUp) {
      clearInterval(checkPrevClick);
      setTimeout(()=>isMouseUp=false, 2000);
    }
    else changeImg(trandFirstIndex += -2);
  }),2000);
});

prevBtn.addEventListener("mouseup", () => {
  const clickTime = new Date() - clickStartTime;
  isMouseUp = true;
  if(clickTime < 2000) changeImg(trandFirstIndex += -1);
});

nextBtn.addEventListener("mousedown", () => {
  clickStartTime = new Date();
  const checkPrevClick = setInterval((clickStartTime => {
    if(isMouseUp) {
      clearInterval(checkPrevClick);
      setTimeout(()=>isMouseUp=false, 2000);
    }
    else changeImg(trandFirstIndex += 2);
  }),2000);
});

nextBtn.addEventListener("mouseup", () => {
  const clickTime = new Date() - clickStartTime;
  isMouseUp = true;
  if(clickTime < 2000) changeImg(trandFirstIndex += 1);
});

const changeImg = curImg => {
  const imgs = myDomApi.myQuerySelectorAll("th.trand");
  const imgsLength = imgs.length;
  imgs.forEach( img => img.className = "trand non-display");
  if (curImg > imgs.length) trandFirstIndex = 1;
  if (curImg < 1) trandFirstIndex = imgsLength-1;
  let idx=trandFirstIndex;
  for(let cnt=0; cnt<5; cnt++){
    if(idx>imgsLength-1) idx=0;
    imgs[idx].className = "trand fade";
    idx += 1;
  }
}
