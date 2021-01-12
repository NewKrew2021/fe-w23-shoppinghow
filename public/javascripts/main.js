/*
    main.js
    fetch API 활용해서 이미지 넣기
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

/* row-0-bottomBanner */
(function(){
    const gridUL = querySelector('.grid-ul');
    fetch('http://localhost:80/topgrid')
        .then(res=> res.json())
        .then(json => json.forEach(element => {
            addImg('<li class="grid-banner">',gridUL,element.src,"</div>")
        }))
        .catch((error) => console.error(error))
})();