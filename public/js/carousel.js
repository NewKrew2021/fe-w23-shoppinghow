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


    }
    makeImgElement(src) {
        return `<img src="${src}" class="container__item--carousel__img transparency">`;
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

        this.move(left, -1, 0.01);
        const instance = this;
        left.addEventListener("transitionend", function () {
            instance.vOn(left);
            instance.move(left, 0, 0.5);
            instance.move(center, 1, 0.5);

            center.addEventListener("transitionend", function () {
                instance.vOff(center);
                instance.move(center, 0, 0.01);

            }, {once: true});
        }, {once: true})
        this.leftIdx--;
        this.centerIdx--;
        this.rightIdx--;
        if (this.leftIdx == -1) this.leftIdx = this.items.length - 1;
        if (this.centerIdx == -1) this.centerIdx = this.items.length - 1;
        if (this.rightIdx == -1) this.rightIdx = this.items.length - 1;
        console.log(instance);
    }
    next() {
        const right = this.itemDOMs[this.rightIdx];
        const center = this.itemDOMs[this.centerIdx];

        this.move(right, 1, 0.01);
        const instance = this;
        right.addEventListener("transitionend", function () {
            instance.vOn(right);
            instance.move(right, 0, 0.5);
            instance.move(center, -1, 0.5);

            center.addEventListener("transitionend", function () {
                instance.vOff(center);
                instance.move(center, 0, 0.01);


            });
        })
        this.leftIdx++;
        this.centerIdx++;
        this.rightIdx++;
        if (this.leftIdx == this.items.length) this.leftIdx = 0;
        if (this.centerIdx == this.items.length) this.centerIdx = 0;
        if (this.rightIdx == this.items.length) this.rightIdx = 0;
        console.log(instance);
    }
}