import {myDomApi} from "../util/MyDomApi.js"
import {URL} from "../url.js"

const createBestContainer = () => {
  requestBestItem()
  .then(result => putBestItems(result));
}

async function requestBestItem() {
  const request = new Request(URL + "/best");
  const response = await fetch(request);
  const result = await response.text();
  return result
}

const putBestItems = (result) => {
  let bestImg = myDomApi.myQuerySelector("img.best-img");
  const idx = Math.floor(Math.random() * 3);
    bestImg.src = JSON.parse(result)["items"][idx].src;
}

export {createBestContainer};