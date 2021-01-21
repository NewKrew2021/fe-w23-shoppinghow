import API from '../utils/api.js';
import dapi from '../utils/CustomDomAPI.js';
import CardTemplate from './card.js';

class ProductView {
    constructor() {
        this.startIdx = 0
        this.onClickMoreButton = this.onClickMoreButton.bind(this);
        this.onClickElement = this.onClickElement.bind(this);
        this.getMoreProducts = this.getMoreProducts.bind(this);
        this.init();
    }
    
    init() {        
        this.htmlElement = dapi.querySelector('.products');
        this.button = dapi.querySelector('.more-button');
        this.getProducts();
        this.htmlElement.addEventListener('click', this.onClickElement);
        this.button.addEventListener('click', this.onClickMoreButton);
    }
    
    getMoreProducts() {
        this.startIdx = this.startIdx + 5;
        API.getMoreItems(this.startIdx).then((res)=> {
            const innerHtml = res.data.reduce((acc, item, index) => {
                return acc + CardTemplate.get(item, 'card-' + (this.startIdx + index).toString());
            }, '')
            this.htmlElement.innerHTML = String(this.htmlElement.innerHTML) + innerHtml;
        });
    }
    
    getProducts() {
        API.getItems().then((res)=> {
            const innerHtml = res.data.reduce((acc, item, index) => {
                return acc + CardTemplate.get(item, 'card-' + index.toString());
            }, '')
            this.htmlElement.innerHTML = innerHtml;
        });
    }
    
    getProductsNum () { }
    
    onClickMoreButton() {
        this.getMoreProducts();
    }
    onClickElement({target}) {
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

class ProductRenderer {
    constructor() {

    }

}

export default ProductView;