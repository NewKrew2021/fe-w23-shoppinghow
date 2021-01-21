/*
    category.js
    스마트 카테고리 영역
    카테고리 관련 기능들
*/
import { dom } from './util.js'

export default class Category{

    constructor(){
        this.category = dom('.category').querySelector();
        this.categoryBtn = dom('.category-btn').querySelector();
        this.innerCategory = dom('.inner-category').querySelector();
    }

    /* 카테고리 데이터 추가 */
    addData(){

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
        this.onEvents();
    }
}