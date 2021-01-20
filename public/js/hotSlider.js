/*
    hotSlide.js
    지금 뜨는 테마 카테고리 슬라이드 클래스 (임시)
    
    : Slider.js의 클래스로 재사용 및 일반화할 예정
*/
import { dom } from './util.js';
export default class HotSlider{
    constructor(target) {
        /* 많은 dom 요소들 */
        this.slideNextBtn = dom('.next-2').querySelector();
        this.slidePrevBtn = dom('.prev-2').querySelector();
        this.slideList = dom('.slide-list-2').querySelector();
        this.slideContent = dom('.slide-content-2').querySelectorAll();
        this.slideLength = this.slideContent.length;
        this.curSlide = this.slideContent[0];
        this.mousedownTime;
        this.h_curSlideIndex = target.curSlideIndex;
        this.HOT_SLIDE_WIDTH = target.slideWidth;
        this.SLIDE_SPEED = target.slideSpeed;
        this.AUTO_SLIDE_SPEED = target.auto_slideSpeed;
        this.SHOW_LENGTH = target.showLength;
        this.PRESSED_TIME = target.pressedTime;
    }

    onReady() {
        const SLIDE_LENGTH = this.slideLength;
        /* 이벤트 등록 전 레이아웃 준비 */
        /* 5,6,7,8,9 번째 인덱스는 맨 앞에 차례대로 붙이고, 0,1,2,3,4 번째 인덱스는 맨 뒤에 붙인다. */
        for(let i = 0; i < SLIDE_LENGTH / 2; i++){
            this.slideList.appendChild(this.slideContent[i].cloneNode(true));
        }
        for(let i = SLIDE_LENGTH - 1; i >= SLIDE_LENGTH / 2; i--){
            this.slideList.insertBefore(this.slideContent[i].cloneNode(true),
            this.slideList.firstElementChild);
        }
        this.slideList.style.width = (this.HOT_SLIDE_WIDTH) * (SLIDE_LENGTH * 2) + "px";
        this.slideList.style.transform = "translate3d(-" +
        ((this.HOT_SLIDE_WIDTH) * (this.h_curSlideIndex + this.SHOW_LENGTH)) + "px, 0px, 0px)";
    }

    onEvents() {
        /* 이벤트 핸들러 등록 */
        this.slidePrevBtn.addEventListener('mouseup', this.PrevBtnPressHandler.bind(this));
        this.slidePrevBtn.addEventListener('mousedown', ()=> {
            this.mousedownTime = new Date().getTime();
        })   
        this.slideNextBtn.addEventListener('mouseup', this.nextBtnPressHandler.bind(this));
        this.slideNextBtn.addEventListener('mousedown', ()=> {
            this.mousedownTime = new Date().getTime();
        });
    }

    /* 이전, 다음 버튼 클릭 이벤트 */
    /* 2초(임시 : 2초가 너무 길어서 1.5초로 설정함)보다 짧게 눌렀으면 한 칸만, 아니면 두 칸을 이동하게 함 */
    PrevBtnPressHandler(e){
        const JUMP = 2;
        let mouseupTime = new Date().getTime(),
              timeDifference = mouseupTime - this.mousedownTime;

        if(timeDifference < this.PRESSED_TIME){
            this.slideList.style.transition = this.SLIDE_SPEED + "ms";
            this.slideList.style.transform =
                "translate3d(-" + (this.HOT_SLIDE_WIDTH * (this.h_curSlideIndex + (this.SHOW_LENGTH - 1))) + "px, 0px, 0px)";
            
            // 첫 번째 슬라이드에 도달했을 경우, 이어붙여서 같았던 곳의 끝으로 돌아가게 한다.
            if (this.h_curSlideIndex === -(this.SHOW_LENGTH - 1)) {
                setTimeout(() => {
                    this.slideList.style.transition = "0ms";
                    this.slideList.style.transform =
                        "translate3d(-" + (this.HOT_SLIDE_WIDTH * this.SLIDE_LENGTH) + "px, 0px, 0px)";
                }, this.AUTO_SLIDE_SPEED);
                this.h_curSlideIndex = this.SHOW_LENGTH + 1;
            }
            this.curSlide = this.slideContent[--this.h_curSlideIndex];
        }

        else if(timeDifference >= this.PRESSED_TIME){
            this.slideList.style.transition = this.SLIDE_SPEED + "ms";
            this.slideList.style.transform =
                "translate3d(-" +
                (this.HOT_SLIDE_WIDTH * (this.h_curSlideIndex + (this.SHOW_LENGTH - 1)) - this.HOT_SLIDE_WIDTH) + "px, 0px, 0px)";
            
            // 첫 번째 슬라이드에 도달했을 경우, 이어붙여서 같았던 곳의 끝으로 돌아가게 한다.
            if (this.h_curSlideIndex === -(this.SHOW_LENGTH - 1)) {
                setTimeout(() => {
                    this.slideList.style.transition = "0ms";
                    this.slideList.style.transform =
                        "translate3d(-" + (this.HOT_SLIDE_WIDTH * this.SLIDE_LENGTH) + "px, 0px, 0px)";
                }, this.AUTO_SLIDE_SPEED);
                this.h_curSlideIndex = 6;
            }
            this.curSlide = this.slideContent[this.h_curSlideIndex-=JUMP];
        }
    }

    /* 다음 버튼을 2초 누를 시 발생하는 이벤트 핸들러 */
    nextBtnPressHandler(e){
        const JUMP = 2;
        let mouseupTime = new Date().getTime(),
              timeDifference = mouseupTime - this.mousedownTime;
              
        if (timeDifference < this.PRESSED_TIME){
            if (this.h_curSlideIndex <= this.slideLength - 1) {
                this.slideList.style.transition = this.SLIDE_SPEED + "ms";
                this.slideList.style.transform =
                    "translate3d(-" + (this.HOT_SLIDE_WIDTH * (this.h_curSlideIndex + (this.SHOW_LENGTH + 1))) + "px, 0px, 0px)";
            }
            // 마지막 슬라이드에 도달했을 경우, 맨 처음으로 돌아가게 한다.
            if (this.h_curSlideIndex === this.slideLength - 1) {
                setTimeout(() =>{
                    this.slideList.style.transition = "0ms";
                    this.slideList.style.transform =
                    "translate3d(-" + (HOT_SLIDE_WIDTH * (this.h_curSlideIndex + this.SHOW_LENGTH)) + "px, 0px, 0px)";
                }, this.AUTO_SLIDE_SPEED);
                this.h_curSlideIndex = -1; // 이후 0번 인덱스로 갈 수 있도록
            }
            this.curSlide = this.slideContent[++this.h_curSlideIndex];
        }
        else if (timeDifference >= this.PRESSED_TIME){
            if (this.h_curSlideIndex <= this.slideLength - 1) {
                this.slideList.style.transition = this.SLIDE_SPEED + "ms";
                this.slideList.style.transform =
                    "translate3d(-" +
                    ((this.HOT_SLIDE_WIDTH) *
                    (this.h_curSlideIndex + (this.SHOW_LENGTH + 1)) + this.HOT_SLIDE_WIDTH) + "px, 0px, 0px)";
            }
            // 마지막 슬라이드에 도달했을 경우, 맨 처음으로 돌아가게 한다.
            if (this.h_curSlideIndex === this.slideLength - 1) {
                setTimeout(() =>{
                    this.slideList.style.transition = "0ms";
                    this.slideList.style.transform =
                    "translate3d(-" + ((this.HOT_SLIDE_WIDTH * 2) * (this.h_curSlideIndex + this.SHOW_LENGTH)) + "px, 0px, 0px)";
                }, this.AUTO_SLIDE_SPEED);
                this.h_curSlideIndex = -1;
            }
            this.curSlide = this.slideContent[this.h_curSlideIndex+=JUMP];
        }
    }

    init() {
        /* 실행 메서드 */
        this.onReady();
        this.onEvents();
    }
}