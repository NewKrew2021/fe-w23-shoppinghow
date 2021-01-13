/* display:none, block 바꾸는 click event */
function addShowEvent(target){
    const targetElement = DOM(target).querySelector();
    targetElement.addEventListener('click', () => {
        let current = DOM('.hidden').querySelector();
        current.className = current.className.replace(" hidden","");
    });
}
addShowEvent('#expand');