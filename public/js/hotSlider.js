/*
    hotSlide.js
    지금 뜨는 테마 카테고리 슬라이드 클래스
*/
class HotSlider{
    constructor() {
        /* 많은 DOM 요소들 */
        this.slideNextBtn = DOM('.next-2').querySelector();
        this.slidePrevBtn = DOM('.prev-2').querySelector();
        this.slideList = DOM('.slide-list-2').querySelector();
        this.slideContent = DOM('.slide-content-2').querySelectorAll();
        this.slideLength = this.slideContent.length;
        this.curSlide = this.slideContent[0];
        this.mousedownTime;
    }

    onReady() {
        /* 이벤트 등록 전 레이아웃 준비 */
        /* 5,6,7,8,9 번째 인덱스는 맨 앞에 차례대로 붙이고, 0,1,2,3,4 번째 인덱스는 맨 뒤에 붙인다. */
        for(let i = 0; i <= 4; i++){
            this.slideList.appendChild(this.slideContent[i].cloneNode(true));
        }
        for(let i = 9; i >= 5; i--){
            this.slideList.insertBefore(this.slideContent[i].cloneNode(true),
            this.slideList.firstElementChild);
        }
        this.slideList.style.width = (HOT_SLIDE_WIDTH) * (this.slideLength + (5 * 2)) + "px";
        this.slideList.style.transform = "translate3d(-" + ((HOT_SLIDE_WIDTH) * (h_curSlideIndex + 5)) + "px, 0px, 0px)";
    }

    onEvents() {
        /* 이벤트 핸들러 등록 */
        this.slidePrevBtn.addEventListener('mouseup', (e)=>this.PrevBtnPressHandler(e));
        this.slidePrevBtn.addEventListener('mousedown', (e)=> {
            e.target.src='/images/prev2_press_btn.png';
            this.mousedownTime = new Date().getTime();
        })   
        this.slideNextBtn.addEventListener('mouseup', (e)=>this.nextBtnPressHandler(e));
        this.slideNextBtn.addEventListener('mousedown', (e)=> {
            e.target.src='/images/next2_press_btn.png';
            this.mousedownTime = new Date().getTime();
        });
    }

    /* 이전, 다음 버튼 클릭 이벤트 */
    /* 2초(임시 : 1.5초)보다 짧게 눌렀으면 한 칸만, 아니면 두 칸을 이동하게 함 */
    PrevBtnPressHandler(e){
        let mouseupTime = new Date().getTime(),
              timeDifference = mouseupTime - this.mousedownTime;
        console.log(timeDifference);

        /* 버튼 이미지 변경 */
        e.target.src='/images/prev2_btn.png';

        if(timeDifference < 1500){
            this.slideList.style.transition = SLIDE_SPEED + "ms";
            this.slideList.style.transform =
                "translate3d(-" + (HOT_SLIDE_WIDTH * (h_curSlideIndex + 4)) + "px, 0px, 0px)";
            
            // 첫 번째 슬라이드에 도달했을 경우, 맨 끝으로 돌아가게 한다.
            if (h_curSlideIndex === -4) {
                setTimeout(() => {
                    this.slideList.style.transition = "0ms";
                    this.slideList.style.transform =
                        "translate3d(-" + (HOT_SLIDE_WIDTH * this.slideLength) + "px, 0px, 0px)";
                }, AUTO_SLIDE_SPEED);
                h_curSlideIndex = 6;
            }
            this.curSlide = this.slideContent[--h_curSlideIndex];
        }

        else if(timeDifference >= 1500){
            this.slideList.style.transition = SLIDE_SPEED + "ms";
            this.slideList.style.transform =
                "translate3d(-" + (HOT_SLIDE_WIDTH * (h_curSlideIndex + 4) -HOT_SLIDE_WIDTH) + "px, 0px, 0px)";
            
            // 첫 번째 슬라이드에 도달했을 경우, 맨 끝으로 돌아가게 한다.
            if (h_curSlideIndex === -4) {
                setTimeout(() => {
                    this.slideList.style.transition = "0ms";
                    this.slideList.style.transform =
                        "translate3d(-" + (HOT_SLIDE_WIDTH * this.slideLength) + "px, 0px, 0px)";
                }, AUTO_SLIDE_SPEED);
                h_curSlideIndex = 6;
            }
            this.curSlide = this.slideContent[h_curSlideIndex-=2];
        }
    }

    /* 다음 버튼을 2초 누를 시 발생하는 이벤트 핸들러 */
    nextBtnPressHandler(e){
        let mouseupTime = new Date().getTime(),
              timeDifference = mouseupTime - this.mousedownTime;
        e.target.src='/images/next2_btn.png';

        if (timeDifference < 1500){
            if (h_curSlideIndex <= this.slideLength - 1) {
                this.slideList.style.transition = SLIDE_SPEED + "ms";
                this.slideList.style.transform =
                    "translate3d(-" + (HOT_SLIDE_WIDTH * (h_curSlideIndex + 6)) + "px, 0px, 0px)";
            }
            // 마지막 슬라이드에 도달했을 경우, 맨 처음으로 돌아가게 한다.
            if (h_curSlideIndex === this.slideLength - 1) {
                setTimeout(() =>{
                    this.slideList.style.transition = "0ms";
                    this.slideList.style.transform = "translate3d(-" + (HOT_SLIDE_WIDTH * (h_curSlideIndex + 5)) + "px, 0px, 0px)";
                }, AUTO_SLIDE_SPEED);
                h_curSlideIndex = -1;
            }
            this.curSlide = this.slideContent[++h_curSlideIndex];
        }
        else if (timeDifference >= 1500){
            //console.log('진입');
            if (h_curSlideIndex <= this.slideLength - 1) {
                this.slideList.style.transition = SLIDE_SPEED + "ms";
                this.slideList.style.transform =
                    "translate3d(-" + ((HOT_SLIDE_WIDTH) * (h_curSlideIndex + 6) + HOT_SLIDE_WIDTH) + "px, 0px, 0px)";
            }
            // 마지막 슬라이드에 도달했을 경우, 맨 처음으로 돌아가게 한다.
            if (h_curSlideIndex === this.slideLength - 1) {
                setTimeout(() =>{
                    this.slideList.style.transition = "0ms";
                    this.slideList.style.transform = "translate3d(-" + ((HOT_SLIDE_WIDTH * 2) * (h_curSlideIndex + 5)) + "px, 0px, 0px)";
                }, AUTO_SLIDE_SPEED);
                h_curSlideIndex = -1;
            }
            this.curSlide = this.slideContent[h_curSlideIndex+=2];
        }
    }

    init() {
        /* 실행 메서드 */
        this.onReady();
        this.onEvents();
    }
}