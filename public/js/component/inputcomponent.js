import {myDomApi} from "../util/mydomapi.js"
import {URL} from "../url.js"

const inputCycleTime = 1500; //ms

const createInputContainer = () => {
  let time=1;
  const inputDefault = ["1   부라타치즈","2   무스탕코트","3   오덴세시손느","4   구강세척기","5   게이밍의자",
                  "6   현관코일매트","7   여성등산화","8   에어프라이어","9   접이식욕조","10   글라스텐다지기"]
  const input = myDomApi.myQuerySelector("input.search-input");
  const changeInput = setInterval(()=> {
    input.value = inputDefault[time];
    time += 1;
    if(time>=10) time=0;
  }, inputCycleTime);
  input.addEventListener("click", () => {
    clearInterval(changeInput);
    input.value="";
  });
}

export {createInputContainer}