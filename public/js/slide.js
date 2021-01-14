/*
    slide.js
    슬라이드쇼 기능을 구현하는 함수 (함수 길이가 길어져서 수정 계획 중)
    클래스로 변경해 보기
*/
class Slider {
    constructor() {
        /* 많은 DOM 요소들 */
        this.slideNextBtn = DOM('.next').querySelector();
        this.slidePrevBtn = DOM('.prev').querySelector();
        this.slideList = DOM('.slide-list').querySelector();
        this.slideContent = DOM('.slide-content').querySelectorAll();
        this.pagination = DOM('.page').querySelectorAll();
        this.firstSlide = this.slideList.firstElementChild;
        this.lastSlide = this.slideList.lastElementChild;
        this.copyFirstSlide = this.firstSlide.cloneNode(true);
        this.copyLastSlide = this.lastSlide.cloneNode(true);
        this.slideLength = this.slideContent.length;
        this.curSlide = this.slideContent[0];
    }

    onReady() {
        /* 이벤트 등록 전 레이아웃 준비 */
        this.slideList.appendChild(this.copyFirstSlide);
        this.slideList.insertBefore(this.copyLastSlide, this.slideList.firstElementChild);
        this.slideList.style.width = (SLIDE_WIDTH) * (this.slideLength + 2) + "px";
        this.slideList.style.transform = "translate3d(-" + ((SLIDE_WIDTH) * (curSlideIndex + 1)) + "px, 0px, 0px)";
    }

    onEvents() {
        /* 이벤트 핸들러 등록 */
        this.slidePrevBtn.addEventListener('click', ()=> this.prevBtnClickHandler());
        this.slideNextBtn.addEventListener('click', ()=> this.nextBtnClickHandler());
        this.pagination.forEach((element)=>{
            element.addEventListener('mouseenter',(e) => this.paginationHandler(e));
        })
    }

    /* 이전, 다음 버튼 클릭 이벤트 */
    prevBtnClickHandler() {
        if (curSlideIndex >= 0) {
            this.slideList.style.transition = SLIDE_SPEED + "ms";
            this.slideList.style.transform =
                "translate3d(-" + (SLIDE_WIDTH * (curSlideIndex)) + "px, 0px, 0px)";
        }
        // 첫 번째 슬라이드에 도달했을 경우, 맨 끝으로 돌아가게 한다.
        if (curSlideIndex === 0) {
            setTimeout(() => {
                this.slideList.style.transition = "0ms";
                this.slideList.style.transform =
                    "translate3d(-" + (SLIDE_WIDTH * this.slideLength) + "px, 0px, 0px)";
            }, AUTO_SLIDE_SPEED);
            curSlideIndex = this.slideLength;
        }
        this.pagination[(curSlideIndex === this.slideLength) ? 0 :
            curSlideIndex].classList.remove('active');

        this.curSlide = this.slideContent[--curSlideIndex];
        this.pagination[curSlideIndex].classList.add('active');
    }

    nextBtnClickHandler() {
        if (curSlideIndex <= this.slideLength - 1) {
            this.slideList.style.transition = SLIDE_SPEED + "ms";
            this.slideList.style.transform =
                "translate3d(-" + (SLIDE_WIDTH * (curSlideIndex + 2)) + "px, 0px, 0px)";
        }
        // 마지막 슬라이드에 도달했을 경우, 맨 처음으로 돌아가게 한다.
        if (curSlideIndex === this.slideLength - 1) {
            setTimeout(() =>{
                this.slideList.style.transition = "0ms";
                this.slideList.style.transform = "translate3d(-" + (SLIDE_WIDTH) + "px, 0px, 0px)";
            }, AUTO_SLIDE_SPEED);
            curSlideIndex = -1;
        }
        this.pagination[(curSlideIndex === -1) ? this.slideLength - 1 :
            curSlideIndex].classList.remove('active');

        this.curSlide = this.slideContent[++curSlideIndex];
        this.pagination[curSlideIndex].classList.add('active');
    }

    /* 내비게이터 마우스 오버 이벤트 */
    paginationHandler(e) {
        DOM('.active').querySelector().classList.remove('active');
        e.target.className += " active";

        /* 배너 변화시키기 */
        let index = Number(e.target.getAttribute("data"));
        this.curSlide = this.slideContent[index];
        this.slideList.style.transition = SLIDE_SPEED + "ms";
        this.slideList.style.transform =
            "translate3d(-" + (SLIDE_WIDTH) * (index + 1) + "px, 0px, 0px)";
        curSlideIndex = index;
    }

    init() {
        /* 실행 메서드 */
        this.onReady();
        this.onEvents();
    }
}