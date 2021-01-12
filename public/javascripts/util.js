/*
    util.js
    - 직접 정의한 Promise 객체
    - 유틸성 함수
    - querySelector 기능을 직접 구현한 함수
*/

/* 이미지 넣는 함수 */
function addImg(prefix, node, src, suffix){
    node.innerHTML += (prefix)+"<img src = "+src+">"+(suffix);
}

function addHTML(node, text){
    node.innerHTML += text;
}

/* DFS 함수 정의하기 */
function dfs_for_querySelector(node, target) {
    let returnVal;
    /* dfs 탐색 */
    for (element of node.children) {
        let result;
        if (element.matches(target)){
            return element;
        }
        if (element.hasChildNodes()) {
            result = dfs_for_querySelector(element, target);
            if (result !== undefined){ /* 찾았을 경우 */
                returnVal = result;
            }
        }
    }
    return returnVal;
}

function dfs_for_querySelectorAll(nodeList, node, target){
    /* dfs 탐색 */
    for (element of node.children) {
        if (element.matches(target)){
            nodeList.push(element);
        }
        if (element.hasChildNodes()) {
            dfs_for_querySelectorAll(nodeList, element, target);
        }
    }
    return nodeList;
}

/* querySelector custom API (parameter : string, return : HTML element)*/
function querySelector(element) {
    let startPoint = document.body;
    return dfs_for_querySelector(startPoint, element);
}
/* querySelectorAll custom API (parameter : string, return : Array) */
function querySelectorAll(element) {
    let startPoint = document.body;
    return dfs_for_querySelectorAll([],startPoint, element);
}

/* test */
/*
fetch('http://localhost:80/posts')
    .then(res => res.json())
    .then(data => console.log(data));
*/