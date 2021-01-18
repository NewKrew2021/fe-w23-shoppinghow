class Carousel {
    /* 
        items [DOM, DOM, ...] 
        <style>
        position: absolute;
        top: 0;
        left: 0;
    */
    constructor(parentDOM, itemDOMs, itemWidth, itemHeight) {
        this.parentDOM = parentDOM;

        this.itemDOMs = itemDOMs;
        this.totalCnt = itemDOMs.length;

        this.itemWidth = itemWidth;
        this.itemHeight = itemHeight;
    }

    // cnt: 한번에 표시될 요소의 개수, duration: 애니메이션 시간
    init(cnt, duration) {
        this.cnt = cnt;

        this.box = document.createElement("div");
        this.box.setAttribute("style", `width: ${this.itemWidth * cnt}px;height: ${this.itemHeight}px;
            overflow: hidden; margin: auto; position:relative`);
        this.duration = duration;

        this.itemDOMs.forEach((item) => {
            this.offVisibility(item);
            this.box.appendChild(item);
        });

        this.initIndex();
        this.center.forEach((itemIdx, idx) => {
            const item = this.itemDOMs[itemIdx];
            this.onVisibility(item);
            this.move(item, idx, 0.01);
        });

        this.initArrowBtn();

        if(this.cnt === 1) {
            this.pageColor = "#ccc";
            this.curColor = "#333";
            this.initPage();
        }
    }
    
    initIndex() {
        this.left = this.totalCnt - 1;
        this.center = [];
        for (let i = 0; i < this.cnt; i++) this.center.push(i);
        this.right = this.cnt;
    }
    initArrowBtn() {
        this.prevBtnDOM = document.createElement("img");
        this.prevBtnDOM.setAttribute("src", "image/prev_btn.svg");
        this.prevBtnDOM.setAttribute("class", "btn--prev");
        this.prevBtnDOM.addEventListener("click", (e) => {
            this.prev();
        }, { once: true });

        this.nextBtnDOM = document.createElement("img");
        this.nextBtnDOM.setAttribute("src", "image/next_btn.svg");
        this.nextBtnDOM.setAttribute("class", "btn--next");
        this.nextBtnDOM.addEventListener("click", (e) => {
            this.next();
        }, { once: true });
    }
    initPage() {
        const box = document.createElement("div");
        box.setAttribute("class", "page-box margin-center horizontal");

        let html = "";
        for(let i = 0; i < this.totalCnt; i++) html += `<div class="page"></div>`;
        box.innerHTML = html;

        this.pageDOMs = [...box.childNodes];
        this.pageDOMs[this.center[0]].style.backgroundColor = this.curColor;
        this.pageDOMs.forEach((item, idx) => {
            item.addEventListener("mouseover", () => {
                this.pageDOMs[this.center[0]].style.backgroundColor = this.pageColor;
                this.offVisibility(this.itemDOMs[this.center[0]]);
                this.pageDOMs[idx].style.backgroundColor = this.curColor;
                this.onVisibility(this.itemDOMs[idx]);
                
                this.center[0] = idx;
                this.left = idx - 1;
                if(this.left === -1) this.left = this.totalCnt - 1;
                this.right = idx + 1;
                if(this.right === this.totalCnt) this.right = 0;
            });
        });

        this.pageBoxDOM = box;
    }
    onVisibility(element) {
        element.style.visibility = "visible";
    }
    offVisibility(element) {
        element.style.visibility = "hidden";
    }
    move(element, n, duration) {
        element.style.transitionDuration = `${duration}s`;
        element.style.transform = `translate(${n * this.itemWidth}px)`;
    }
    prev() {
        if(this.cnt === 1) {
            this.pageDOMs[this.center[0]].style.backgroundColor = this.pageColor;
            this.pageDOMs[this.left].style.backgroundColor = this.curColor;
        }   
    
        this.itemDOMs[this.center[this.cnt - 1]].addEventListener("transitionend", () => {
            this.offVisibility(this.itemDOMs[this.center[this.cnt - 1]]);
            this.move(this.itemDOMs[this.center[this.cnt - 1]], 0, 0.01);

            this.right = this.center[this.cnt - 1];
            this.center.pop();
            this.center.unshift(this.left--);
            if (this.left === -1) this.left = this.totalCnt - 1;

            this.prevBtnDOM.addEventListener("click", () => this.prev(), { once: true });
        }, { once: true });
        this.itemDOMs[this.left].addEventListener("transitionend", () => {
            this.onVisibility(this.itemDOMs[this.left]);
            this.move(this.itemDOMs[this.left], 0, this.duration);
        }, { once: true });
        this.center.forEach((itemIdx, idx) => {
            this.move(this.itemDOMs[itemIdx], idx + 1, this.duration);
        });
        this.move(this.itemDOMs[this.left], -1, 0.001);
    }
    next() {
        if(this.cnt === 1) {
            this.pageDOMs[this.center[0]].style.backgroundColor = this.pageColor;
            this.pageDOMs[this.right].style.backgroundColor = this.curColor;
        }
        
        this.itemDOMs[this.center[0]].addEventListener("transitionend", () => {
            this.offVisibility(this.itemDOMs[this.center[0]]);
            this.move(this.itemDOMs[this.center[0]], 0, 0.01);

            this.left = this.center[0];
            this.center.shift();
            this.center.push(this.right++);
            if (this.right === this.totalCnt) this.right = 0;

            this.nextBtnDOM.addEventListener("click", () => this.next(), { once: true });
        }, { once: true });
        this.itemDOMs[this.right].addEventListener("transitionend", () => {
            this.onVisibility(this.itemDOMs[this.right]);
            this.move(this.itemDOMs[this.right], this.cnt - 1, this.duration);
        }, { once: true });
        this.center.forEach((itemIdx, idx) => {
            this.move(this.itemDOMs[itemIdx], idx - 1, this.duration);
        });
        this.move(this.itemDOMs[this.right], this.cnt, 0.001);
    }
    render() {
        this.parentDOM.appendChild(this.box);
        this.parentDOM.appendChild(this.prevBtnDOM);
        this.parentDOM.appendChild(this.nextBtnDOM);

        if(this.cnt === 1) {
            this.parentDOM.appendChild(this.pageBoxDOM);
        }
    }
}