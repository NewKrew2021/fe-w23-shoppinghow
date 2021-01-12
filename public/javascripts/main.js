/*
    main.js
    fetch API 활용해서 이미지 넣기
    기타 텍스트, 이미지 요소 넣기
*/

/* row-0-leftBanner */
(function(){
    const leftBanner = querySelector('.row-0-left');
    fetch('http://localhost:80/topleft')
        .then(res=> res.json())
        .then(json => {
            addImg('',leftBanner, json[0].src,'')
        })
        .catch((error) => console.error(error))
})();

/* row-0-rightBanner */
(function(){
    const slideList = querySelector('.slide-list');
    fetch('http://localhost:80/topright')
        .then(res=> res.json())
        .then(json => json.forEach(element => {
            addImg('<div class="slide-content">',slideList,element.src,"</div>")
        }))
        .then(data => addSlideShow())
        .catch((error) => console.error(error))
})();

/* row-0-bottom-1 Banner */
(function(){
    const gridUL = querySelector('#grid-ul-1');
    fetch('http://localhost:80/topgrid')
        .then(res=> res.json())
        .then(json => json.forEach(element => {
            addHTML(gridUL,
            '<li class="grid-banner"><img class="banner-img" src='+element.src+'>'
            +'<p class="title">'+element.title+'</p>'
            +'<p class="subtext">'+element.text+'</p>'
            +'<img class="theme-btn" src="/images/theme.png"></li>')
        }))
        .catch((error) => console.error(error))
})();

/* row-0-bottom-2 Banner */
(function(){
    const gridUL = querySelector('#grid-ul-2');
    fetch('http://localhost:80/topgrid')
        .then(res=> res.json())
        .then(json => json.forEach(element => {
            addHTML(gridUL,
            '<li class="grid-banner"><img class="banner-img" src='+element.src+'>'
            +'<p class="title">'+element.title+'</p>'
            +'<p class="subtext">'+element.text+'</p>'
            +'<img class="theme-btn" src="/images/theme.png"></li>')
        }))
        .catch((error) => console.error(error))
})();

/* row-0-bottom-expand */
(function(){
    const expandDiv = querySelector('#expand');
    fetch('http://localhost:80/more')
        .then(res=> res.json())
        .then(json=> {
            addHTML(expandDiv,json.title+
                '<span class="small">'+json.number+'</span><img src='+json.src+'>')
        })
})();