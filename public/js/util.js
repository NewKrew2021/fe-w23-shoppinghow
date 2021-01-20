function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
function getDistance(x1,x2,y1,y2) {
    return Math.sqrt(Math.pow(x2-x1,2)*100000+Math.pow(y2-y1,2)*100000);
}
export {createElementFromHTML, getDistance}