export function initHotCarouselSection () {
    const section = document.querySelector("#section3");
    let html = `<div>
                    <p>지금 뜨는 테마 카테고리</p>
                    <div id="hot-carousel">
                        <div id="hot-carousel-list">
                        <a class="prev-btn" onclick="prev()">&#10094;</a>
                        <a class="next-btn" onclick="next()">&#10095;</a>
                        </div>
                    </div>
                </div>`; 
    section.innerHTML+=html;

    function createCarousel(carouselData){
        const AMOUNT=5;
        const XDISTANCE=195;
        let itemhtml="";

        const itemList = section.querySelector("#hot-carousel-list");
        const initialPrev=carouselData[carouselData.length-1];
        const initialDisplay=carouselData.slice(0,AMOUNT);
        const initialNext=carouselData[AMOUNT];

        let displayData=[initialPrev,...initialDisplay,initialNext];

        //i값을 사용하기 위해 기본 반복문을 사용
        let xPos=-XDISTANCE;
        for(let i =0;i<displayData.length;i++){
            let { href, src, title, subtitle, badge }=displayData[i];
            itemhtml+=`<span class="item" style="transform:translateX(${xPos}px);" pos=${i-1}>
            <img src=${src} href=${href}></img>
            <div class="title">${title}</div>
            <div class="subtitle">${subtitle}</div>
            <div class="badge">${badge}</div>
        </span>`;
        xPos+=XDISTANCE;
        }

        itemList.innerHTML+=itemhtml;


    };


    (function fetchCarouselData(){
        fetch("http://localhost:3000/hot-items?", { method: 'GET', })
        .then((response) => {
            if (response.status >= 400)
                throw new Error("Bad response from server");
            return response.json();
        }).then((data) => {
            createCarousel(data.items);
            
        }).catch((err) => { console.log(err) });
    })();
};
//TODO: 함수 위치 이동하기
function next(){
    const carousel=document.querySelector("#hot-carousel");
    const slides = carousel.querySelectorAll(".item");
    const XDISTANCE=195;
    const SPEED="300ms";
    for(let i = 0 ; i < slides.length;i++){
        const s=slides[i];
        let nextPos=Number(s.attributes.pos.value)-1;
        let speed=SPEED;
        if(nextPos===-2) {
            nextPos=5;
            speed="0ms";
        }
        s.style.transition = speed;
        s.style.transform= `translateX(${XDISTANCE*nextPos}px)`;
        s.attributes.pos.value=nextPos;
    }
}
function prev(){
    const carousel=document.querySelector("#hot-carousel");
    const slides = carousel.querySelectorAll(".item");

    const SPEED="300ms";
    for(let i = 0 ; i < slides.length;i++){
        const s=slides[i];
        let nextPos=Number(s.attributes.pos.value)+1;
        let speed=SPEED;
        if(nextPos===6) {
            nextPos=-1;
            speed="0ms";
        }
        s.style.transition = speed;
        s.style.transform= `translateX(${XDISTANCE*nextPos}px)`;
        s.attributes.pos.value=nextPos;
    }
}