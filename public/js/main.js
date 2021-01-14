/*
    main.js
    - fetch API 활용해서 이미지 넣기
    - 기타 텍스트, 이미지 요소 넣기
*/

/* nav 요소 innerHTML로 추가 */
(function () {
    const top_nav_UL_1 = DOM('#top-nav-ul-1').querySelector();
    const top_nav_UL_2 = DOM('#top-nav-ul-2').querySelector();
    addHTML(top_nav_UL_1,
        `<li class="top-nav-li">핫딜</li>
        <li class="top-nav-li">베스트100</li>
        <li class="top-nav-li">할인특가</li>
        <li class="top-nav-li">기획전</li>`)
    addHTML(top_nav_UL_2,
        `<li class="top-nav-li font-gray">#마스크</li>
        <li class="top-nav-li font-gray">#스노우체인</li>
        <li class="top-nav-li font-gray">#DIY키트</li>
        <li class="top-nav-li font-gray">#비타민</li>
        <li class="top-nav-li font-gray">#2021팬톤가구</li>`)
})();

/* row-0-leftBanner */
(function () {
    const leftBanner = DOM('.row-0-left').querySelector();
    fetch('http://localhost:80/topleft')
        .then(res => res.json())
        .then(json => json.forEach(element => {
            addHTML(leftBanner, `<img src=${element.src}>`)
        }))
        .catch((error) => console.error(error))
})();

/* row-0-rightBanner */
(function () {
    const slideList = DOM('.slide-list').querySelector();
    fetch('http://localhost:80/topright')
        .then(res => res.json())
        .then(json => json.forEach(element => {
            addHTML(slideList, `<div class="slide-content">
            <img src=${element.src}></div>`)
        }))
        .then(data => {
            const slideObject = new Slider(curSlideIndex = 0, SLIDE_SPEED = 300,
                AUTO_SLIDE_SPEED = 300, SLIDE_WIDTH = 485);
            slideObject.init();
        })
        .catch((error) => console.error(error))
})();

/* row-0-bottom-1 Banner */
(function () {
    const gridUL = DOM('#grid-ul-1').querySelector();
    fetch('http://localhost:80/topgrid')
        .then(res => res.json())
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

/* row-1-bottom Banner (x10) */
(function () {
    const slideList = DOM('.slide-list-2').querySelector();
    fetch('http://localhost:80/hot')
        .then(res => res.json())
        .then(json => json.forEach(element => {
            addHTML(slideList,
                `<li class="slide-content-2">
                <img class="banner-img" src=${element.src}>
                <p class="title">${element.title}</p>
                <p class="subtext">${element.text}</p>
                <img class="theme-btn" src="/images/theme.png"></li>`)
        }))
        .then(data => clickSaveStorage())
        .then(data => {
            const tests = new HotSlide(h_curSlideIndex = 0, SLIDE_SPEED = 300,
                AUTO_SLIDE_SPEED = 300, HOT_SLIDE_WIDTH = 256)
            tests.init();
        })
        .catch((error) => console.error(error))
})();
