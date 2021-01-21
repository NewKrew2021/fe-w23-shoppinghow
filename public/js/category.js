/*
    category.js
    스마트 카테고리 영역
    카테고리 관련 기능들
*/
import { dom, domTpl, innerHTML } from './util.js'

export default class Category {
    constructor({ URL }) {
        this.category = dom('.category').querySelector();
        this.categoryBtn = dom('.category-btn').querySelector();
        this.innerCategory = dom('.inner-category').querySelector();
        this.mainTab = dom('.main-tab').querySelector();
        this.subTab_01 = dom('#sub-tab-01').querySelector();
        this.subTab_02 = dom('#sub-tab-02').querySelector();
        this.categoryURL = URL;
    }

    /* 데이터 가져오고 추가하기 */
    addCategoryData() {
        (async function () {
            const res = await fetch(this.categoryURL);
            const json = await res.json();

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
        }).bind(this)().then(json => this.selectCategory(json));
    }

    /* 카테고리 데이터 추가 */
    selectCategory(json) {
        const createHTML = ({ data, type, on = '' }) => data.reduce((acc, { title }, idx) => {
            let str = '';
            if (idx === 0) str = on;
            return acc + domTpl[type](str, title, idx);
        }, ``);
        /* on이 표시된 곳의 idx를 구하고 그 값으로 소분류의 값들을 대체 */
        /* 마우스에 따라 메인탭에 on 넣기 */
        this.mainTab.addEventListener('mouseover', (e) => {
            const mainIdx = e.target.getAttribute('main-idx');
            if (mainIdx) { // 유효한 인덱스일 경우
                dom('.on').querySelector().classList.remove('on');
                e.target.classList.add('on');
                const subObj_01 = { data: json[mainIdx].data, type: 'subCategory', on: "sub-on" };
                innerHTML(this.subTab_01, createHTML(subObj_01));
            }
        })
        this.subTab_01.addEventListener('mouseover', (e)=>{
            const subIdx = e.target.getAttribute('sub-idx');
            if(subIdx){ // 유효한 인덱스일 경우
                dom('.sub-on').querySelector().classList.remove('sub-on');
                e.target.classList.add('sub-on');
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

    onEvents() {
        this.category.addEventListener('mouseover', this.showCategory.bind(this));
        //this.category.addEventListener('mouseout', this.closeCategory.bind(this));
    }

    init() {
        this.onEvents();
        this.addCategoryData();
    }
}