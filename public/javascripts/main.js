/*
    main.js
    - 직접 정의한 Promise 객체
    - querySelector 기능을 직접 구현한 함수
*/
/* DFS 함수 정의하기 */
function dfs_for_querySelector(node, target) {
    let returnVal;
    /* dfs 탐색 */
    /* (참고) HTMLCollection type의 경우 for-of 문은 정상 작동, forEach는 동작하지 않았음*/
    for (element of node.children) {
        let elementId = element.getAttribute("id");
        let elementClassName = element.getAttribute("class");
        let result;
        if ( (elementId !== null && elementId === target) ||
             (elementClassName !== null && elementClassName === target)){
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
    /* (참고) HTMLCollection type의 경우 for-of 문은 정상 작동, forEach는 동작하지 않았음*/
    for (element of node.children) {
        let elementId = element.getAttribute("id");
        let elementClassName = element.getAttribute("class");
        let result;
        if ( (elementId !== null && elementId === target) ||
             (elementClassName !== null && element.classList.contains(target))){
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
    let elementName;
    let startPoint = window.document.body;
    /* #이 맨 앞에 들어갈 경우 id 값으로 여기고 찾는다. */
    if (element[0] === '#') {
        elementName = element.replace('#', '');
        return dfs_for_querySelector(startPoint, elementName);
    }
    else {
        /* className 으로 여기고 찾는다.
          .을 기준으로 분리하고 맨 마지막 문자열을 넘긴다.*/
       let nameArray = element.split('.');
       elementName = nameArray[nameArray.length - 1];
       return dfs_for_querySelector(startPoint, elementName);
    }
}
/* querySelectorAll custom API (parameter : string, return : Array) */
function querySelectorAll(element) {
    let elementName;
    let startPoint = window.document.body;
    if (element[0] === '#') {
        elementName = element.replace('#', '');
        return dfs_for_querySelectorAll([],startPoint, elementName);
    }
    else {
       let nameArray = element.split('.');
       elementName = nameArray[nameArray.length - 1];
       return dfs_for_querySelectorAll([],startPoint, elementName);
    }
}

/* test */
fetch('http://localhost:80/posts')
    .then(res => res.json())
    .then(data => console.log(data));