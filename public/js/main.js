const URL = "http://localhost:3000";
let basicItemCnt = 10;

// carousel, best, hot items
function getItems(type) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/${type}`).then((response) => {
            resolve(response.json());
        });
    });
}

// basic items
const getBasicItems = (idx, cnt) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/basic?idx=${idx}&cnt=${cnt}`).then((response) => {
            resolve(response.json());
        });
    });
}

const initPage = () => {
    const containerDOM = document.querySelector(".container");
    const containerBasicItemDOM = document.querySelector(".container--basic-item");
    containerDOM.appendChild(margin(20));

    // 팝업 레이어 이벤트 등록
    const rvi = document.querySelector(".header__nav__menu");
    const popupDOM = document.getElementById("popup");
    rvi.addEventListener("mouseover", () => {
        popupDOM.style.display = "block";
        popupDOM.innerHTML = `<div class="popup__title">최근 본 상품 ${myStorage.length}개</div><br>`;
        for(let i = 0; i < myStorage.length; i++) {
            popupDOM.innerHTML += `<img class="popup__img" src="${myStorage.getItem(myStorage.key(i))}">`
        }
    });
    rvi.addEventListener("mouseout", () => {
        popupDOM.style.display = "none";
    });
    Promise.all([
        getItems("carousel"),
        getItems("best"),
        getItems("hot"),
        getBasicItems(0, 10)
    ]).then(data => {
        const carousels = data[0].items;
        const bests = data[1].items;
        const hots = data[2].items;
        const basics = data[3].items;
        
        // best, carousel box
        containerDOM.appendChild(promotionBox(carousel(), bestItem(bests[0].src)));
        const c = new Carousel(containerDOM.lastChild.firstChild, carousels);
        c.init();
        c.render();
        containerDOM.appendChild(box(hots.slice(0, 5)));
        
        // carousel test
        

        // default 10개 표시
        containerBasicItemDOM.appendChild(subject("모든 상품 품절주의!"));
        containerBasicItemDOM.appendChild(box(basics.slice(0, 5)));
        containerBasicItemDOM.appendChild(box(basics.slice(5, 10)));
        
        const moreBtn = more();
        document.querySelector(".container--more").appendChild(moreBtn);
        moreBtn.addEventListener("click", () => {
            getBasicItems(basicItemCnt, 5).then(data => containerBasicItemDOM.appendChild(box(data.items)));
            basicItemCnt += 5;
        });
    });
}

window.addEventListener("DOMContentLoaded", initPage);