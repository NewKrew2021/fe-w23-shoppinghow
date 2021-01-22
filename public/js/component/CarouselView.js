import {myDomApi} from "../util/MyDomApi.js"
import {URL} from "../url.js"

let carouselIndex = 0;
const carouselImgCnt = 3;
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


const createCarouselContainer = () => {
  requestCarouselItem().
  then(result => putCarouselImage(result))
  .then(showImgs)
}

async function requestCarouselItem() {
  const request = new Request(URL + "/carousel");
  const response = await fetch(request);
  const result = await response.text();
  return result;
}

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


const putCarouselImage = (result) => {
  let idx=0;
  let carouselImg = myDomApi.myQuerySelectorAll("img.carousel-img");
  let carouselData = JSON.parse(result)["items"]
  carouselImg.forEach( img => {
    img.src = carouselData[idx].src
    idx+=1;
  })
}

export {createCarouselContainer};
