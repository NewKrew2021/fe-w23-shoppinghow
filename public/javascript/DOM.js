class DOM {
    constructor(root) {
        this.root = root;
        
    }
    getPropertyName(input) {
        if(input[0] === ".") return "className";
        else if(input[0] === "#") return "id";
        else return "tagName";
    }
    dfs(element, target, pName) {
        let selectors = [];
        if(element[pName] !== undefined)
        selectors = element[pName].split(" ");
        for(let selector of selectors) {
            if(selector === target) return element;
        }
        for(let node of element.childNodes) {
            const result = this.dfs(node, target, pName);
            if(result !== null) return result;
        }
        return null;
    }
    querySelector(input) {
        const pName = this.getPropertyName(input);
        if(pName !== "tagName") input = input.substr(1);
        else input = input.toUpperCase();
        return this.dfs(this.root, input, pName);
    }
    querySelectorAll(input) {

    }
}