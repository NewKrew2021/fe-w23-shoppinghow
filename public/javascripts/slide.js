/*
    slide.js
    슬라이드쇼 기능을 구현하는 함수
*/
function addSlideShow() {
    let slideIndex = 0;
    let timer;
    let curSlideIndex = 0;
    const MAX_SLIDE_COUNT = 1;
    const SLIDE_SPEED = 300;
    const AUTO_SLIDE_SPEED = 300;
    const SLIDE_WIDTH = 485;

    /* 슬라이드쇼 버튼 이벤트 추가하기 */
    const slideNextBtn = querySelector(".next");
    const slidePrevBtn = querySelector(".prev");
    console.log(slidePrevBtn);
    const slideList = querySelector(".slide-list");
    const slideContent = querySelectorAll(".slide-content");

    const firstSlide = slideList.firstElementChild;
    const lastSlide = slideList.lastElementChild;
    const copyFirstSlide = firstSlide.cloneNode(true);
    const copyLastSlide = lastSlide.cloneNode(true);

    let curSlide = slideContent[0];

    // 맨 뒤에 맨 앞 슬라이드를 복사해 넣고,
    // 맨 앞에 맨 뒤의 슬라이드를 복사해 넣는다.
    slideList.appendChild(copyFirstSlide);
    slideList.insertBefore(copyLastSlide, slideList.firstElementChild);

    const slideLength = slideContent.length; // 슬라이드 이미지의 갯수

    slideList.style.width = (SLIDE_WIDTH + 160) * (slideLength + 2) + "px";
    slideList.style.transform = "translate3d(-" + ((SLIDE_WIDTH) * (curSlideIndex + 1)) + "px, 0px, 0px)";

    slidePrevBtn.addEventListener('click', () => {
        if (curSlideIndex >= 0) {
            slideList.style.transition = SLIDE_SPEED + "ms";
            slideList.style.transform = "translate3d(-" + (SLIDE_WIDTH * (curSlideIndex)) + "px, 0px, 0px)";
        }
        // 첫 번째 슬라이드에 도달했을 경우, 맨 끝으로 돌아가게 한다.
        if (curSlideIndex == 0) {
            console.log(curSlideIndex);
            setTimeout(function () {
                slideList.style.transition = "0ms";
                slideList.style.transform = "translate3d(-" + (SLIDE_WIDTH * slideLength) + "px, 0px, 0px)";
            }, AUTO_SLIDE_SPEED);
            curSlideIndex = slideLength;
        }
        curSlide = slideContent[--curSlideIndex];
    });

    slideNextBtn.addEventListener('click', () => {
        if (curSlideIndex <= slideLength - 1) {
            slideList.style.transition = SLIDE_SPEED + "ms";
            slideList.style.transform = "translate3d(-" + (SLIDE_WIDTH * (curSlideIndex + 2)) + "px, 0px, 0px)";
        }
        // 마지막 슬라이드에 도달했을 경우, 맨 처음으로 돌아가게 한다.
        if (curSlideIndex == slideLength - 1) {
            setTimeout(function () {
                slideList.style.transition = "0ms";
                slideList.style.transform = "translate3d(-" + (SLIDE_WIDTH) + "px, 0px, 0px)";
            }, AUTO_SLIDE_SPEED);
            curSlideIndex = -1;
        }
        curSlide = slideContent[++curSlideIndex];
    });
}