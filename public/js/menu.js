import { createElementFromHTML, getDistance } from "./util.js";
import { data } from "./menu.json";
export function initMenu() {

    const nav = document.querySelector("#header-nav");
    const menu = createElementFromHTML(`<div id="menu">
        <div id="first-layer"></div>
        <div id="second-layer"></div>
        <div id="third-layer"></div>
    </div>`);

    let prevX = 0;
    let prevY = 0;
    let prevTime=new Date().getTime();
    let throttle = null;
    const THRESHOLD = 500;


    menu.addEventListener("mouseover", (e) => {
        if (typeof e.target.attributes.idx === 'undefined') return;
        let curX = e.clientX;
        let curY = e.clientY;
        let curTime=new Date().getTime();
        const dist = getDistance(prevX, curX, prevY, curY);
        const timeSpent=curTime-prevTime;
        const speed = dist/timeSpent*100000;
        //console.log(speed);

        console.log(dist);
        if (dist < THRESHOLD) {
            if (e.target.className.includes('first-layer')) {
                setCurrentMenu(e.target.attributes.idx.value, 0, 0);
            }
            else if (e.target.className.includes('second-layer')) {
                setCurrentMenu(e.target.attributes.parentIdx.value, e.target.attributes.idx.value, 0);
            }
        }
        prevX = curX;
        prevY = curY;

        // // throttle
        // if(!throttle) {
        //     setTimeout(() => {
        //         throttle = null;

        //     }, 50);
        // }
        // throttle = true;
    })
    nav.appendChild(menu);

    function setCurrentMenu(firstLayerIndex, secondLayerIndex) {
        const firstLayerData = data;
        const secondLayerData = firstLayerData[firstLayerIndex].data;
        const thirdLayerData = secondLayerData[secondLayerIndex].data;

        const fisrstLayerHtml = firstLayerData.reduce((acc, { title }, idx) => {
            return acc + `<li class="first-layer" idx=${idx}>${title}</li>`
        }, "");

        const secondLayerHtml = secondLayerData.reduce((acc, { title }, idx) => {
            return acc + `<li class="second-layer" parentIdx=${firstLayerIndex} idx=${idx}>${title}</li>`
        }, "");

        const thirdLayerHtml = thirdLayerData.reduce((acc, { title }) => {
            return acc + `<li class="third-layer">${title}</li>`
        }, "");

        const menu = document.querySelector("#menu");
        const firstLayer = menu.querySelector("#first-layer");
        const secondLayer = menu.querySelector("#second-layer");
        const thirdLayer = menu.querySelector("#third-layer");
        firstLayer.innerHTML = fisrstLayerHtml;
        secondLayer.innerHTML = secondLayerHtml;
        thirdLayer.innerHTML = thirdLayerHtml;

        nav.innerHTML = "";
        nav.appendChild(menu);
    }
    setCurrentMenu(0, 0);
}
