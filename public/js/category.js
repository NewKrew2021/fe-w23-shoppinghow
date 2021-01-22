/*
    category.js
    스마트 카테고리 영역
    카테고리 관련 기능들
*/
import { dom, debounce, innerHTML } from './util.js'
import { domTpl } from './tpl.js'

export default class Category {
    constructor({ URL }) {
        this.category = dom('.category').querySelector();
        this.categoryBtn = dom('.category-btn').querySelector();
        this.innerCategory = dom('.inner-category').querySelector();
        this.mainTab = dom('.main-tab').querySelector();
        this.subTab_01 = dom('#sub-tab-01').querySelector();
        this.subTab_02 = dom('#sub-tab-02').querySelector();
        this.categoryURL = URL;
        this.mainTabLen = 0;
        this.totalX = 0;
        this.totalY = 0;
        this.moveX = 0;
        this.moveY = 0;
    }

    /* 데이터 가져오고 추가하기 */
    addCategoryData() {
        (async function () {
            const res = await fetch(this.categoryURL);
            const json = await res.json();
            this.mainTabLen = json.length;

            /* 맨 처음에는 상위 0번째 요소들로 기본 표시 */
            const mainTabObj = { data: json, type: 'mainCategory', on: "on" };
            const subTabObj = [{ data: json[0].data, type: 'subCategory', on: "sub-on" },
            { data: json[0].data[0].data, type: 'lowCategory' }];
            const createHTML = ({ data, type, on = '' }) => data.reduce((acc, { title }, idx) => {
                let str = '';
                if (idx === 0) str = on;
                return acc + domTpl[type](str, title, idx);
            }, ``);
            innerHTML(this.mainTab, createHTML(mainTabObj));
            innerHTML(this.subTab_01, createHTML(subTabObj[0]));
            innerHTML(this.subTab_02, createHTML(subTabObj[1]));

            return json;
        }).bind(this)().then(json => this.selectCategory({ json: json, len: this.mainTabLen }));
    }

    /* 카테고리 데이터 추가 */
    selectCategory({ json, len }) {
        const createHTML = ({ data, type, on = '' }) => data.reduce((acc, { title }, idx) => {
            let str = '';
            if (idx === 0) str = on;
            return acc + domTpl[type](str, title, idx);
        }, ``);

        /* 메인탭(mainIdx) -> 중분류(subIdx) -> 소분류 */
        let mainIdx, subIdx;

        this.mainTab.addEventListener('mouseover', (e) => {
            mainIdx = e.target.getAttribute('main-idx');
            if (!mainIdx) mainIdx = len -1;
            // 유효한 인덱스일 경우
            dom('.on').querySelector().classList.remove('on');
            e.target.classList.add('on');
            const subObj_01 = { data: json[mainIdx].data, type: 'subCategory', on: "sub-on" };
            const subObj_02 = { data: json[mainIdx].data[0].data, type: 'lowCategory' };
            innerHTML(this.subTab_01, createHTML(subObj_01));
            innerHTML(this.subTab_02, createHTML(subObj_02)); // 메인 탭을 바꾸면 소분류는 처음으로 고정 위해
        })
        this.subTab_01.addEventListener('mouseover', (e) => {
            subIdx = e.target.getAttribute('sub-idx');
            if (subIdx) { // 유효한 인덱스일 경우
                dom('.sub-on').querySelector().classList.remove('sub-on');
                e.target.classList.add('sub-on');
                const subObj_02 = { data: json[mainIdx].data[subIdx].data, type: 'lowCategory' };
                innerHTML(this.subTab_02, createHTML(subObj_02));
            }
        })
    }
    showCategory() {
        this.categoryBtn.src = '/images/close_btn.png';
        this.innerCategory.style.display = 'block';
    }
    closeCategory() {
        this.categoryBtn.src = '/images/category_btn.png';
        this.innerCategory.style.display = 'none';
    }

    getMouseSpeed() {
        //timer;
        this.mainTab.style.pointerEvents = "none"
        /* 속도 재기 */
        this.innerCategory.addEventListener("mousemove", (e) => {
            this.totalX += Math.abs(e.movementX);
            this.totalY += Math.abs(e.movementY);
            this.moveX += e.movementX;
            this.moveY += e.movementY;
        });
        /* 처리 */
        setTimeout(function run(){
            if(this.totalX <= 5 && this.totalY <= 5)
                this.mainTab.style.pointerEvents = "auto"
            else
                this.mainTab.style.pointerEvents = "none"
            this.moveX = this.moveY = this.totalX = this.totalY = 0;
            setTimeout(run.bind(this), 30)
        }.bind(this), 30); 
    }

    onEvents() {
        this.category.addEventListener('mouseover', this.showCategory.bind(this));
        this.category.addEventListener('mouseout', this.closeCategory.bind(this));
    }

    init() {
        this.onEvents();
        this.addCategoryData();
        this.getMouseSpeed();
    }
}