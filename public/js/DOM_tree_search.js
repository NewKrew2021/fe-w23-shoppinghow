class DOMTreeSearch {
    constructor(document) {
        this.root = document;
    }
    
    dfs(element, selector) {
        if(element.matches && element.matches(selector)) return element;
        for(let node of element.childNodes) {
            const result = this.dfs(node, selector);
            if(result) return result;
        }
        return null;
    }
    dfsAll(element, selector) {
        let matched = [];
        if(element.matches && element.matches(selector)) matched.push(element);
        for(let node of element.childNodes) {
            let elements = this.dfsAll(node, selector);
            matched = [...matched, ...elements];
        }
        return matched;
    }
    querySelector(selector) {
        return this.dfs(this.root, selector);
    }
    querySelectorAll(selector) {
        return this.dfsAll(this.root, selector);
    }
}