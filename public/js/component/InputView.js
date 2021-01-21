import {myDomApi} from "../util/MyDomApi.js"
import {URL} from "../url.js"

let searchDefaultPage, inputItem, inputItemLen, isClick = false, time=0;
const inputCycleTime = 1500; //ms
const inputDefault = ["부라타치즈","무스탕코트","오덴세시손느","구강세척기","게이밍의자", "현관코일매트","여성등산화","에어프라이어","접이식욕조","글라스텐다지기"]

const input = myDomApi.myQuerySelector("input.search-input");
const searchWindow = myDomApi.myQuerySelector("div.search-window");

const createInputContainer = () => {
  requestInputItem();
  createSearchDefaultPage();
  changeInput();
  inputBtnEventlistener();
  inputChangeEventListener();
}

const createSearchDefaultPage = () => {
  searchDefaultPage = `
      <div class="keyword-title">인기 쇼핑 키워드</div>
  `
  inputDefault.forEach( (rank, idx) => {
    searchDefaultPage += `
    <div class="keyword"><span class="keyword-number">${idx+1}</span>&nbsp;&nbsp;&nbsp;${rank}</div>
    `
  })
  searchWindow.innerHTML = searchDefaultPage;
}

const createSearchResultPage = (result, inputValue) => {
  let searchResultPage = ``
  result.map( keyword => {
    console.log(keyword.indexOf(inputValue));
    let idx = keyword.indexOf(inputValue);
    console.log();
    console.log();
    keyword = keyword.substring(0, idx) +
              `<span class="font-bold">` +
              keyword.substring(idx, idx+inputValue.length) +
              `</span>` +
              keyword.substring(idx+inputValue.length);
    searchResultPage += `<div class="search-result">${keyword}</div>`
  })
  searchWindow.innerHTML = searchResultPage;
}

const changeInput = () =>{
  setInterval(()=> {
    if(isClick) return;
    input.value = `${time+1}   ${inputDefault[time]}`;
    time += 1;
    if(time>=10) time=0;
  }, inputCycleTime);
} 

const inputBtnEventlistener = () => {
  document.addEventListener("click", event => {
    if(event.target === input) {
      isClick = true;
      input.value = ``;
      input.className="search-input-clicked";
      searchWindow.className = "search-window";
      searchWindow.innerHTML = searchDefaultPage;
    }
    else if(isClick===true){
      isClick = false;
      input.className="search-input";
      searchWindow.className = "search-window non-display";
    }
  });
}

const inputChangeEventListener = () => {
  input.addEventListener("input", () => {
    let result = [];
    for(let idx=0; idx<inputItemLen; idx++) {
      if(inputItem[idx].includes(input.value)) {
        result.push(inputItem[idx]);
        if(result.length>9) break;
      }
    }
    console.log(result, input.value);
    createSearchResultPage(result, input.value);
  })
}


const requestInputItem = () => {
  const request = new Request(URL + "/input");
  fetch(request)
  .then(response => response.text())
  .then(result => {
    inputItem = JSON.parse(result)["data"];
    inputItemLen = inputItem.length;
  })
  .catch(error => console.log('error', error));
}

export {createInputContainer}