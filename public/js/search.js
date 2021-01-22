/*
    구현중
*/

const URL = "http://localhost:3000";

const tpl = {
    topSearchedItem(title) { return `<div class="top-searched-item lpd-5p">${title}</div>` },
    suggestionItem(title) { return `<div class="suggestion-item lpd-5p">${title}</div>` }
}

const DOMs = {
    inputBox: document.querySelector(".input-box"),
    topSearchedBox: document.querySelector(".top-searched-box"),
    suggestionBox: document.querySelector(".suggestion-box")
};
const cache = {};

const getWord = async function (keyword) {
    let url = `${URL}/word?keyword=${keyword}`;
    const res = await fetch(url);
    const resData = await res.json();
    return resData;
}

const mouseoverHandler = function () {
    if (DOMs.inputBox.value) DOMs.suggestionBox.classList.remove("d-off");
    else DOMs.topSearchedBox.classList.remove("d-off");
    DOMs.inputBox.parentElement.classList.remove("border-gray");
    DOMs.inputBox.parentElement.classList.add("border-red");
}

const transArrToHTML = function (data, word) {
    return data.data.reduce((acc, cur, i) => {
        const startIdx = data.idx[i];
        const wordArr = word.replace(/(\s*)/g, "").split("");
        let arr = cur.split("");
        
        arr.splice(startIdx, 0, `<span class="text-red">`);
        console.log(wordArr, arr, startIdx);

        for(let j = startIdx + 1; j < arr.length; j++) {
            if(wordArr[0] === arr[j]) {
                wordArr.shift();
            }
            if(!wordArr.length) {
                arr.splice(j + 1, 0, `</span>`);
                break;
            }
        }
        console.log(arr.join(""));
        return acc + tpl["suggestionItem"](arr.join(""));
    }, "");
}

const inputHandler = function () {
    const value = DOMs.inputBox.value;
    if (value) {
        DOMs.topSearchedBox.classList.add("d-off");
        DOMs.suggestionBox.classList.remove("d-off");
        const reg = /^[가-힣a-zA-Z\s]+$/;
        if (!reg.test(value)) return;
        if (cache[value]) {
            DOMs.suggestionBox.innerHTML = `<h2 class="lpd-5p">연관 검색어</h2>` + transArrToHTML(cache[value], value);
        }
        else {
            getWord(value).then((data) => {
                DOMs.suggestionBox.innerHTML = `<h2 class="lpd-5p">연관 검색어</h2>` + transArrToHTML(data, value);
                cache[value] = data;
            });
        }
    }
    else {
        DOMs.suggestionBox.classList.add("d-off");
        DOMs.topSearchedBox.classList.remove("d-off");
    }
}
const keydownHandler = function (e) {

}

const mouseoutHandler = function () {
    DOMs.inputBox.parentElement.classList.remove("border-red");
    DOMs.inputBox.parentElement.classList.add("border-gray");
    DOMs.topSearchedBox.classList.add("d-off");
    DOMs.suggestionBox.classList.add("d-off");
}

const addEventHandler = function (DOM) {
    DOM.addEventListener("mouseover", mouseoverHandler);
    DOMs.inputBox.addEventListener("input", inputHandler);
    DOM.addEventListener("keydown", e => keydownHandler(e));
    DOM.addEventListener("mouseout", mouseoutHandler);
}

export const initSearch = async function () {
    const res = await getWord("");
    const topSearchedArr = res.data;
    let html = "";
    html += topSearchedArr.reduce((acc, cur, idx) => {
        return acc + tpl["topSearchedItem"](`<span class="font-bold">${idx + 1}</span>  ${cur}`);
    }, "");
    DOMs.topSearchedBox.innerHTML += html;

    addEventHandler(document.querySelector(".header__search"));
};