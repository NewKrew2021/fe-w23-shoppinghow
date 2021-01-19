/*
    searchbox.js
    쇼핑하우 검색창 관련 모듈
*/
import { dom, addHTML, innerHTML } from './util.js';
import { words } from '../data/keyword.js';

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
            const value = e.target.value.trim(); // 공백 제거
            function getCorrect(word) {
                if (word.includes(value.replace(/(\s*)/g, "")) ||
                    word.replace(/(\s*)/g, "").includes(value.replace(/(\s*)/g, "")))
                    return word;
            }
            const resultList = words.filter(getCorrect); // 공백 포함 일치하는 input 문자열 모두 저장
            let resultHtml = '';
            resultList.forEach((word) => {
                const valueLength = value.length;
                const startPos = word.indexOf(value[0]);
                const endPos = word.indexOf(value[valueLength - 1]);
                word =
                    word.slice(0, startPos)
                    + "<span class='accent'>"
                    + word.slice(startPos, endPos + 1) + "</span>"
                    + word.slice(endPos + 1);
                resultHtml += `<li class="auto-list">${word}</li>`
            });
            innerHTML(this.autoInner, resultHtml);
        })
    }

    init() {
        this.showKeywordBox();
        this.autoComplete();
    }
}