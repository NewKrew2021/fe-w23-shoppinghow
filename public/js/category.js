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

    /* 카테고리 데이터 추가 */
    showCategoryData() {
        /* async, await 적용 */
        async function inserData() {
            try {
                const res = await fetch(this.categoryURL);
                const data = await res.json();

                /* 맨 처음에는 상위 0번째 요소들로 기본 표시 */
                const createHTML = ({data, type, on = ''}) => data.reduce((acc, { title }, idx) => {
                    let str = '';
                    if (idx === 0) str = on;
                    return acc + domTpl[type](str, title, idx);
                }, ``);
                const mainTabObj = {data : data, type : 'mainCategory', on : "on"};
                const subTabObj = [{data : data[0].data, type : 'subCategory', on : "sub-on"},
                                   {data : data[0].data[0].data, type : 'lowCategory'}];

                innerHTML(this.mainTab, createHTML(mainTabObj));
                innerHTML(this.subTab_01, createHTML(subTabObj[0]));
                innerHTML(this.subTab_02, createHTML(subTabObj[1]));

                /* 마우스에 따라 메인탭에 on 넣기 */
                this.mainTab.addEventListener('mouseover', (e) => {
                    if (e.target.getAttribute('main-idx')) {
                        dom('.on').querySelector().classList.remove('on');
                        e.target.classList.add('on');
                    }
                })

                /* on이 표시된 곳의 main-idx를 구하고 그 값으로 소분류의 값들을 대체 */
            }
            catch (err) {
                console.error(err);
            }
        };
        inserData.bind(this)();
    }

    showCategory() {
        this.categoryBtn.src = '/images/close_btn.png';
        this.innerCategory.style.display = 'block';
        /* + category div 영역 보이기 */
    }
    closeCategory() {
        this.categoryBtn.src = '/images/category_btn.png';
        this.innerCategory.style.display = 'none';
        /* + category div 영역 감추기 */
    }
    onEvents() {
        this.category.addEventListener('mouseover', this.showCategory.bind(this));
        //this.category.addEventListener('mouseout', this.closeCategory.bind(this));
    }

    init() {
        this.showCategoryData();
        this.onEvents();
    }
}