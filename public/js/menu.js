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
    const THRESHOLD = 1000;

    menu.addEventListener("mousemove", (e) => {
        if (typeof e.target.attributes.idx === 'undefined') return;
        let curX = e.clientX;
        let curY = e.clientY;
        const dist = getDistance(prevX, curX, prevY, curY);
        prevX = curX;
        prevY = curY;

        if (dist < THRESHOLD) {
            if (e.target.className.includes('first-layer')) {
                setCurrentMenu(e.target.attributes.idx.value, 0);
            }
            else if (e.target.className.includes('second-layer')) {
                setCurrentMenu(e.target.attributes.parentIdx.value, e.target.attributes.idx.value);
            }
        }

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

    }
    setCurrentMenu(0, 0);

}
