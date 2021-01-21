/*
    util.js
    유틸을 정의한 모듈
*/

export function addHTML(node, text) {
    node.innerHTML += text;
}
export function innerHTML(node, text){
    node.innerHTML = text;
}

/* dom template */
export const domTpl = {
    headNav1(){
        return `<li class="top-nav-li">핫딜</li>
        <li class="top-nav-li">베스트100</li>
        <li class="top-nav-li">할인특가</li>
        <li class="top-nav-li">기획전</li>`
    },
    headNav2(){
        return  `<li class="top-nav-li font-gray">#마스크</li>
        <li class="top-nav-li font-gray">#스노우체인</li>
        <li class="top-nav-li font-gray">#DIY키트</li>
        <li class="top-nav-li font-gray">#비타민</li>
        <li class="top-nav-li font-gray">#2021팬톤가구</li>`
    },
    autoList(id, name){
        return `<li class='auto-list'>
        <span class='bold mg-right-8'>${id}</span>${name}</li>`
    },
    rollList(id, name){
        return `<li class="rolled-content font-20">${id}위 ${name}</li>`
    },
    leftBanner(src){
        return `<img src=${src}>`
    },
    rightBanner(src){
        return `<div class="slide-content"><img src=${src}></div>`
    },
    hotBanner(src, title, text){
        return `<li class="slide-content-2">
        <img class="banner-img" src=${src}>
        <p class="title">${title}</p>
        <p class="subtext">${text}</p>
        <img class="theme-btn" src="/images/theme.png"></li>`
    },
    gridBanner(src, title, text){
        return `<li class="grid-banner">
        <img class="banner-img" src=${src}>
        <p class="title">${title}</p>
        <p class="subtext">${text}</p>
        <img class="theme-btn" src="/images/theme.png"></li>`
    },
    mainCategory(on, title, idx){
        return `<li class="main-tab-list ${on}" main-idx=${idx}>${title}</li>`
    },
    subCategory(on, title, idx){
        return `<li class="sub-tab-list ${on}" sub-idx=${idx}>${title}</li>`
    },
    lowCategory(on = '', title, idx){
        return `<li class="last-tab-list" last-idx=${idx}><a href='#'>${title}</li>`
    }
};

/* 공백을 제거하는 함수 */
export function removeSpace(str){
    return str.replace(/(\s*)/g, "");
}

/* 검색하고자 하는 단어의 정확한 첫 위치를 반환하는 함수 */
export function getStartPos({word, input}) {
    // 현재 입력 중인 단어의 첫글자 위치를 word에서 찾고, 자른다.
    let startPos = word.indexOf(input[0]);
    let temp_word = word.slice(startPos);

    // 처음으로 일치한 문자 이후부터의 공백 개수를 센다.
    let spacecnt = [...temp_word].reduce(function (acc, cur) {
        if (cur === ' ') acc += 1;
        return acc;
    }, 0);

    // startPos 기준으로 현재 입력 단어의 길이 + word의 공백 갯수 만큼 살펴본다.
    let result = word.slice(startPos, startPos + input.length + spacecnt);
    while (!removeSpace(result).includes(input)) {
        startPos = word.indexOf(input[0], startPos + 1);
        result = word.slice(startPos, startPos + input.length + spacecnt);
    }
    return startPos;
}

/* 스로틀 함수 */
export function throttle(fn, delay) {
    let timer
    return function() {
        if (!timer){
            timer = setTimeout(() => {
                timer = null
                fn.apply(this, arguments)
            }, delay)
        }
    }
}

/* 디바운스 함수 */
export function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        if (timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() =>  // *
            fn(...args), delay);
    }
}

/* Custom API Class */
export class Custom {
    constructor(target) {
        this.target = target;
    }
    dfs_q(node) {
        let returnVal;
        /* dfs 탐색 */
        for (let element of node.children) {
            if (element.matches(this.target))
                return element;
            if (element.hasChildNodes()) {
                let result = this.dfs_q(element);
                if (result !== undefined)  /* 찾았을 경우 */
                    returnVal = result;
            }
        }
        return returnVal;
    }
    dfs_q_all(nodeList, node) {
        for (let element of node.children) {
            if (element.matches(this.target))
                nodeList.push(element);
            if (element.hasChildNodes())
                this.dfs_q_all(nodeList, element);
        }
        return nodeList;
    }
    querySelector(){
        return this.dfs_q(document.body)
    }
    querySelectorAll(){
        return this.dfs_q_all([],document.body)
    }
}

export const dom = (element) => new Custom(element);
