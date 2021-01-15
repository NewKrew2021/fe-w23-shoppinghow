(function () {
    const container = document.querySelector("#container");
    let html = "";

    const bestPart = `<span id="best"><img src=/image/b100_kid.png></img></span>`;
    html += bestPart;

    (function () {
        const dataList = [
            { position: "current", src: "/image/promotion1.png" },
            { position: "next", src: "/image/promotion2.png" },
            { position: "prev", src: "/image/promotion3.png" },
        ];

        const promotion = dataList.reduce((acc, { position, src }) => {
            return acc + `<span class="promotion-item ${position}"><img src=${src}></img></span>`
        }, '');


        html += `<span id="promotion-carousel">${promotion}
                    <a class="prev-btn" onclick="prev()">&#10094;</a>
                    <a class="next-btn" onclick="next()">&#10095;</a>
                    <div id="dots">
                        <span class="dot" ></span>
                        <span class="dot" ></span>
                        <span class="dot" ></span>
                    </div>
                </span>`;
    })();
    html=`<div id="section1">${html}</div>`;
    html+=`<div id="section2"></div>`;
    html+=`<div id="section3"></div>`;
    container.innerHTML += html;

})();

function next(){
    const carousel=document.querySelector("#promotion-carousel");
    const slides = carousel.querySelectorAll(".promotion-item");
    let changed=[false,false,false];
    const SPEED="300ms";

    for(let i = 0 ; i < slides.length;i++){
        const s=slides[i];
        if(s.className.includes("current") && !changed[i] ){
            s.style.transform= `translateX(${-100}%)`;
            s.style.transition = SPEED;
            s.className=s.className.replace("current","prev");
            s.style["z-index"]=-1000000;
            changed[i]=true;
        } else if(s.className.includes("next")&& !changed[i]){
            s.style.transform= `translateX(-${0}%)`;
            s.style.transition = SPEED;
            s.className=s.className.replace("next","current");
            changed[i]=true;
            s.style["z-index"]=0;
        }else if(s.className.includes("prev")&& !changed[i]){
            s.className=s.className.replace("prev","next");
            s.style.transform= `translateX(+${100}%)`;
            s.style.transition = SPEED;        
            changed[i]=true;
            s.style["z-index"]=-2000000;
        }
    }

}
function prev(){
    const carousel=document.querySelector("#promotion-carousel");
    const slides = carousel.querySelectorAll(".promotion-item");
    let changed=[false,false,false];
    const SPEED="300ms";

    for(let i = 0 ; i < slides.length;i++){
        const s=slides[i];
        if(s.className.includes("current") && !changed[i] ){
            s.style.transform= `translateX(${+100}%)`;
            s.style.transition = SPEED;
            s.className=s.className.replace("current","next");
            s.style["z-index"]=-1000000;
            changed[i]=true;
        } else if(s.className.includes("next")&& !changed[i]){
            s.style.transform= `translateX(${-100}%)`;
            s.style.transition = SPEED;
            s.className=s.className.replace("next","prev");
            changed[i]=true;
            s.style["z-index"]=-2000000;
        }else if(s.className.includes("prev")&& !changed[i]){
            s.className=s.className.replace("prev","current");
            s.style.transform= `translateX(+${0}%)`;
            s.style.transition = SPEED;        
            changed[i]=true;
            s.style["z-index"]=0;
        }
    }

}