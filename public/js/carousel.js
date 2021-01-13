let carouselIndex = 0;

document.getElementById("carouselPrev").addEventListener("click", () => {
  changeImg(carouselIndex += -1);
});

document.getElementById("carouselNext").addEventListener("click", () => {
  changeImg(carouselIndex += 1);
});

const dotBtns = document.querySelectorAll("span.dot");

dotBtns.forEach( btn => {
  btn.addEventListener("click", () => {
    carouselIndex = Number(btn.id[3])-1;
    changeImg(carouselIndex += 1);
  });
});

const changeImg = curImg => {
  const imgs = document.querySelectorAll("div.carousel");
  const dots = document.querySelectorAll("span.dot");
  imgs.forEach( img => img.className = "carousel fade non-display");
  dots.forEach( dot => dot.className = "dot");
  if (curImg > imgs.length) carouselIndex = 1;
  if (curImg < 1) carouselIndex = imgs.length;
  imgs[carouselIndex-1].className = "carousel fade display";
  dots[carouselIndex-1].className = "dot active";
}

const showimgs = () => {
  const imgs = document.querySelectorAll("div.carousel");
  const dots = document.querySelectorAll("span.dot");
  imgs.forEach( img => img.className = "carousel fade non-display");
  dots.forEach( dot => dot.className = "dot");
  carouselIndex++;
  if (carouselIndex > imgs.length) carouselIndex = 1;
  imgs[carouselIndex-1].className = "carousel fade display";
  dots[carouselIndex-1].className = "dot active";
  setTimeout(showimgs, 3000);
}

showimgs();