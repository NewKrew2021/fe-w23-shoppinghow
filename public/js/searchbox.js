/*
    searchbox.js
    쇼핑하우 검색창 관련 모듈
*/
import { dom, addHTML, getCorrect, innerHTML } from './util.js';
//import { words } from '../data/keyword.js';

export default class SearchBox {
    constructor(input) {
        this.search_blank = dom('.search-blank').querySelector();
        this.keywordWrapper = dom('.keyword').querySelector();
        this.keywordInner = dom('.keyword-inner').querySelector();
        this.autoInner = dom('.auto-complete').querySelector();
        this.search_input = dom('.search-input').querySelector();
        this.search_box = dom('.search-box').querySelector();
        this.rolledList = dom('#rolled-list').querySelector();

        this.ROLL_COUNT = input.COUNT;
        this.ROLL_SPEED = input.SPEED;
        this.ROLL_HEIGHT = input.HEIGHT;
        this.RELEASE_TIME = input.RELEASE_TIME;
        this.index = 1;
    }

    /* 케이스별 keyword 영역 표시 관련한 이벤트 */
    showKeywordBox() {
        /* 입력창에 입력을 시작할 때 */
        this.search_input.addEventListener('keyup', (e) => {
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
        /* 검색창 어디라도 누르면 입력할 수 있게 포커스 주기 */
        this.search_blank.addEventListener('click', () => {
            this.rolledList.style.display = 'none';
            this.keywordWrapper.style.display = 'block';
            this.search_input.focus();
        })
        /* 입력창 포커스가 해제될 때 */
        this.search_input.addEventListener('blur', () => {
            this.keywordWrapper.style.display = 'none';
            this.rolledList.style.display = 'block';
            this.search_input.value = "";
            innerHTML(this.autoInner, "");
            this.keywordInner.style.display = 'block';
        })
        /* 검색창에서 마우스를 떼면 포커스가 사라지게 (mouseout은 자식요소 모두) */
        this.search_blank.addEventListener('mouseleave', ()=>{
            setTimeout(()=>{
                this.search_input.blur();
            }, this.RELEASE_TIME);
        });
    }

    fetchAllKeywords() {
        fetch('http://localhost:80/allkeyword')
            .then(res => res.json())
            .then(json => this.autoComplete(json));
    }

    /* 검색어 자동완성 */
    autoComplete(words) {
        this.search_input.addEventListener('input', (e) => {
            function getCorrect(word) {
                if (word.includes(value.replace(/(\s*)/g, "")) ||
                    word.replace(/(\s*)/g, "").includes(value.replace(/(\s*)/g, "")))
                    return word;
            }
            const value = e.target.value.trim(); // 공백 제거
            let resultList = words.filter(getCorrect); // 공백 포함 일치하는 input 문자열 모두 저장
            resultList = resultList.slice(0, 10); // 저장된 리스트를 최대 10개까지만 보이도록 함
            let resultHtml = '';

            resultList.forEach((word) => {
                const valueLength = value.length;
                const startPos = word.indexOf(value[0]);

                // startPos 이후부터 확인(2번째 파라미터)
                const endPos = word.indexOf(value[valueLength - 1], startPos);
                word = word.slice(0, startPos) + "<span class='accent'>"
                    + word.slice(startPos, endPos + 1) + "</span>" + word.slice(endPos + 1);
                resultHtml += `<li class="auto-list">${word}</li>`
            });
            innerHTML(this.autoInner, resultHtml);
        })
    }

    /* 키워드 롤링 */
    rollKeywords() {
        this.rolledList.style = "top: -4px";
        this.rolledList.style.transition = this.ROLL_SPEED + "ms";
        const rolling = () => {
            if (this.index <= this.ROLL_COUNT) {
                this.rolledList.style.transition =
                    this.ROLL_SPEED + "ms";
                this.rolledList.style.transform =
                    "translateY(-" + (this.ROLL_HEIGHT * this.index) + "px)";
            }
            if (this.index == this.ROLL_COUNT) {
                setTimeout(() => {
                    this.rolledList.style.transition = "0ms";
                    this.rolledList.style.transform = "translateY(0px)";
                }, this.ROLL_SPEED);
                this.index = 0;
            }
            setTimeout(() => {
                ++this.index;
                rolling();
            }, 2000);
        }
        rolling();
    }

    init() {
        this.showKeywordBox();
        this.rollKeywords();
        this.fetchAllKeywords();
    }
}