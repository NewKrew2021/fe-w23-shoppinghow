/*
    main.js
    fetch API 활용해서 이미지 넣기
    기타 텍스트, 이미지 요소 넣기
*/

/* row-0-leftBanner */
(function(){
    const leftBanner = DOM('.row-0-left').querySelector();
    fetch('http://localhost:80/topleft')
        .then(res=> res.json())
        .then(json => json.forEach(element=>{
            addHTML(leftBanner, `<img src=${element.src}>`)
        }))
        .catch((error) => console.error(error))
})();

/* row-0-rightBanner */
(function(){
    const slideList = DOM('.slide-list').querySelector();
    fetch('http://localhost:80/topright')
        .then(res=> res.json())
        .then(json => json.forEach(element => {
            addHTML(slideList, `<div class="slide-content">
            <img src=${element.src}></div>`)
        }))
        .then(data => addSlideShow())
        .catch((error) => console.error(error))
})();

/* row-0-bottom-1 Banner */
(function(){
    const gridUL = DOM('#grid-ul-1').querySelector();
    fetch('http://localhost:80/topgrid')
        .then(res=> res.json())
        .then(json => json.forEach(element => {
            addHTML(gridUL,
                `<li class="grid-banner">
                <img class="banner-img" src=${element.src}>
                <p class="title">${element.title}</p>
                <p class="subtext">${element.text}</p>
                <img class="theme-btn" src="/images/theme.png"></li>`)
        }))
        .catch((error) => console.error(error))
})();