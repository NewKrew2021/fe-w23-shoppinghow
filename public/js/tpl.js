import { dom } from './util.js';

/* dom template */
export const domTpl = {
    headNav1(){
        return `<li class="top-nav-li">핫딜</li>
        <li class="top-nav-li">베스트100</li>
        <li class="top-nav-li">할인특가</li>
        <li class="top-nav-li">기획전</li>`
    },
    headNav2(){
        return  `<li class="top-nav-li font-gray">#마스크</li>
        <li class="top-nav-li font-gray">#스노우체인</li>
        <li class="top-nav-li font-gray">#DIY키트</li>
        <li class="top-nav-li font-gray">#비타민</li>
        <li class="top-nav-li font-gray">#2021팬톤가구</li>`
    },
    autoList(id, name){
        return `<li class='auto-list'>
        <span class='bold mg-right-8'>${id}</span>${name}</li>`
    },
    rollList(id, name){
        return `<li class="rolled-content font-20">${id}위 ${name}</li>`
    },
    leftBanner(src){
        return `<img src=${src}>`
    },
    rightBanner(src){
        return `<div class="slide-content"><img src=${src}></div>`
    },
    hotBanner(src, title, text){
        return `<li class="slide-content-2">
        <img class="banner-img" src=${src}>
        <p class="title">${title}</p>
        <p class="subtext">${text}</p>
        <img class="theme-btn" src="/images/theme.png"></li>`
    },
    gridBanner(src, title, text){
        return `<li class="grid-banner">
        <img class="banner-img" src=${src}>
        <p class="title">${title}</p>
        <p class="subtext">${text}</p>
        <img class="theme-btn" src="/images/theme.png"></li>`
    },
    mainCategory(on, title, idx){
        return `<li class="main-tab-list ${on}" main-idx=${idx}>${title}</li>`
    },
    subCategory(on, title, idx){
        return `<li class="sub-tab-list ${on}" sub-idx=${idx}>${title}</li>`
    },
    lowCategory(on = '', title, idx){
        return `<li class="last-tab-list" last-idx=${idx}><a href='#'>${title}</li>`
    }
};
