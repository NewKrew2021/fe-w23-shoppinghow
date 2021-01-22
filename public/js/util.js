/*
    util.js
    유틸을 정의한 모듈
*/

export function addHTML(node, text) {
    node.innerHTML += text;
}
export function html(node, text){
    node.innerHTML = text;
}
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
