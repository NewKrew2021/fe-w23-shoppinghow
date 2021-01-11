const querySelector = (param , element=document.body) => {
  if(param.indexOf('.')>=0){
    return getElementByClass(
      param.substring(param.indexOf('.')+1), 
      param.substring(0, param.indexOf('.')).toUpperCase()
    );
  }
  else if(param.indexOf('#')>=0){
    return getElementById(param.substring(1));
  }
  else{
    return getElementByTag(param.toUpperCase());
  }
}

const querySelectorAll = (param, element=document.body) => {
  if(param.indexOf('.')>=0){
    return getElementByClassAll(
      param.substring(param.indexOf('.')+1), 
      param.substring(0, param.indexOf('.')).toUpperCase()
    );
  }
  else if(param.indexOf('#')>=0){
    return [getElementById(param.substring(1))];
  }
  else{
    return getElementByTagAll(param.toUpperCase());
  }
}

const getElementById = (id, element=document.body) => {
  let idElement;
  if(element.id === id){
    idElement = element;
  }
  else if(element.hasChildNodes()){
    element.childNodes.forEach( childNode => {
      if(idElement === undefined){
        const ret = getElementById(id, childNode);
        if(ret) idElement = ret;
      }
    })
  }
  return idElement;
}

const getElementByClass = (className, tagName, element=document.body) => {
  let classElement;
  if(element.className === className && element.tagName === tagName){
    classElement = element;
  }
  else if(element.hasChildNodes()){
    element.childNodes.forEach( childNode => {
      if(classElement === undefined) {
        const ret = getElementByClass(className, tagName, childNode);
        if(ret) classElement = ret;
      }
    })
  }
  return classElement;
}

const getElementByTag = (tagName, element=document.body) => {
  let tagElement;
  if(element.tagName === tagName){
    tagElement = element;
  }
  else if(element.hasChildNodes()){
    element.childNodes.forEach( childNode => {
      if(tagElement === undefined){
        const ret = getElementByTag(tagName, childNode);
        if(ret) tagElement = ret;
      }
    })
  }
  return tagElement;
}

const getElementByClassAll = (className, tagName, element=document.body) => {
  let classElement = [];
  if(element.className === className && element.tagName === tagName){
    classElement.push(element);
  }
  if(element.hasChildNodes()){
    element.childNodes.forEach( childNode => {
      const ret = getElementByClassAll(className, tagName, childNode);
      if(ret.length){
        classElement.push(...ret);
      }
    })
  }
  return classElement;
}

const getElementByTagAll = (tagName, element=document.body) => {
  let tagElement = [];
  if(element.tagName === tagName){
    tagElement.push(element);
  }
  else if(element.hasChildNodes()){
    element.childNodes.forEach( childNode => {
      const ret = getElementByTagAll(tagName, childNode);
      if(ret) tagElement.push(...ret);
    })
  }
  return tagElement;
}

querySelectorAll("div");
