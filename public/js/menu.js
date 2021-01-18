const nav = document.querySelector("#header-nav");
const data = {
    firstLayer: [{
        text: "패션/뷰티", secondLayer: [
            {
                text: "여성의류", thirdLayer: [
                    { text: "니트/스웨터" },
                    { text: "티셔츠" },
                    { text: "가디건" },
                    { text: "자켓/점퍼" },
                    { text: "모피/fur/코트" },
                    { text: "원피스" },
                    { text: "블라우스/셔츠" },
                    { text: "스커트" },
                    { text: "바지" },
                    { text: "조끼" },
                    { text: "코디세트" },
                    { text: "빅사이즈" },
                    { text: "패션수영복/비치웨어" },
                ]
            },
            {
                text: "남성의류", thirdLayer: [
                    { text: "티셔츠" },
                    { text: "니트/가디건" },
                    { text: "자켓/점퍼/코트" },
                    { text: "캐주얼셔츠" },
                    { text: "조끼" },
                    { text: "바지" },
                    { text: "정장" },
                    { text: "남성비치웨어" },
                    { text: "빅사이즈" },
                ]
            },
        ]
    },
    { text: "가전/컴퓨터" },
    { text: "가구/생활/건강" },
    { text: "식품/유아동" },
    { text: "여행/레저/자동차" }]
};

function setCurrentMenu(firstLayerIndex,secondLayerIndex){
    const firstLayerData=data.firstLayer;
    const secondLayerData=firstLayerData[firstLayerIndex].secondLayer;
    const thirdLayerData=secondLayerData[secondLayerIndex].thirdLayer;
    
    const fisrstLayerHtml = firstLayerData.reduce((acc, { text }) => {
        return acc + `<li class="first-layer">${text}</li>`
    }, "");
    
    const secondLayerHtml = secondLayerData.reduce((acc, { text }) => {
        return acc + `<li class="second-layer">${text}</li>`
    }, "");
    
    const thirdLayerHtml = thirdLayerData.reduce((acc, { text }) => {
        return acc + `<li class="third-layer">${text}</li>`
    }, "");

    const html = `<div id="menu">
    <div id="first-layer">${fisrstLayerHtml}</div>
    <div id="second-layer">${secondLayerHtml}</div>
    <div id="third-layer">${thirdLayerHtml}</div>
    </div>`;

    nav.innerHTML += html;

}
setCurrentMenu(0,0);