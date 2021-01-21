import API from "../utils/api";
import dapi from "../utils/CustomDomAPI";

const ACTIVE_PREV = "active-prev";
const ACTIVE_NEXT = "active-next";
const VISIBLE = "visible";
const NON_VISIBLE = "non-visible";

const config = {
    /**
     * 한 번에 보여주는 슬라이드 개수
     */
    slideNumPerPage: 1,   
    /**
     * 한 번에 업데이트되는 슬라이드 개수
     */
    updateSlideNum: 1
}

class SlideShowView {
    constructor() {
        this.slideHtmls = [];
        this.currentSlideIdx = 0;
        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.init();
    }
    
    async init() {
        this.visibleGroup = document.querySelector('.slideshow > .visible');
        this.nonVisibleGroup = document.querySelector('.slideshow > .non-visible');
        await this.getBannerCarouselData();
        this.initialRender();

        const prevButton = dapi.querySelector('.left-icon');
        prevButton.addEventListener('click', this.onClickPrev);

        const nextButton = dapi.querySelector('.right-icon');
        nextButton.addEventListener('click', this.onClickNext);
    }

    async getBannerCarouselData() {
        const res = await API.getBannerCarouselData();
        res.data.forEach((slide) => {
            this.slideHtmls.push(this.getSlideTemplate(slide));
        });
    }

    initialRender() {
        this.visibleGroup.innerHTML = this.renderSlides(this.currentSlideIdx);
    }
    
    /**
     * cur index가 가운데에 보이도록 슬라이드를 렌더한다.
     * @param {Number} cur 
     */
    renderSlides (cur) {
        let innerHTML = "";
        for (let i = 0; i < config.slideNumPerPage + 2 * config.updateSlideNum; i++) {
            let index = cur + i - config.updateSlideNum;
            index = index % (config.slideNumPerPage + 2 * config.updateSlideNum)
            if (index < 0) {
                index = index + config.slideNumPerPage + 2 * config.updateSlideNum;
            }
            innerHTML += this.slideHtmls[index];
        }
        return innerHTML;
    }

    getSlideTemplate({url}) {        
        return `<div class="slide">
            <img src="${url}">
        </div>`;
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