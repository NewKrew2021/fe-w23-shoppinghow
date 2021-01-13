const myDomApi = {
  myQuerySelector : (selector , element=document) => {
    let getElement;
    if(element.matches && element.matches(selector)){
      getElement = element;
    }
    else if(element.hasChildNodes()){
      element.childNodes.forEach( childNode => {
        if(getElement === undefined){
          const ret = this.myQuerySelector(selector, childNode);
          if(ret) getElement = ret;
        }
      });
    }
    return getElement;
  },
  myQuerySelectorAll : (selector, element=document) => {
    let getElement = [];
    if(element.matches && element.matches(selector)){
      getElement.push(element);
    }
    else if(element.hasChildNodes()){
      element.childNodes.forEach( childNode => {
        const ret = this.myQuerySelectorAll(selector, childNode);
        if(ret) getElement.push(...ret);
      })
    }
    return getElement; 
  }
}

export { myDomApi };