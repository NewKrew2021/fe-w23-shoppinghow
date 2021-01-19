export class Carousel {
    /* 
        items [DOM, DOM, ...] 
        <style>
        position: absolute;
        top: 0;
        left: 0;
    */
    constructor(parentDOM, itemDOMs, itemWidth, itemHeight) {
        this.parentDOM = parentDOM; // carousel이 자식으로 들어갈 부모요소

        this.itemDOMs = itemDOMs;
        this.totalCnt = itemDOMs.length;

        this.itemWidth = itemWidth;
        this.itemHeight = itemHeight;
    }

    init(cnt, duration) {
        this.cnt = cnt; // 한번에 보여지는 요소의 개수

        this.box = document.createElement("div");
        this.box.setAttribute("style", `width: ${this.itemWidth * cnt}px;height: ${this.itemHeight}px;
            overflow: hidden; margin: auto; position:relative`);
        
        this.duration = duration;
        this.durationZero = 0.001;

        // 모든 요소 안보이게 하고 왼쪽 끝에 겹쳐놓음
        this.itemDOMs.forEach((item) => {
            this.offVisibility(item);
            this.box.appendChild(item);
        });

        this.initIndex(); // left, center, right 초기화, center는 배열(한번에 여러개 보여질 때)
        
        // 현재 보여질 요소들을 보이게 하고 자기 자리로 이동시킴
        this.center.forEach((itemIdx, idx) => {
            const item = this.itemDOMs[itemIdx];
            this.onVisibility(item);
            this.move(item, idx, 0.01);
        });

        // 좌우 버튼 초기화
        this.initBtn();

        // 한번에 보여지는 요소가 여러개라면 막대페이지 불가능 
        if(this.cnt === 1) {
            this.initPage();
        }
    }
    
    // 왼쪽, 중간, 오른쪽 가리키는 포인터(인덱스) 초기화
    initIndex() {
        this.left = this.totalCnt - 1;
        this.center = [];
        for (let i = 0; i < this.cnt; i++) this.center.push(i);
        this.right = this.cnt;
    }

    // 좌 우 버튼
    initBtn() {
        // {once:true} 옵션은 transition이 끝나기 전에 눌릴 경우 대비, transition이 끝나면 다시 버튼에 이벤트 등록
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

    // 막대 페이지
    initPage() {
        const box = document.createElement("div");
        box.setAttribute("class", "page-box margin-center horizontal");

        let html = "";
        for(let i = 0; i < this.totalCnt; i++) html += `<div class="page"></div>`;
        box.innerHTML = html;

        this.pageDOMs = [...box.childNodes];
        this.changeClass(this.pageDOMs[this.center[0]], "page-btn-normal", "page-btn-picked");
        this.pageDOMs.forEach((item, idx) => {
            item.addEventListener("mouseover", () => {
                this.changeClass(this.pageDOMs[this.center[0]], "page-btn-picked", "page-btn-normal");
                this.offVisibility(this.itemDOMs[this.center[0]]);

                this.changeClass(this.pageDOMs[idx], "page-btn-normal", "page-btn-picked");
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

    // element에서 target 제거, className 추가
    changeClass(element, target, className) {
        element.classList.remove(target);
        element.classList.add(className);
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
            // 막대 페이지
            this.changeClass(this.pageDOMs[this.center[0]], "page-btn-picked", "page-btn-normal");
            this.changeClass(this.pageDOMs[this.left], "page-btn-normal", "page-btn-picked");
        }   
    
        this.itemDOMs[this.center[this.cnt - 1]].addEventListener("transitionend", () => {
            this.offVisibility(this.itemDOMs[this.center[this.cnt - 1]]);
            this.move(this.itemDOMs[this.center[this.cnt - 1]], 0, this.durationZero);

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
        this.move(this.itemDOMs[this.left], -1, this.durationZero);
    }
    next() {
        if(this.cnt === 1) {
            // 막대 페이지
            this.changeClass(this.pageDOMs[this.center[0]], "page-btn-picked", "page-btn-normal");
            this.changeClass(this.pageDOMs[this.right], "page-btn-normal", "page-btn-picked");
        }
        
        this.itemDOMs[this.center[0]].addEventListener("transitionend", () => {
            this.offVisibility(this.itemDOMs[this.center[0]]);
            this.move(this.itemDOMs[this.center[0]], 0, this.durationZero);

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
        this.move(this.itemDOMs[this.right], this.cnt, this.durationZero);
    }

    // DOM트리에 연결
    render() {
        this.parentDOM.appendChild(this.box);
        this.parentDOM.appendChild(this.prevBtnDOM);
        this.parentDOM.appendChild(this.nextBtnDOM);

        if(this.cnt === 1) {
            this.parentDOM.appendChild(this.pageBoxDOM);
        }
    }
}