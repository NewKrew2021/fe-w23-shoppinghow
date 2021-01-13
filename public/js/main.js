/*
    리팩토링 필요
*/


(function main() {
    const URL = "http://localhost:3000";
    let basicItemCnt = 0;

    function getItems(type) {
        return new Promise((resolve, reject) => {
            fetch(`${URL}/${type}`).then((response) => {
                resolve(response.json());
            });
        });
    }

    const getBasicItems = (idx, cnt) => {
        return new Promise((resolve, reject) => {
            fetch(`${URL}/basic?idx=${idx}&cnt=${cnt}`).then((response) => {
                resolve(response.json());
            });
        });
    }

    window.addEventListener("DOMContentLoaded", () => {
        const containerDOM = document.querySelector(".container");
        containerDOM.appendChild(margin(20));
        
        Promise.all([
            getItems("carousel"),
            getItems("best"),
            getItems("hot"),
            getBasicItems(0, 10)
        ]).then((data) => {
            const carousels = data[0].items;
            const bests = data[1].items;
            const hots = data[2].items;
            let basics = data[3].items;

            // 리팩토링 필요
            let contents = carousel(carousels[0].src);
            contents += bestItem(bests[0].src);
            containerDOM.appendChild(box(contents));

            contents = "";
            for(let i = 0; i < 5; i++) contents += basicItem(hots[i]);
            containerDOM.appendChild(box(contents));

            containerDOM.appendChild(margin(100));
            
            containerDOM.appendChild(subject("모든 상품 품절주의!"));
            contents = "";
            for(let i = 0; i < 5; i++) contents += basicItem(basics[basicItemCnt + i]);
            basicItemCnt += 5;
            containerDOM.appendChild(box(contents));

            contents = "";
            for(let i = 0; i < 5; i++) contents += basicItem(basics[basicItemCnt + i]);
            basicItemCnt += 5;
            containerDOM.appendChild(box(contents));

            const moreBtn = more();
            containerDOM.appendChild(moreBtn);
            moreBtn.addEventListener("click", () => {
                getBasicItems(basicItemCnt, 5).then(data => {
                    contents = "";
                    for(let i = 0; i < 5; i++) contents += basicItem(data.items[i]);
                    basicItemCnt += 5;
                    containerDOM.appendChild(box(contents));
                });
            });

            containerDOM.appendChild(margin(20));
        })
    });
})()
