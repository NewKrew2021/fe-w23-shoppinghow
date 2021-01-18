/*
    util.js
    - 직접 정의한 Promise 객체
    - 유틸성 함수
    - querySelector 기능을 직접 구현한 함수
*/

/* 이미지 넣는 함수 */
function addHTML(node, text) {
    node.innerHTML += text;
}

/* Custom API Class */
class Custom {
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

const dom = (element) => new Custom(element);
