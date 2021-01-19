const API_URL = 'http://localhost:5000'; // temp

function initAPI(){
    /**
     * Make GET request to api server.
     * @param {String} path 
     * @param {JSONObject} data 
     */
    function _get(path, data = undefined) {
        return fetch(`${API_URL}/${path}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            data
        });
    }

    /**
     * Get carousel images.
     */
    function getCarouselImages() {
        const url = 'carousel';
        return _get(url).then(res => {
            return res.json();
        });
    }

    /**
     * Get the first banner image.
     */
    function getBannerData() {
        const url = 'banner';
        return _get(url).then(res => {
            return res.json();
        });
    }

    /**
     * Get the banner-carousel images.
     */
    function getBannerCarouselData() {
        const url = 'banner-carousel';
        return _get(url).then(res => {
            return res.json();
        });
    }
    
    /**
     * Get first 5 items.
     */
    function getItems() {
        const url = 'items';
        return _get(url).then(res => {
            return res.json();
        });       
    }

    /**
     * Get a number of items.
     */
    function getItemNum() {
        const url = 'items/number';
        return _get(url).then(res => {
            console.log(res.json());
        });
    }

    /**
     * Get 5 items from startIdx.
     * @param {Number} startIdx 
     */
    function getMoreItems (startIdx) {
        const url = `items/more/${startIdx}`;
        return _get(url).then(res => {
            return res.json();
        });
    }

    /**
     * Get image of idx-th item.
     * @param {Number} idx 
     */
    function getItemImg(idx) {
        const url = `items/image/${idx}`;
        return _get(url).then(res => {
            return res.json();
        });
    }

    return {getCarouselImages, getBannerData, getBannerCarouselData, getItems, getItemNum, getMoreItems, getItemImg}
}

const API = initAPI();
export default API;