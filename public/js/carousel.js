class Carousel {
    constructor(parentDOM, items) {
        this.parentDOM = parentDOM;
        this.items = items;
    }

    init() {
        this.itemDOMs = [];

        // image size
        this.width = 485;
        this.height = 340;

        // left - center - right index 초기화
        this.centerIdx = 0;
        this.leftIdx = this.items.length - 1;
        this.rightIdx = 1;
        
        // center 이미지가 보일 박스
        this.boxDOM = document.createElement("div");
        this.boxDOM.setAttribute("class", "container__item--carousel__box margin-auto");

        // boxDOM에 다 넣음
        this.boxDOM.innerHTML = this.items.reduce((acc, cur) => {
            return acc + this.makeImgElement(cur.src);
        }, "");

        // 각 image DOM element 저장해둠
        for(let child of this.boxDOM.childNodes) this.itemDOMs.push(child);
        //this.itemDOMs[this.rightIdx].style.display = "block";
    }
    makeImgElement(src) {
        return `<img src="${src}" class="container__item--carousel__img transparency">`;
    }
    render() {
        this.parentDOM.appendChild(this.boxDOM);
    }
    vOn(element) {
        element.style.visivility = "visible";
        element.style.zIndex = "1";
    }
    vOff(element) {
        element.style.visivility = "hidden";
    }
    move(element, n, duration) {
        element.style.transitionDuration = `${duration}s`;
        element.style.transform = `translate(${n * this.width}px)`;
    }
    prev() {
        
    }
    next() {
        const right = this.itemDOMs[this.rightIdx];
        const center = this.itemDOMs[this.centerIdx];
        this.vOn(this.itemDOMs[5]);
        //this.move(center, 1, 1);
        //center.style.transform = `translate(485px)`;
        //right.style.display = "block";
        //right.style.transitionDuration = "1s";
        //right.style.transform = `translate(-485px)`;
    }
}