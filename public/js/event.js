/* 더보기 클릭 시 아이템 한줄 씩 추가하는 함수 */
let index = 0;
let jsonArr;
function addMoreContent(target){
    const clickedElement = DOM(target).querySelector();
    clickedElement.addEventListener('click', ()=>{
        let expanded = DOM('#row-more').querySelector();
        fetch('http://localhost:80/best')
            .then(res => res.json())
            .then(json => json.slice(index, index+5))
            .then(data => data.forEach(element=>{
                addHTML(expanded, `
                        <ul id="grid-ul-2" class="grid-ul">
                        <li class="grid-banner">
                        <img class="banner-img" src=${element.src}>
                        <p class="title">${element.title}</p>
                        <p class="subtext">${element.text}</p>
                        <img class="theme-btn" src="/images/theme.png"></li>
                        </ul>
                `)
            }))
            .then(index+=5)
    });
}
addMoreContent('#expand');