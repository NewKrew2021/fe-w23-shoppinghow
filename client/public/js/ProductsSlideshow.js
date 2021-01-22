import API from "../utils/api";
import CardTemplate from "./card";

const config = {
    containerClassName: 'panel__card-slideshow',
    prevButtonClassName: 'prev-button',
    nextButtonClassName: 'next-button',
    /**
     * 한 번에 보여주는 슬라이드 개수
     */
    slideNumPerPage: 5,   
    /**
     * 한 번에 업데이트되는 슬라이드 개수
     */
    updateSlideNum: 1,
    getSlideTemplate: CardTemplate.get,
    dataFetchFunction: API.getCarouselImages,
}

const ProductsSlideshow = {config};
export default ProductsSlideshow