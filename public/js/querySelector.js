class QuerySelector{

    #dfs(base,selector){
        const childNodes=base.childNodes;
        for( let child of childNodes){
            if(typeof child.tagName === 'undefined') continue;
            if(child.matches(selector)) {
                return child;
            }else{
                let result = this.#dfs(child,selector);
                if(typeof result !== 'undefined') return result;
            }        
        }
    }
    
    query(base, selector){
        return this.#dfs(base,selector);
    };

}

class QuerySelectorAll{
    #result;
    #dfsAll(base,selector,type){
        const childNodes=base.childNodes;
        for( let child of childNodes){
            if(typeof child.tagName === 'undefined') continue;
            if(child.matches(selector)) this.#result.push(child);
            this.#dfsAll(child,selector);
        }
    }

    query(base,selector){
        this.#result=[];
        this.#dfsAll(base,selector);
        return this.#result;
    }
}
/** [usage] :
const qs = new QuerySelector();
console.log(qs.query(document,"img"));
console.log(qs.query(document,"#search-bar"));
console.log(qs.query(document,".btn"));
const qsa = new QuerySelectorAll();
console.log(qsa.query(document,"img"));
console.log(qsa.query(document,"#search-bar"));
console.log(qsa.query(document,".btn"));
*/