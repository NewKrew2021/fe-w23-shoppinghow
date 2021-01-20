/*
    searchbox.js
    쇼핑하우 검색창 관련 모듈
*/
import { dom, removeSpace, getStartPos, innerHTML } from './util.js';

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
        this.selectIdx = -1;
    }

    /* 케이스별 keyword 영역 표시 관련한 이벤트 */
    showKeywordBox() {
        /* 검색창에서 마우스를 떼면 포커스가 사라지게 (mouseout은 자식요소 모두) */
        this.search_blank.addEventListener('mouseleave', () => {
             setTimeout(() => {
                this.search_input.blur();
                this.selectIdx = -1;
             }, this.RELEASE_TIME);
        });
        /* 입력창에 입력을 시작할 때 */
        this.search_input.addEventListener('keydown', (e) => {
            const value = e.target.value;
            if (value === '') {
                innerHTML(this.autoInner, "");
                this.keywordInner.style.display = 'block';
                this.autoInner.style.display = 'none';
            }
            else {
                this.autoInner.style.display = 'block';
                this.keywordInner.style.display = 'none';

                switch (e.keyCode) {
                    case 40: // 아래 방향키
                        let autolistsDOWN = this.autoInner.children;
                        // 인덱스가 검색 결과 끝까지 왔을 경우 초기화
                        if (dom('.selected').querySelector() !== undefined) {
                            dom('.selected').querySelector().classList.remove('selected');
                        }
                        this.selectIdx++;
                        // 끝에 도달했을 경우
                        if (this.selectIdx === autolistsDOWN.length) {
                            this.selectIdx = 0;
                        }
                        autolistsDOWN[this.selectIdx].classList.add('selected');
                        this.search_input.value = autolistsDOWN[this.selectIdx].textContent;
                        break;

                    case 38: // 위 방향키
                        let autolistsUP = this.autoInner.children;
                        if (dom('.selected').querySelector() !== undefined) {
                            dom('.selected').querySelector().classList.remove('selected');
                        }
                        // 처음에 도달했을 경우
                        if (this.selectIdx === 0) {
                            this.selectIdx = autolistsUP.length;
                        }
                        this.selectIdx--;
                        autolistsUP[this.selectIdx].classList.add('selected');
                        this.search_input.value = autolistsUP[this.selectIdx].textContent;
                        break;
                }
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
            this.selectIdx = -1;
        })

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
                if (word.includes(removeSpace(value)) ||
                    removeSpace(word).includes(removeSpace(value))) {
                    return word;
                }
            }
            const value = removeSpace(e.target.value); // 공백 검색의 일관성 위해서 입력중인 단어도 공백 제거
            let resultList = words.filter(getCorrect).slice(0, 10); // 저장된 리스트를 최대 10개까지만 보이도록 함
            let resultHtml = ''; // 공백 포함 일치하는 문자열 모두 저장

            resultList.forEach((word) => {
                let valueLength = value.length;
                let startPos = word.search(value); // search는 정확히 일치하는 단어의 첫 위치를 반환한다.

                // 만약 startPos가 -1이라면, word의 공백 때문에 그런 것이므로 getStartPos로 값 변경
                if (startPos === -1) startPos = getStartPos(word, value);

                // 입력한 단어와 꼭 맞게 강조될 수 있도록 endPos 설정 후 html 저장
                let endPos = word.indexOf(value[valueLength - 1], startPos + valueLength - 1);
                word = word.slice(0, startPos)
                    + "<span class='accent'>"
                    + word.slice(startPos, endPos + 1)
                    + "</span>" + word.slice(endPos + 1);
                resultHtml += `<li class="auto-list"><span class='mg-left-20'>${word}</span></li>`
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