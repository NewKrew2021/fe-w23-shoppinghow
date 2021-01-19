import {myDomApi} from "../util/mydomapi.js"
import {URL} from "../url.js"

const createBestContainer = () => {
  const request = new Request(URL + "/best");
  fetch(request)
  .then(response => response.text())
  .then(result => putBestItems(result))
  .catch(error => console.log('error', error));
}

const putBestItems = (result) => {
  let bestImg = myDomApi.myQuerySelector("img.best-img");
  const idx = Math.floor(Math.random() * 3);
    bestImg.src = JSON.parse(result)["items"][idx].src;
}

export {createBestContainer};