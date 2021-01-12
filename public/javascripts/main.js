/*
    main.js
    fetch API 활용해서 이미지 넣기
*/

/* leftBanner */
(function(){
    const leftBanner = querySelector('.row-1-left');
    fetch('http://localhost:80/topleft')
        .then(res=> res.json())
        .then(json => {
            addImg('',leftBanner, json[0].src,'')
        })
        .catch((error)=>{
            console.error('Error', error);
        })
})();

/* rightBanner */
(function(){
    const slideList = querySelector('.slide-list');
    fetch('http://localhost:80/topright')
        .then(res=> res.json())
        .then(json => json.forEach(element => {
            addImg('<div class="slide-content">',slideList,element.src,"</div>")
        }))
        .then(data => addSlideShow())
        .catch((error)=>{
            console.error('Error', error);
        })
})();
