function initDomAPI () {
    /**
     * Custom querySelector function.
     * 
     * @param {String} selector 
     * @param {Node} rootElement 
     */
    
    function querySelector(selector, rootElement=document) {
        if (rootElement === document) {
            rootElement = rootElement.children[0];
        }
        if (rootElement.matches(selector)) {
            return rootElement;
        } else {
            for (const ele of rootElement.children) {
                const seletorElement = querySelector(selector, ele);
                if (seletorElement) return seletorElement;
            }
        }
        return null;
    }
    
    function querySelectorAll(selector, rootElement=document, result = []) {
        if (rootElement === document) {
            rootElement = rootElement.children[0];
        }
        if (rootElement.matches(selector)) {
            result.push(rootElement);
        } else {
            for (const ele of rootElement.children) {
                const add = querySelectorAll(selector, ele, result);
                if (add !== []) {
                    result.concat(add);
                }
            }
        }
        return result;
    }

    return {querySelector, querySelectorAll};
}

const dapi = initDomAPI();
export default dapi;