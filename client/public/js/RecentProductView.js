import dapi from "../utils/CustomDomAPI";

const RecentProductView = (function(){
    const recentProductsEle = dapi.querySelector('.recent-products-panel');
    const recentProductsButton = dapi.querySelector(".main-navbar--right__recent-products");
    const CLASSNAME_VISIBLE = "visible"
    
    function init() {
        recentProductsButton.addEventListener('mouseenter', () => {
            render();
            recentProductsEle.classList.add(CLASSNAME_VISIBLE);    
        })
        
        recentProductsButton.addEventListener('mouseleave', () => {
            recentProductsEle.classList.remove(CLASSNAME_VISIBLE);
        })
        
        recentProductsEle.addEventListener('mouseenter', () => {
            render();
            recentProductsEle.classList.add(CLASSNAME_VISIBLE);
        })
        
        recentProductsEle.addEventListener('mouseleave', () => {
            recentProductsEle.classList.remove(CLASSNAME_VISIBLE);
        })
    }

    function render () {
        const recentProductsStr = localStorage.getItem("recent-items");
        const recentProducts = recentProductsStr ? JSON.parse(recentProductsStr) : [];
        let innerHTML = "";
        for (const product of recentProducts) {
            const productsHTML = `<img src="${product['url']}"/>`;
            innerHTML = innerHTML + productsHTML;
        }
        recentProductsEle.innerHTML = innerHTML;
    }
    return {init};
})();

export default RecentProductView;