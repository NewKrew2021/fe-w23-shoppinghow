
/* display:none, block 바꾸는 click event */
function addShowEvent(target){
    const targetElement = querySelector(target);
    targetElement.addEventListener('click', () => {
        let current = querySelector(".hidden");
        current.className = current.className.replace(" hidden","");
    });
}
addShowEvent('#expand');
