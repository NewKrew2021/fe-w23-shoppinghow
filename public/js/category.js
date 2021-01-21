import { DOMSearchAPI } from "./DOM_search_api.js";

// name: "largeIndex-mediumIndex-smallIndex" name을 key로 각 DOM에 바로 접근하기 위함
const addNameToJson = function (data) {
    const dfs = function (node, h, idxArr) {
        if (node.title) node.name = idxArr.slice(0, h + 1).join("-");
        if (!node.data) return;
        node.data.forEach((child, i) => {
            idxArr[h + 1] = i;
            dfs(child, h + 1, idxArr);
        })
    }
    dfs(data, -1, []);
    return data;
}

const transJsonToString = function (data) {
    const name = {};
    const title = {};

    // bfs
    const q = [];
    q.push([data, 0]);
    while (q.length) {
        const front = q.shift();
        const node = front[0];
        const h = front[1];

        if (!node.data) continue;

        const res = node.data.reduce((acc, cur) => {
            if (cur.data) q.push([cur, h + 1]);
            return [...acc, cur.title];
        }, []);

        const ress = node.data.reduce((acc, cur) => {
            return [...acc, cur.name];
        }, []);

        if (title[h]) title[h].push(res);
        else title[h] = [res];

        if (name[h]) name[h].push(ress);
        else name[h] = [ress];
    }

    return { name, title };
}

// string to html
const transStringToHTML = function (data) {
    // 0: large, 1: medium, 2: small
    const boxTpl = {
        0(html, name) { return `<div name="${name}" class="category--large">${html}</div>` },
        1(html, name) { return `<div name="${name}" class="category--medium">${html}</div>` },
        2(html, name) { return `<div name="${name}" class="category--small">${html}</div>` },
    };
    const itemTpl = {
        0(title, name) { return `<div name="${name}" class="category--large__item">${title}</div>`; },
        1(title, name) { return `<div name="${name}" class="category--medium__item">${title}</div>`; },
        2(title, name) { return `<div name="${name}" class="category--small__item">${title}</div>`; }
    };

    let html = "";
    for (let h in data.title) {
        html += data.title[h].reduce((acc, cur, i) => {
            const res = cur.reduce((acc, cur, j) => {
                return acc + itemTpl[h](cur, data.name[h][i][j]);
            }, "");
            let name = data.name[h][i][0].split("-");
            name.pop();
            return acc + boxTpl[h](res, name.join("-"));
        }, "");
    }
    return html;
}

const transHTMLToDOM = function (html) {
    // 카테고리 전체 창 요소
    const element = document.createElement("div");
    element.setAttribute("class", "category--box horizontal d-off");

    element.innerHTML = html;

    return element;
}

const setCategoryElement = function (DOM) {
    const boxDOMs = {};
    const itemDOMs = {};

    // box를 root로 탐색해서 결과 저장
    const domapi = new DOMSearchAPI(DOM);

    const DOMs = [];
    const mediumDOMs = domapi.querySelectorAll(".category--medium");
    const smallDOMs = domapi.querySelectorAll(".category--small");

    const largeItemDOMs = domapi.querySelectorAll(".category--large__item");
    const mediumItemDOMs = domapi.querySelectorAll(".category--medium__item");
    const smallItemDOMs = domapi.querySelectorAll(".category--small__item");

    [...mediumDOMs, ...smallDOMs].forEach(dom => {
        boxDOMs[dom.getAttribute("name")] = dom;
    });
    [...largeItemDOMs, ...mediumItemDOMs, ...smallItemDOMs].forEach(dom => {
        itemDOMs[dom.getAttribute("name")] = dom;
    });

    // 초기화
    boxDOMs["0"].className = "category--medium--picked";
    boxDOMs["0-0"].className = "category--small--picked";

    itemDOMs["0"].className = "category--large__item--picked";
    itemDOMs["0-0"].className = "category--medium__item--picked";

    return {
        DOM: DOM,
        boxDOMs: boxDOMs,
        itemDOMs: itemDOMs,
        picked: "0-0"
    }
}

const handler = function (categoryInfo, name) {
    const len = name.split("-").length;
    switch (len) {
        case 1:

            categoryInfo.itemDOMs[categoryInfo.picked.slice(0, 1)].className = "category--large__item";
            categoryInfo.itemDOMs[name].className = "category--large__item--picked";

            categoryInfo.boxDOMs[categoryInfo.picked.slice(0, 1)].className = "category--medium";
            categoryInfo.boxDOMs[name].className = "category--medium--picked";
            name += "-0";

            categoryInfo.boxDOMs[categoryInfo.picked].className = "category--small";
            categoryInfo.boxDOMs[name].className = "category--small--picked";

            categoryInfo.itemDOMs[categoryInfo.picked].className = "category--medium__item";
            categoryInfo.itemDOMs[name].className = "category--medium__item--picked";

            categoryInfo.picked = name;
            break;
        case 2:
            categoryInfo.boxDOMs[categoryInfo.picked].className = "category--small";
            categoryInfo.boxDOMs[name].className = "category--small--picked";

            categoryInfo.itemDOMs[categoryInfo.picked].className = "category--medium__item";
            categoryInfo.itemDOMs[name].className = "category--medium__item--picked";

            categoryInfo.picked = name;
            break;
        case 3:
            categoryInfo.itemDOMs[name].className = "category--small__item--picked";
            break;
    }
}
const equation = function (x1, y1, x2, y2) {
    return function (x) {
        return ((y2 - y1) / (x2 - x1)) * (x - x1) + y1;
    }
}

const addEventHandler = function (categoryInfo) {
    const MoE = 3; // 오차 범위
    categoryInfo.DOM.addEventListener("mouseout", (e) => {
        if (e.target.className.indexOf("item") === -1) return;
        if (e.target.className.indexOf("small__item") !== -1) return;
        const domXY = e.target.getBoundingClientRect();
        const x1 =  e.clientX - 1;
        const y1 = e.clientY;
        const x2 = domXY.right;
        if (y1 <= domXY.top + MoE) { // 위
            const y2 = categoryInfo.DOM.getBoundingClientRect().top;
            categoryInfo.getY = equation(x1, y1, x2, y2);
            categoryInfo.dir = "up";
        }
        else if (y1 >= domXY.bottom - MoE) { // 아래
            const y2 = categoryInfo.DOM.getBoundingClientRect().bottom;
            categoryInfo.getY = equation(x1, y1, x2, y2);
            categoryInfo.dir = "down";

        }
        else {
            categoryInfo.dir = "left or right";
        }
    });
    categoryInfo.DOM.addEventListener("mousemove", (e) => {
        if (e.target.className.indexOf("item") === -1) return;
        const x = e.clientX;
        const y = e.clientY;
        if ((categoryInfo.dir === "up") && (y > categoryInfo.getY(x))) return;
        else if ((categoryInfo.dir === "down") && (y < categoryInfo.getY(x))) return;

        const name = e.target.getAttribute("name");
        handler(categoryInfo, name, categoryInfo.picked);
    });
    categoryInfo.DOM.addEventListener("mouseout", (e) => {
        if (e.target.className.indexOf("small__item") === -1) return;
        const name = e.target.getAttribute("name");
        categoryInfo.itemDOMs[name].className = "category--small__item";
    });
    return categoryInfo;
}

const pipe = (...funcs) => data => {
    return funcs.reduce((acc, func) => {
        return func(acc);
    }, data);
};

export const getCategoryDOM = function (data) {
    return pipe(
        addNameToJson,
        transJsonToString,
        transStringToHTML,
        transHTMLToDOM,
        setCategoryElement,
        addEventHandler
    )(data);
};