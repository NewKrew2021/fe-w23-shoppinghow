/*
    category.js
    스마트 카테고리 영역
    카테고리 관련 기능들
*/
import { dom, domTpl, innerHTML } from './util.js'

export default class Category{
    constructor({URL}){
        this.category = dom('.category').querySelector();
        this.categoryBtn = dom('.category-btn').querySelector();
        this.innerCategory = dom('.inner-category').querySelector();
        this.mainTab = dom('.main-tab').querySelector();
        this.subTab_01 = dom('#sub-tab-01').querySelector();
        this.subTab_02 = dom('#sub-tab-02').querySelector();
        this.categoryURL = URL;
    }

    /* 카테고리 데이터 추가 */
    addData(){
        /* async, await 적용 */
        async function inserData(){
            try{
                const res = await fetch(this.categoryURL);
                const data = await res.json();
                const createHTML = (data, type) => data.reduce((acc, {title}, idx)=>{
                    return acc + domTpl[type](title, idx);
                }, ``);
                innerHTML(this.mainTab, createHTML(data, 'mainCategory'));

                /* 0 패션/뷰티 - */

            }
            catch (err){
                console.error(err);
            }
        };
        inserData.bind(this)();
    }

    showCategory(){
        this.categoryBtn.src = '/images/close_btn.png';
        this.innerCategory.style.display = 'block';
        /* + category div 영역 보이기 */
    }
    closeCategory(){
        this.categoryBtn.src = '/images/category_btn.png';
        this.innerCategory.style.display = 'none';
        /* + category div 영역 감추기 */
    }

    onEvents(){
        this.category.addEventListener('mouseover', this.showCategory.bind(this));
        this.category.addEventListener('mouseout', this.closeCategory.bind(this));
    }

    init(){
        this.addData();
        this.onEvents();
    }
}