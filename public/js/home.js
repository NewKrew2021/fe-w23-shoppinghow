(function () {
    const container = document.querySelector("#container");
    let html = "";

    const bestPart = `<span><img src=/image/b100_kid.png></img></span>`;
    html += bestPart;

    (function () {
        const dataList = [
            { position: "current", src: "/image/promotion1.png" },
            { position: "next", src: "/image/promotion2.png" },
            { position: "prev", src: "/image/promotion3.png" },
        ];

        const promotion = dataList.reduce((acc, { position,src }) => {
            return acc + `<span class="promotion-item ${position}"><img src=${src}></img></span>`
        }, '');


        html += `<span id="promotion-carousel">${promotion}
                    <a class="prev-btn" onclick="prev()">&#10094;</a>
                    <a class="next-btn" onclick="next()">&#10095;</a>
                    <div style="text-align:center">
                        <span class="dot" onclick="currentSlide(0)"></span>
                        <span class="dot" onclick="currentSlide(1)"></span>
                        <span class="dot" onclick="currentSlide(2)"></span>
                    </div>
                </span>`;
    })();


    container.innerHTML += html;
})();

function next(){
    const carousel=document.querySelector("#promotion-carousel");
    let slides = carousel.querySelectorAll(".promotion-item");
    let changed=[false,false,false];

    for(let i = 0 ; i < slides.length;i++){
        const s=slides[i];
        if(s.className.includes("current") && !changed[i] ){
            s.style.transform= `translateX(${-100}%)`;
            s.style.transition = "300ms";
            s.className=s.className.replace("current","prev");
            s.style["z-index"]=1000000;
            changed[i]=true;
        } else if(s.className.includes("next")&& !changed[i]){
            s.style.transform= `translateX(-${0}%)`;
            s.style.transition = "300ms";
            s.className=s.className.replace("next","current");
            changed[i]=true;
            s.style["z-index"]=0;
        }else if(s.className.includes("prev")&& !changed[i]){
            s.className=s.className.replace("prev","next");
            s.style.transform= `translateX(+${100}%)`;
            s.style.transition = "300ms";        
            changed[i]=true;
            s.style["z-index"]=-1000000;
        }
    }

}