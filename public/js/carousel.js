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
        for (let child of this.boxDOM.childNodes) this.itemDOMs.push(child);
        this.vOn(this.itemDOMs[0]);

        // 버튼 렌더링
        this.parentDOM.innerHTML += `<img src="image/prev_btn.svg" class="btn--prev">`;
        this.parentDOM.innerHTML += `<img src="image/next_btn.svg" class="btn--next">`;

        // 막대 렌더링
        this.pageDOMs = [];
        this.parentDOM.innerHTML += `<div class="page-box margin-center horizontal"></div>`;
        for(let i = 0; i < this.items.length; i++) {
            const element = this.makePageElement();
            this.pageDOMs.push(element);
            this.parentDOM.lastChild.appendChild(element);
        }
        // 디폴트 맨 처음 항목
        this.pageDOMs[0].style.backgroundColor="#333";
        
        // 막대 이벤트 등록
        this.addPageEvent();
    }
    addPageEvent() {
        for(let i = 0; i < this.pageDOMs.length; i++) {
            const DOM = this.pageDOMs[i];
            DOM.addEventListener("mouseover", () => {
                console.log(i);
                this.pageDOMs[this.centerIdx].style.backgroundColor="#ccc";
                this.vOff(this.itemDOMs[this.centerIdx]);
                this.pageDOMs[i].style.backgroundColor="#333";
                this.vOn(this.itemDOMs[i]);
                this.refreshIndex(i);
            });
        }
    }
    makeImgElement(src) {
        return `<img src="${src}" class="container__item--carousel__img transparency">`;
    }
    makePageElement() {
        const element = document.createElement("div");
        element.setAttribute("class", "page");
        return element;
    }
    render() {
        this.parentDOM.appendChild(this.boxDOM);
        document.querySelector(".btn--prev").addEventListener("click", () => this.prev());
        document.querySelector(".btn--next").addEventListener("click", () => this.next());
    }
    vOn(element) {
        element.style.visibility = "visible";
    }
    vOff(element) {
        element.style.visibility = "hidden";
    }
    move(element, n, duration) {
        element.style.transitionDuration = `${duration}s`;
        element.style.transform = `translate(${n * this.width}px)`;
    }
    prev() {
        const left = this.itemDOMs[this.leftIdx];
        const center = this.itemDOMs[this.centerIdx];

        this.pageDOMs[this.centerIdx].style.backgroundColor="#ccc";
        this.pageDOMs[this.leftIdx].style.backgroundColor="#333";

        left.addEventListener("transitionend", () => {
            this.vOn(left);
            this.move(left, 0, 0.5);
        }, {once: true})
        center.addEventListener("transitionend", () => {
            this.vOff(center);
            this.move(center, 0, 0.01);
        }, {once: true});

        this.move(left, -1, 0.01);
        this.move(center, 1, 0.5);   

        let n = this.centerIdx - 1;
        if(n == -1) n = this.items.length - 1;
        this.refreshIndex(n);
    }
    next() {
        const right = this.itemDOMs[this.rightIdx];
        const center = this.itemDOMs[this.centerIdx];

        this.pageDOMs[this.centerIdx].style.backgroundColor="#ccc";
        this.pageDOMs[this.rightIdx].style.backgroundColor="#333";

        center.addEventListener("transitionend", () => {
            this.vOff(center);
            this.move(center, 0, 0.01);
        }, {once: true});
        right.addEventListener("transitionend", () => {
            this.vOn(right);
            this.move(right, 0, 0.5);
        }, {once: true})
        
        this.move(right, 1, 0.01);
        this.move(center, -1, 0.5);

        let n = this.centerIdx + 1;
        if(n == this.items.length) n = 0;
        this.refreshIndex(n);
    }
    refreshIndex(n) {
        this.centerIdx = n;
        if(this.centerIdx === this.items.length) this.centerIdx = 0;
        this.leftIdx = this.centerIdx - 1;
        this.rightIdx = this.centerIdx + 1;
        if(this.leftIdx === -1) this.leftIdx = this.items.length - 1;
        if(this.rightIdx === this.items.length) this.rightIdx = 0;
    }
}