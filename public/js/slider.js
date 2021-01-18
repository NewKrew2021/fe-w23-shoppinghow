/*
    slider.js

    슬라이드쇼 모듈
*/
import { dom } from './util.js'

export default class Slider {
    constructor(target) {
        /* 많은 dom 요소들 */
        this.slidePrevBtn = dom(target.prevBtn).querySelector();
        this.slideNextBtn = dom(target.nextBtn).querySelector();
        this.slideList = dom(target.wrapper).querySelector();
        this.slideContent = dom(target.content).querySelectorAll();
        this.pagination = dom(target.pagination).querySelectorAll();
        this.curSlide = this.slideContent[0];

        this.SLIDE_LENGTH = this.slideContent.length;
        this.SLIDE_WIDTH = target.slideWidth;
        this.SHOW_LENGTH = target.showLength;
        this.SLIDE_SPEED = target.slideSpeed;
        this.AUTO_SLIDE_SPEED = target.auto_slideSpeed;
        this.curSlideIndex = target.curSlideIndex;
    }

    init() {
        /* 실행 메서드 */
        this.onReady();
        this.onEvents();
    }

    onReady() {
        this.setLayout();
    }

    onEvents() {
        /* 이벤트 핸들러 등록 (하단 페이지 내비게이터는 옵션으로 부여) */
        this.slidePrevBtn.addEventListener('click', () => this.prevBtnClickHandler());
        this.slideNextBtn.addEventListener('click', () => this.nextBtnClickHandler());
        if (this.pagination !== undefined) {
            this.pagination.forEach((element) => {
                element.addEventListener('mouseenter', (e) => this.paginationHandler(e));
            })
        }
    }

    /* 이벤트 등록 전 레이아웃 준비 */
    setLayout() { 
        for (let i = 0; i < this.SLIDE_LENGTH / 2; i++) {
            this.slideList.appendChild(this.slideContent[i].cloneNode(true));
        }
        for (let i = this.SLIDE_LENGTH - 1; i >= this.SLIDE_LENGTH / 2; i--) {
            this.slideList.insertBefore(this.slideContent[i].cloneNode(true),
                this.slideList.firstElementChild);
        }
        this.slideList.style.width = (this.SLIDE_WIDTH) * (this.SLIDE_LENGTH * 2) + "px";
        this.slideList.style.transform =
            "translate3d(-" + ((this.SLIDE_WIDTH) * (this.curSlideIndex + this.SHOW_LENGTH)) + "px, 0px, 0px)";
    }

    /* 페이지 내비게이터가 있을 경우에만 동작 */
    prevPageNavigator() {
        this.pagination[(this.curSlideIndex === this.SLIDE_LENGTH) ? 0 :
            this.curSlideIndex].classList.remove('active');
        this.curSlide = this.slideContent[--this.curSlideIndex];
        this.pagination[this.curSlideIndex].classList.add('active');
    }

    nextPageNavigator() {
        this.pagination[(this.curSlideIndex === -1) ? this.SLIDE_LENGTH - 1 :
            this.curSlideIndex].classList.remove('active');
        this.curSlide = this.slideContent[++this.curSlideIndex];
        this.pagination[this.curSlideIndex].classList.add('active');
    }

    /* 이전, 다음 버튼 클릭 이벤트 */
    prevBtnClickHandler() {
        if (this.curSlideIndex >= 0) {
            this.slideList.style.transition = this.SLIDE_SPEED + "ms";
            this.slideList.style.transform =
                "translate3d(-" + (this.SLIDE_WIDTH * (this.curSlideIndex)) + "px, 0px, 0px)";
        }
        // 첫 번째 슬라이드에 도달했을 경우, 맨 끝으로 돌아가게 한다.
        if (this.curSlideIndex === 0) {
            setTimeout(() => {
                this.slideList.style.transition = "0ms";
                this.slideList.style.transform =
                    "translate3d(-" + (this.SLIDE_WIDTH * this.SLIDE_LENGTH) + "px, 0px, 0px)";
            }, this.AUTO_SLIDE_SPEED);
            this.curSlideIndex = this.SLIDE_LENGTH;
        }

        if (this.pagination !== undefined)
            this.prevPageNavigator();
    }

    nextBtnClickHandler() {
        if (this.curSlideIndex <= this.SLIDE_LENGTH - 1) {
            this.slideList.style.transition = this.SLIDE_SPEED + "ms";
            this.slideList.style.transform =
                "translate3d(-" + (this.SLIDE_WIDTH * (this.curSlideIndex + (this.SHOW_LENGTH + 1))) + "px, 0px, 0px)";
        }
        // 마지막 슬라이드에 도달했을 경우, 맨 처음으로 돌아가게 한다.
        if (this.curSlideIndex === this.SLIDE_LENGTH - 1) {
            setTimeout(() => {
                this.slideList.style.transition = "0ms";
                this.slideList.style.transform = "translate3d(-" + (this.SLIDE_WIDTH) + "px, 0px, 0px)";
            }, this.AUTO_SLIDE_SPEED);
            this.curSlideIndex = -1;
        }

        if (this.pagination !== undefined)
            this.nextPageNavigator();
    }

    /* (필요할 경우에만) 내비게이터 마우스 오버 이벤트 */
    paginationHandler(e) {
        const {target} = e;
        dom('.active').querySelector().classList.remove('active');
        target.className += " active";

        /* 배너 변화시키기 */
        let index = Number(e.target.getAttribute("data"));
        this.curSlide = this.slideContent[index];
        this.slideList.style.transition = this.SLIDE_SPEED + "ms";
        this.slideList.style.transform =
            "translate3d(-" + (this.SLIDE_WIDTH) * (index + 1) + "px, 0px, 0px)";
        this.curSlideIndex = index;
    }
}