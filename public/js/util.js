/*
    util.js
    
    유틸성 기능을 정의한 모듈
*/

export function addHTML(node, text) {
    node.innerHTML += text;
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
