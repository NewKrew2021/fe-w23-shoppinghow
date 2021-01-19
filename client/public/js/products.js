import API from '../utils/api.js';
import CustomDomAPI from '../utils/CustomDomAPI.js';
import * as Card from './card.js';

class Products {
    constructor() {
        this.startIdx = 0
        this.htmlElement = CustomDomAPI.querySelector('.products');
        this.button = CustomDomAPI.querySelector('.more-button');
        this.onClickMoreButton = this.onClickMoreButton.bind(this);
        this.getMoreProducts = this.getMoreProducts.bind(this);
        this.getProducts();
        this.htmlElement.addEventListener('click', (e) => {
            this.onClickElement(e.target);
        })
        this.button.addEventListener('click', this.onClickMoreButton);
    }
    
    getMoreProducts() {
        this.startIdx = this.startIdx + 5;
        let count = 0;
        API.getMoreItems(this.startIdx).then((res)=> {
            const innerHtml = res.data.reduce((acc, item) => {
                count ++;
                return acc + Card.getCardTemplate(item, 'card-' + (this.startIdx + count).toString());
            }, '')
            this.htmlElement.innerHTML = String(this.htmlElement.innerHTML) + innerHtml;
        });
    }
    getProducts() {
        API.getItems().then((res)=> {
            let count = 0;
            const innerHtml = res.data.reduce((acc, item) => {
                count ++;
                return acc + Card.getCardTemplate(item, 'card-' + count.toString());
            }, '')
            this.htmlElement.innerHTML = innerHtml;
        });
    }
    
    getProductsNum () { }
    
    onClickMoreButton() {
        this.getMoreProducts();
    }
    onClickElement(target) {
        target = target.closest('.card');
        if (!target) return;
        let localStorageRecentItems = localStorage.getItem("recent-items");
        if (!localStorageRecentItems){
            localStorage.setItem("recent-items", `[{"id": "${target.id}", "url": "${target.querySelector('img').src}"}]`)
        } else {
            let recentItems = JSON.parse(localStorageRecentItems);
            recentItems.push({"id": target.id, "url": target.querySelector('img').src});
            localStorage.setItem("recent-items", JSON.stringify(recentItems))
        }
    }

};

export default Products;