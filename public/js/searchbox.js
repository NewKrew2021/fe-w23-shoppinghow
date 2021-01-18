/*
    searchbox.js
    쇼핑하우 검색창 관련 모듈
*/
import { dom } from './util.js';

// 클래스화 - 모듈
export default class SearchBox{
    constructor(){
        this.search_blank = dom('.search-input').querySelector();
        this.keywordWrapper = dom('.keyword').querySelector();
        this.keywordInner = dom('.keyword-inner').querySelector();
        this.autoInner = dom('.auto-complete').querySelector();
        this.search_input = dom('.search-input').querySelector();
    }

    /* 포커스 시 keyword 영역 표시 */
    showKeywordBox(){
        this.search_input.addEventListener('input',(e)=>{
            const value = e.target.value;
            if(value === ''){
                this.autoInner.style.display = 'none';
                this.keywordInner.style.display = 'block';
            }
            else{
                this.autoInner.style.display = 'block';
                this.keywordInner.style.display = 'none';
            }
        });
        this.search_blank.addEventListener('focus', ()=>{
            this.keywordWrapper.style.display = 'block';
        })
        this.search_blank.addEventListener('blur',()=>{
            this.keywordWrapper.style.display = 'none';
        })
    }
}