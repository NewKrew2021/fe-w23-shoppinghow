import {myDomApi} from "./myDomApi.js"
import {showImgs} from "./carousel.js"
import {trendClickListener} from "./trend.js"
import {themeClickListener} from "./best.js"

let carouselData, trendData, themeData;
const url = "https://7aebe337-b81c-42de-b89f-8c268823df03.mock.pstmn.io";
window.onload = () => {
  bestContainer();
  carouselContainer();
  themeContainer();
  trendContainer();
  recentContainer();
  inputContainer();
}

const bestContainer = () => {
  let bestImg = myDomApi.myQuerySelector("img.best-img");
  const request = new Request(url + "/best");
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
  const request = new Request(url + "/carousel");
  fetch(request)
  .then(response => response.text())
  .then(result => {
    let idx=0;
    carouselData = JSON.parse(result)["items"]
    carouselImg.forEach( img => img.src = carouselData[idx].src)
  })
  .catch(error => console.log('error', error));   
  showImgs();
}

const themeContainer = () => {
  let themeContainer = myDomApi.myQuerySelector("table.theme-container");
  let newLayout = "<tbody style='display:inline-block'>";
  for(let idx=0; idx<5; idx++) {
    newLayout += `
      <th class="theme">
        <img class="theme-img">
        <div class="theme-title"></div>
        <div class="theme-info"></div>
        <img class="theme-icon" src="img/themeIcon.png"></img>
      </th>
    `
  }
  themeContainer.innerHTML += newLayout + "</tbody>";

  let themeImg = myDomApi.myQuerySelectorAll("img.theme-img");
  let themeTitle = myDomApi.myQuerySelectorAll("div.theme-title");
  let themeInfo = myDomApi.myQuerySelectorAll("div.theme-info");

  const request = new Request(url + "/theme");
  fetch(request)
  .then(response => response.text())
  .then(result => {
    themeData = JSON.parse(result)["items"];
    for(let idx=0; idx<5; idx++){
      themeImg[idx].src = themeData[idx].src;
      themeTitle[idx].innerHTML = themeData[idx].title;
      themeInfo[idx].innerHTML = themeData[idx].subtitle;
    }
  })
  .catch(error => console.log('error', error));
  themeClickListener();
}

const trendContainer = () => {
  let trendContainer = myDomApi.myQuerySelector("table.trend-container");
  let newLayout = "";
  trendContainer.innerHTML += `<caption class="trend-caption">지금 뜨는 테마 카테고리</caption>`;
  for(let idx=0; idx<5; idx++) {
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

  const request = new Request(url + "/trend");
  fetch(request)
  .then(response => response.text())
  .then(result => {
    trendData = JSON.parse(result)["items"]
    for(let idx=0; idx<5; idx++){
      trendImg[idx].src = trendData[idx].src;
      trendTitle[idx].innerHTML = trendData[idx].title;
      trendInfo[idx].innerHTML = trendData[idx].subtitle;
    }
  })
  .catch(error => console.log('error', error));
  trendClickListener();
}

const recentContainer = () => {
  let recentContainer = myDomApi.myQuerySelector("div.img-container");
  let shoppingList = JSON.parse(localStorage.getItem("shopping"));
  let imgList = Object.keys(shoppingList);
  for(let idx=0; idx<Math.min(9, imgList.length); idx++){
    recentContainer.innerHTML += `<img class="recent-img" src="${imgList[idx]}"></img>`
  }
}

const inputContainer = () => {
  let time=1;
  const inputDefault = ["1   부라타치즈","2   무스탕코트","3   오덴세시손느","4   구강세척기","5   게이밍의자",
                  "6   현관코일매트","7   여성등산화","8   에어프라이어","9   접이식욕조","10   글라스텐다지기"]
  const input = myDomApi.myQuerySelector("input.search-input");
  const changeInput = setInterval(()=> {
    input.value = inputDefault[time];
    time += 1;
    if(time>=10) time=0;
  }, 1500);
  input.addEventListener("click", () => {
    clearInterval(changeInput);
    input.value="";
  });
}

export {carouselData, trendData, themeData};