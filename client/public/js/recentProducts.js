import CustomDomAPI from "../utils/CustomDomAPI";

const recentProductsEle = CustomDomAPI.querySelector('.recent-products-panel');
const recentProductsButton = CustomDomAPI.querySelector(".main-navbar--right__recent-products");

recentProductsButton.addEventListener('mouseenter', () => {
    getRecentProducts();
    recentProductsEle.className = "recent-products-panel visible";
})

recentProductsButton.addEventListener('mouseleave', () => {
    recentProductsEle.className="recent-products-panel"
})

recentProductsEle.addEventListener('mouseenter', () => {
    getRecentProducts();
    recentProductsEle.className = "recent-products-panel visible";
})

recentProductsEle.addEventListener('mouseleave', () => {
    recentProductsEle.className="recent-products-panel"
})

function getRecentProducts () {
    const recentProducts = localStorage.getItem("recent-items") ? JSON.parse(localStorage.getItem("recent-items")) : [];
    let innerHTML = "";
    let productsHTML = "";
    for (product of recentProducts) {
        productsHTML = `<img src="${product['url']}"/>`;
        innerHTML = innerHTML + productsHTML;
    }
    recentProductsEle.innerHTML = innerHTML;
}
