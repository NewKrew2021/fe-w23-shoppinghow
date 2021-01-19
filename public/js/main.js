/*
    main.js
    
    초기 레이아웃을 구성하기 위한 클래스
    (1) 상단 헤더 부분
    (2) 첫번째 row의 grid 배너 사진 및 텍스트
    (3) 두번째 row(bottom)의 배너 사진 및 텍스트
*/
import { dom, addHTML } from './util.js';
import Slider from './slider.js';
import HotSlider from './hotslider.js';
import Storage from './storage.js';

export default class MainLayout {
    constructor() {
        /* 객체를 전달받아 dom을 다룰 예정 */
    }

    addKeyword() {
        const keyword = dom('.keyword-content').querySelector();
        const keyleft = dom('.keyword-list-left').querySelector();
        const keyright = dom('.keyword-list-right').querySelector();
        const rolled = dom('#rolled-list').querySelector();
        
        /* 5개씩 분리해서 각각 가져오고 있지만 10개로 합칠 예정 */
        fetch('http://localhost:80/topkey1')
            .then(res => res.json())
            .then(json => json.forEach(element => {
                addHTML(keyleft,
                    `<li class="auto-list">
                    <span class='bold mg-right-8'>${element.id}</span>${element.name}</li>`
                )
            }))
            .catch(console.error);

        fetch('http://localhost:80/topkey2')
            .then(res => res.json())
            .then(json => json.forEach(element => {
                addHTML(keyright,
                    `<li class="auto-list">
                    <span class='bold mg-right-8'>${element.id}</span>${element.name}</li>`
                )
            }))
            .catch(console.error);

        fetch('http://localhost:80/topkeyword')
            .then(res => res.json())
            .then(json => json.forEach((element, idx) => {
                addHTML(rolled,
                    `<li class="rolled-content font-20">${element.id}위 ${element.name}</li>`);
                if (idx === json.length - 1){
                    addHTML(rolled,
                        `<li class="rolled-content font-20">${json[0].id}위 ${json[0].name}</li>`) 
                }
            }))
    }

    addNav() {
        const top_nav_UL_1 = dom('#top-nav-ul-1').querySelector();
        const top_nav_UL_2 = dom('#top-nav-ul-2').querySelector();
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
    }

    addLeftBanner() {
        const leftBanner = dom('.row-0-left').querySelector();
        fetch('http://localhost:80/topleft')
            .then(res => res.json())
            .then(json => json.forEach(element => {
                addHTML(leftBanner, `<img src=${element.src}>`)
            }))
            .catch((error) => console.error(error))
    }

    addRightBanner() {
        const slideList = dom('.slide-list').querySelector();
        const target = {
            prevBtn: '.prev',
            nextBtn: '.next',
            wrapper: '.slide-list',
            content: '.slide-content',
            pagination: '.page',
            slideWidth: 485,
            showLength: 1,
            curSlideIndex: 0,
            slideSpeed: 300,
            auto_slideSpeed: 300
        };
        fetch('http://localhost:80/topright')
            .then(res => res.json())
            .then(json => json.forEach(element => {
                addHTML(slideList, `<div class="slide-content">
            <img src=${element.src}></div>`)
            }))
            .then(data => {
                const slideObject = new Slider(target);
                slideObject.init();
            })
            .catch((error) => console.error(error))
    }

    addBottom() {
        const slideList = dom('.slide-list-2').querySelector();
        const target = {
            curSlideIndex: 0,
            showLength: 5,
            slideSpeed: 300,
            auto_slideSpeed: 300,
            slideWidth: 256,
            slideLength: 5,
            pressedTime: 1500
        };
        let storages;

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
            .then(data => { storages = new Storage(); })
            .then(data => storages.clickSaveHandler())
            .then(data => {
                const tests = new HotSlider(target)
                tests.init();
            })
            .catch((error) => console.error(error))
    }

    addGrid() {
        const gridUL = dom('#grid-ul-1').querySelector();
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
    }

    init() {
        this.addKeyword();
        this.addNav();
        this.addLeftBanner();
        this.addRightBanner();
        this.addBottom();
        this.addGrid();
    }
}