/*
    searchbox.js
    쇼핑하우 검색창 관련 모듈
*/
import { dom, addHTML, innerHTML } from './util.js';

/* 자동완성 데이터 */
const words = [
    '겨울 슬리퍼', '겨울 원피스', '겨울 이불', '크록스 겨울 슬리퍼',
    '남성 겨울바지', '겨울 실내화', '남성 겨울 등산 바지', '여성 겨울 바지',
    '여름 이불', '남성 여름 반바지', '여름 신발', '봄 신발', '겨울 패딩',
    '롱패딩'
];

// 클래스화 - 모듈
export default class SearchBox {
    constructor() {
        this.search_blank = dom('.search-input').querySelector();
        this.keywordWrapper = dom('.keyword').querySelector();
        this.keywordInner = dom('.keyword-inner').querySelector();
        this.autoInner = dom('.auto-complete').querySelector();
        this.search_input = dom('.search-input').querySelector();
    }

    /* 포커스 시 keyword 영역 표시 */
    showKeywordBox() {
        this.search_input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value === '') {
                this.autoInner.style.display = 'none';
                this.keywordInner.style.display = 'block';
            }
            else {
                this.autoInner.style.display = 'block';
                this.keywordInner.style.display = 'none';
            }
        });
        this.search_blank.addEventListener('focus', () => {
            this.keywordWrapper.style.display = 'block';
        })
        this.search_blank.addEventListener('blur', () => {
            this.keywordWrapper.style.display = 'none';
        })
    }

    autoComplete() {
        this.search_input.addEventListener('input', (e) => {
            const value = e.target.value.trim();
            function getCorrect(word) {
                if (word.includes(value.replace(/(\s*)/g, "")) ||
                    word.replace(/(\s*)/g, "").includes(value.replace(/(\s*)/g, "")))
                    return word;
            }
            const result = words.filter(getCorrect); // 공백 포함 일치하는 input 문자열 모두 저장
            let resultList = '';
            result.forEach((word) => {
                const valueLength = value.length;
                const startPos = word.indexOf(value[0]);
                const endPos = word.indexOf(value[valueLength-1]);
                word = 
                word.slice(0, startPos)
                + "<span class='accent'>"
                + word.slice(startPos, endPos+1) + "</span>"
                + word.slice(endPos+1);
                resultList += `<li class="auto-list">${word}</li>`
            });
            innerHTML(this.autoInner, resultList);
        })
    }
}