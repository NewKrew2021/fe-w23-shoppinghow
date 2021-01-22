/*
    main.js
    초기 레이아웃을 구성하기 위한 클래스
*/
import { dom, innerHTML, addHTML } from './util.js';
import { domTpl } from './tpl.js'
import Slider from './slider.js';
import HotSlider from './hotslider.js';
import Storage from './storage.js';

export default class MainLayout {
    constructor({keywordURL, leftBannerURL, rightBannerURL,
        hotBannerURL, gridBannerURL, keywordCnt}) {
        this.keywordURL = keywordURL;
        this.leftBannerURL = leftBannerURL;
        this.rightBannerURL = rightBannerURL;
        this.hotBannerURL = hotBannerURL;
        this.gridBannerURL = gridBannerURL;
        this.keywordCnt = keywordCnt;
    }

    addKeyword() {
        const keyleft = dom('.keyword-list-left').querySelector();
        const keyright = dom('.keyword-list-right').querySelector();
        const rolled = dom('#rolled-list').querySelector();
        /* async, await 적용 */
        async function inserData(){
            try{
                const res = await fetch(this.keywordURL);
                const data = await res.json();
                const createHTML = (data, type, s, e) => data.slice(s, e).reduce((acc, {id, name})=>{
                    return acc + domTpl[type](id, name);
                }, ``);
                innerHTML(keyleft, createHTML(data, 'autoList', 0, this.keywordCnt/2));
                innerHTML(keyright, createHTML(data, 'autoList', this.keywordCnt/2, this.keywordCnt));
                innerHTML(rolled, createHTML(data, 'rollList', 0, this.keywordCnt+1));
            }
            catch (err){
                console.error(err);
            }
        };
        inserData.bind(this)();
    }

    addNav() {
        const top_nav_UL_1 = dom('#top-nav-ul-1').querySelector();
        const top_nav_UL_2 = dom('#top-nav-ul-2').querySelector();
        innerHTML(top_nav_UL_1, domTpl['headNav1']());
        innerHTML(top_nav_UL_2, domTpl['headNav2']());
    }

    addLeftBanner() {
        const leftBanner = dom('.row-0-left').querySelector();
        async function inserData(){
            try{
                const res = await fetch(this.leftBannerURL);
                const data = await res.json();
                const createHTML = (data, type) => data.reduce((acc, {src})=>{
                    return acc + domTpl[type](src);
                }, ``);
                addHTML(leftBanner, createHTML(data, 'leftBanner'));
            }
            catch (err){
                console.error(err);
            }
        };
        inserData.bind(this)();
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
        async function inserData(){
            try{
                const res = await fetch(this.rightBannerURL);
                const data = await res.json();
                const createHTML = (data, type) => data.reduce((acc, {src})=>{
                    return acc + domTpl[type](src);
                }, ``);
                innerHTML(slideList, createHTML(data, 'rightBanner'));
                const slideObject = new Slider(target);
                slideObject.init();
            }
            catch (err){
                console.error(err);
            }
        };
        inserData.bind(this)();
    }

    addHot() {
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
        async function inserData(){
            try{
                const res = await fetch(this.hotBannerURL);
                const data = await res.json();
                const createHTML = (data, type) => data.reduce((acc, {src, title, text})=>{
                    return acc + domTpl[type](src, title, text);
                }, ``);
                innerHTML(slideList, createHTML(data, 'hotBanner'));
                const storages = new Storage();
                storages.clickSaveHandler();
                const slideObject = new HotSlider(target);
                slideObject.init();
            }
            catch (err){
                console.error(err);
            }
        };
        inserData.bind(this)();
    }

    addGrid() {
        const gridUL = dom('#grid-ul-1').querySelector();
        async function inserData(){
            try{
                const res = await fetch(this.gridBannerURL);
                const data = await res.json();
                const createHTML = (data, type) => data.reduce((acc, {src, title, text})=>{
                    return acc + domTpl[type](src, title, text);
                }, ``);
                innerHTML(gridUL, createHTML(data, 'gridBanner'));
                const storages = new Storage();
                storages.clickSaveHandler();
            }
            catch (err){
                console.error(err);
            }
        };
        inserData.bind(this)();
    }

    init() {
        this.addKeyword();
        this.addNav();
        this.addLeftBanner();
        this.addRightBanner();
        this.addHot();
        this.addGrid();
    }
}