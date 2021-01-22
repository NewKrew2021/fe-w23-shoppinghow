import images from "../images";
import API from "../utils/api";
import dapi from "../utils/CustomDomAPI";

const ACTIVE_PREV = "active-prev";
const ACTIVE_NEXT = "active-next";
const VISIBLE = "visible";
const NON_VISIBLE = "non-visible";

const defaultConfig = {
    containerClassName: 'slideshow',
    prevButtonClassName: 'prev-button',
    nextButtonClassName: 'next-button',
    /**
     * 한 번에 보여주는 슬라이드 개수
     */
    slideNumPerPage: 1,   
    /**
     * 한 번에 업데이트되는 슬라이드 개수
     */
    updateSlideNum: 1,
    dataFetchFunction: API.getBannerCarouselData,
    getSlideTemplate({url}) {        
        return `<div class="slide">
            <img src="${url}">
        </div>`;
    },
}

class SlideShowView {
    constructor(config = defaultConfig) {
        this.config = config;
        this.slideHtmls = [];
        this.currentSlideIdx = 0;
        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.init();
    }
    
    async init() {
        const {prevButtonClassName, nextButtonClassName, containerClassName} = this.config;
        this.element = dapi.querySelector(`.${containerClassName}`);
        this.visibleGroup = dapi.querySelector(`.${VISIBLE}`, this.element);
        this.nonVisibleGroup = dapi.querySelector(`.${NON_VISIBLE}`, this.element);
        this.prevButton = dapi.querySelector(`.${prevButtonClassName}`, this.element);
        this.nextButton = dapi.querySelector(`.${nextButtonClassName}`, this.element);

        await this.getBannerCarouselData();
        this.initialRender();
        this.prevButton.addEventListener('click', this.onClickPrev);
        this.nextButton.addEventListener('click', this.onClickNext);
    }

    async getBannerCarouselData() {
        const res = await this.config.dataFetchFunction();
        res.data.forEach((slide) => {
            this.slideHtmls.push(this.config.getSlideTemplate(slide));
        });
    }

    initialRender() {
        this.prevButton.innerHTML = `<img class="banner__panel__slideshow__left-icon left-icon" src="${images.leftArrowIcon}"></img>`
        this.nextButton.innerHTML = `<img class="banner__panel__slideshow__right-icon right-icon" src="${images.rightArrowIcon}"></img>`
        this.visibleGroup.innerHTML = this.renderSlides(this.currentSlideIdx);
    }
    
    /**
     * cur index가 가운데에 보이도록 슬라이드를 렌더한다.
     * @param {Number} cur 
     */
    renderSlides (cur) {
        const {slideNumPerPage, updateSlideNum} = this.config;
        let innerHTML = "";
        for (let i = 0; i < slideNumPerPage + 2 * updateSlideNum; i++) {
            let index = cur + i - updateSlideNum;
            index = index % (slideNumPerPage + 2 * updateSlideNum)
            if (index < 0) {
                index = index + slideNumPerPage + 2 * updateSlideNum;
            }
            innerHTML += this.slideHtmls[index];
        }
        return innerHTML;
    }

    switchGroupVisibility() {
        this.nonVisibleGroup.classList.replace(NON_VISIBLE, VISIBLE);
        this.visibleGroup.classList.replace(VISIBLE, NON_VISIBLE);
        const temp = this.nonVisibleGroup;
        this.nonVisibleGroup = this.visibleGroup;
        this.visibleGroup = temp;
    }

    onClickNext() {
        this.nonVisibleGroup.innerHTML = this.renderSlides(this.currentSlideIdx + 1);
        this.visibleGroup.classList.add(ACTIVE_NEXT);
        setTimeout(()=> {
            this.visibleGroup.classList.remove(ACTIVE_NEXT);
            this.switchGroupVisibility();
        }, 300);
        this.currentSlideIdx += 1;
    }
    
    onClickPrev() {
        this.nonVisibleGroup.innerHTML = this.renderSlides(this.currentSlideIdx - 1);
        this.visibleGroup.classList.add(ACTIVE_PREV);
        setTimeout(()=> {
            this.visibleGroup.classList.remove(ACTIVE_PREV);
            this.switchGroupVisibility();
        }, 300);
        this.currentSlideIdx -= 1;
    }
}

export default SlideShowView;