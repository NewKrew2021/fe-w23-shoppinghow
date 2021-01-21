function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
function getDistance(x1,x2,y1,y2) {
    return Math.sqrt(Math.pow(x2-x1,2)*100000+Math.pow(y2-y1,2)*100000);
}
function getMatchingPisition(base,keyword_){
    const position={
        matchStart:-1,
        matchEnd:-1
    }
    const keyword=keyword_.replaceAll(" ","");
    for(let i = 0 ; i < base.length;i++){
        let j;
        let pass;
        for(j=0,pass=0;j<keyword.length;j++){
            if(base[i+j+pass]===' ') {
                pass++; 
                j--;
                continue;
            }
            if(base[i+j+pass]!==keyword[j]) break;
        }
        if(keyword.length===j) {
            position.matchStart=i;
            position.matchEnd=i+j+pass;
            return position;
        }
    }
    return position;
};


export {createElementFromHTML, getDistance,getMatchingPisition}