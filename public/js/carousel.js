import {myDomApi} from "./myDomApi.js"
import {carouselImgCnt} from "./index.js"

let carouselIndex = 0;

const carouselCycleTime = 3000; // ms
const prevBtn = myDomApi.myQuerySelector("#carouselPrev");
const nextBtn = myDomApi.myQuerySelector("#carouselNext");
const dotBtns = myDomApi.myQuerySelectorAll("span.dot");

prevBtn.addEventListener("click", () => {
  changeImg(carouselIndex += -1);
});
nextBtn.addEventListener("click", () => {
  changeImg(carouselIndex += 1);
});

dotBtns.forEach( btn => {
  btn.addEventListener("mouseover", () => {
    carouselIndex = Number(btn.id[carouselImgCnt])-1;
    changeImg(carouselIndex += 1);
  });
});

const displayDot = "dot";
const nonDisplayDot = "dot active";
const displayCarouselClass = "carousel fade display";
const nonDisplayCarouselClass= "carousel fade non-display";

const changeImg = curImg => {
  const imgs = myDomApi.myQuerySelectorAll("div.carousel");
  const dots = myDomApi.myQuerySelectorAll("span.dot");
  imgs.forEach( img => img.className = nonDisplayCarouselClass);
  dots.forEach( dot => dot.className = displayDot);
  if (curImg > imgs.length) carouselIndex = 1;
  if (curImg < 1) carouselIndex = imgs.length;
  imgs[carouselIndex-1].className = displayCarouselClass;
  dots[carouselIndex-1].className = nonDisplayDot;
}

const showImgs = () => {
  const imgs = myDomApi.myQuerySelectorAll("div.carousel");
  const dots = myDomApi.myQuerySelectorAll("span.dot");
  imgs.forEach( img => img.className = nonDisplayCarouselClass);
  dots.forEach( dot => dot.className = displayDot);
  carouselIndex++;
  if (carouselIndex > imgs.length) carouselIndex = 1;
  imgs[carouselIndex-1].className = displayCarouselClass;
  dots[carouselIndex-1].className = nonDisplayDot;
  setTimeout(showImgs, carouselCycleTime);
}

export {showImgs};
