const myDomApi = {
  myQuerySelector(selector , element=document) {
    let getElement;
    if(element.matches && element.matches(selector)){
      getElement = element;
    }
    else if(element.hasChildNodes()){
      element.childNodes.forEach( childNode => {
        if(getElement === undefined){
          const ret = myDomApi.myQuerySelector(selector, childNode);
          if(ret) getElement = ret;
        }
      });
    }
    return getElement;
  },
  myQuerySelectorAll(selector, element=document) {
    let getElement = [];
    if(element.matches && element.matches(selector)){
      getElement.push(element);
    }
    else if(element.hasChildNodes()){
      element.childNodes.forEach( childNode => {
        const ret = myDomApi.myQuerySelectorAll(selector, childNode);
        if(ret) getElement.push(...ret);
      })
    }
    return getElement; 
  }
}

export { myDomApi };