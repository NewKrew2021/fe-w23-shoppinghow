import {myDomApi} from "./myDomApi.js"
import {showImgs} from "./carousel.js"

// myDomApi.myQuerySelector("div");

window.onload = () => {
  bestContainer();
  carouselContainer();
  themeContainer();
  trendContainer();
}

const bestContainer = () => {
  let bestImg = myDomApi.myQuerySelector("img.best-img");
  const request = new Request("https://c153d255-88c6-4bf4-829f-432a1f797c0c.mock.pstmn.io/best");
  fetch(request)
  .then(response => response.text())
  .then(result => {
    const idx = Math.floor(Math.random() * 3);
    bestImg.src = JSON.parse(result)["items"][idx].src;
  })
  .catch(error => console.log('error', error));
}

const carouselContainer = () => {
  let carouselImg = myDomApi.myQuerySelectorAll("img.carousel-img");
  const request = new Request("https://c153d255-88c6-4bf4-829f-432a1f797c0c.mock.pstmn.io/carousel");
  fetch(request)
  .then(response => response.text())
  .then(result => {
    let idx=0;
    const data = JSON.parse(result)["items"]
    carouselImg.forEach( img => {
      img.src = data[idx].src;
    })
  })
  .catch(error => console.log('error', error));   
  showImgs();
}

const themeContainer = () => {

}

const trendContainer = () => {
  let trendContainer = myDomApi.myQuerySelector("table.trend-container");
  let newLayout = "";
  trendContainer.innerHTML += `<caption class="trend-caption">지금 뜨는 테마 카테고리</caption>`;
  for(let idx=0; idx<5; idx++){
    newLayout += `
      <th class="trend">
        <img class="trend-img"">
        <div class="trend-title"></div>
        <div class="trend-info"></div>
        <img class="trend-icon" src="img/themeIcon.png"></img>
      </th>
    `
  }
  for(let idx=0; idx<5; idx++){
    newLayout += `
      <th class="trend non-display">
        <img class="trend-img">
        <div class="trend-title"></div>
        <div class="trend-info"></div>
        <img class="trend-icon"></img>
      </th>
    `
  }
  trendContainer.innerHTML += newLayout;

  let trendImg = myDomApi.myQuerySelectorAll("img.trend-img");
  let trendTitle = myDomApi.myQuerySelectorAll("div.trend-title");
  let trendInfo = myDomApi.myQuerySelectorAll("div.trend-info");

  const request = new Request("https://c153d255-88c6-4bf4-829f-432a1f797c0c.mock.pstmn.io/trend");
  fetch(request)
  .then(response => response.text())
  .then(result => {
    const data = JSON.parse(result)["items"]
    for(let idx=0; idx<10; idx++){
      trendImg[idx].src = data[idx].src;
      trendTitle[idx].innerHTML = data[idx].title;
      trendInfo[idx].innerHTML = data[idx].subtitle;
    }
  })
  .catch(error => console.log('error', error));
}