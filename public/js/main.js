(function main() {
    const URL = "http://localhost:3000";
    
    function getItems(type) {
        return new Promise((resolve, reject) => {
            fetch(`${URL}/${type}`).then((response) => {
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
            getItems("hot")
        ]).then((data) => {
            const carousels = data[0].items;
            const bests = data[1].items;
            const items = data[2].items;

            let contents = carousel(carousels[0].src);
            contents += bestItem(bests[0].src);
            containerDOM.appendChild(box(contents));

            contents = basicItem(items[0]);
            contents += basicItem(items[1]);
            contents += basicItem(items[2]);
            contents += basicItem(items[3]);
            contents += basicItem(items[4]);
            containerDOM.appendChild(box(contents));

            containerDOM.appendChild(margin(100));
            contents = basicItem(items[5]);
            contents += basicItem(items[6]);
            contents += basicItem(items[7]);
            contents += basicItem(items[8]);
            contents += basicItem(items[9]);
            containerDOM.appendChild(box(contents));

            contents = bestItem(bests[1].src);
            contents += carousel(carousels[1].src);
            containerDOM.appendChild(box(contents));

            containerDOM.appendChild(margin(20));
        })
    });
})()
