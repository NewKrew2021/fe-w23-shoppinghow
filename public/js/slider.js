/*
    slide.js
    슬라이드쇼 기능을 구현하는 함수 (함수 길이가 길어져서 수정 계획 중)
    클래스로 변경해 보기
*/
class Slider {
    constructor(prevBtn, nextBtn, wrapper, content,
        pagination = undefined, slidewidth, showlength,
        curSlideIndex, slidespeed, auto_slidespeed) {

        /* 많은 DOM 요소들 */
        this.slidePrevBtn = DOM(prevBtn).querySelector();
        this.slideNextBtn = DOM(nextBtn).querySelector();
        this.slideList = DOM(wrapper).querySelector();
        this.slideContent = DOM(content).querySelectorAll();
        this.pagination = DOM(pagination).querySelectorAll();

        this.firstSlide = this.slideList.firstElementChild;
        this.lastSlide = this.slideList.lastElementChild;
        this.copyFirstSlide = this.firstSlide.cloneNode(true);
        this.copyLastSlide = this.lastSlide.cloneNode(true);
        this.slideLength = this.slideContent.length;
        this.curSlide = this.slideContent[0];

        this.SLIDE_WIDTH = slidewidth;
        this.SHOW_LENGTH = showlength;
        this.curSlideIndex = curSlideIndex;
        this.SLIDE_SPEED = slidespeed;
        this.AUTO_SLIDE_SPEED = auto_slidespeed;
    }

    onReady() {
        /* 이벤트 등록 전 레이아웃 준비 */
        this.slideList.appendChild(this.copyFirstSlide);
        this.slideList.insertBefore(this.copyLastSlide, this.slideList.firstElementChild);
        this.slideList.style.width = (this.SLIDE_WIDTH) * (this.slideLength * 2) + "px";
        this.slideList.style.transform =
            "translate3d(-" + ((this.SLIDE_WIDTH) * (curSlideIndex + this.SHOW_LENGTH)) + "px, 0px, 0px)";
    }

    onEvents() {
        /* 이벤트 핸들러 등록 (하단 페이지 내비게이터는 옵션으로 부여) */
        this.slidePrevBtn.addEventListener('click', () => this.prevBtnClickHandler());
        this.slideNextBtn.addEventListener('click', () => this.nextBtnClickHandler());
        if(this.pagination !== undefined){
            this.pagination.forEach((element) => {
                element.addEventListener('mouseenter', (e) => this.paginationHandler(e));
            })
        }
    }

    /* 페이지 내비게이터가 있을 경우에만 동작 */
    prevPageNavigator() {
        this.pagination[(curSlideIndex === this.slideLength) ? 0 :
            curSlideIndex].classList.remove('active');
        this.curSlide = this.slideContent[--curSlideIndex];
        this.pagination[curSlideIndex].classList.add('active');
    }

    nextPageNavigator() {
        this.pagination[(curSlideIndex === -1) ? this.slideLength - 1 :
            curSlideIndex].classList.remove('active');
        this.curSlide = this.slideContent[++curSlideIndex];
        this.pagination[curSlideIndex].classList.add('active');
    }

    /* 이전, 다음 버튼 클릭 이벤트 */
    prevBtnClickHandler() {
        if (curSlideIndex >= 0) {
            this.slideList.style.transition = this.SLIDE_SPEED + "ms";
            this.slideList.style.transform =
                "translate3d(-" + (this.SLIDE_WIDTH * (curSlideIndex)) + "px, 0px, 0px)";
        }
        // 첫 번째 슬라이드에 도달했을 경우, 맨 끝으로 돌아가게 한다.
        if (curSlideIndex === 0) {
            setTimeout(() => {
                this.slideList.style.transition = "0ms";
                this.slideList.style.transform =
                    "translate3d(-" + (this.SLIDE_WIDTH * this.slideLength) + "px, 0px, 0px)";
            }, this.AUTO_SLIDE_SPEED);
            curSlideIndex = this.slideLength;
        }

        if(this.pagination !== undefined)
            prevPageNavigator();
    }

    nextBtnClickHandler() {
        if (curSlideIndex <= this.slideLength - 1) {
            this.slideList.style.transition = this.SLIDE_SPEED + "ms";
            this.slideList.style.transform =
                "translate3d(-" + (this.SLIDE_WIDTH * (curSlideIndex + (this.SHOW_LENGTH + 1))) + "px, 0px, 0px)";
        }
        // 마지막 슬라이드에 도달했을 경우, 맨 처음으로 돌아가게 한다.
        if (curSlideIndex === this.slideLength - 1) {
            setTimeout(() => {
                this.slideList.style.transition = "0ms";
                this.slideList.style.transform = "translate3d(-" + (this.SLIDE_WIDTH) + "px, 0px, 0px)";
            }, this.AUTO_SLIDE_SPEED);
            curSlideIndex = -1;
        }

        if(this.pagination !== undefined)
            nextPageNavigator();
    }

    /* (필요할 경우에만) 내비게이터 마우스 오버 이벤트 */
    paginationHandler(e) {
        DOM('.active').querySelector().classList.remove('active');
        e.target.className += " active";

        /* 배너 변화시키기 */
        let index = Number(e.target.getAttribute("data"));
        this.curSlide = this.slideContent[index];
        this.slideList.style.transition = this.SLIDE_SPEED + "ms";
        this.slideList.style.transform =
            "translate3d(-" + (this.SLIDE_WIDTH) * (index + 1) + "px, 0px, 0px)";
        curSlideIndex = index;
    }

    init() {
        /* 실행 메서드 */
        this.onReady();
        this.onEvents();
    }
}