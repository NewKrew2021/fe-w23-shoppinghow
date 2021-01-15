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

const changeImg = curImg => {
  const imgs = myDomApi.myQuerySelectorAll("div.carousel");
  const dots = myDomApi.myQuerySelectorAll("span.dot");
  imgs.forEach( img => img.className = "carousel fade non-display");
  dots.forEach( dot => dot.className = "dot");
  if (curImg > imgs.length) carouselIndex = 1;
  if (curImg < 1) carouselIndex = imgs.length;
  imgs[carouselIndex-1].className = "carousel fade display";
  dots[carouselIndex-1].className = "dot active";
}

const showImgs = () => {
  const imgs = myDomApi.myQuerySelectorAll("div.carousel");
  const dots = myDomApi.myQuerySelectorAll("span.dot");
  imgs.forEach( img => img.className = "carousel fade non-display");
  dots.forEach( dot => dot.className = "dot");
  carouselIndex++;
  if (carouselIndex > imgs.length) carouselIndex = 1;
  imgs[carouselIndex-1].className = "carousel fade display";
  dots[carouselIndex-1].className = "dot active";
  setTimeout(showImgs, carouselCycleTime);
}

export {showImgs};
