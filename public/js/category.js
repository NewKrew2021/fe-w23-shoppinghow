/*
    # Array(String) 형태
     large: ["패션/뷰티", "가전/컴퓨터", "가구/생활/건강" ...]
    medium: [["여성의류", "남성의류", "테마의류/잡화" ...], [], [], ...]
     small: [[["니트/스웨터", "티셔츠", "가디건", ...], [], [], ...], [], ...]
    
    # CSS class
    category--box
    category--large, category--medium, category--small
    category--large__item, category--medium__item, category--small__item
    category--large__item--picked, category--medium__item--picked, category--small__item--picked 
*/

const transJsonToString = function(data) {
    const ret = {
        large: [],
        medium: [],
        small: []
    }
    data.forEach((large, i) => {
        ret.large.push(large.title);
        ret.medium.push([]);
        ret.small.push([]);
        large.data.forEach((medium, j) => {
            ret.medium[i].push(medium.title);
            ret.small[i].push([]);
            medium.data.forEach((small) => {
                ret.small[i][j].push(small.title);
            });
        });
    });
    console.log(ret);
    return ret;
}

const transStringToHTML = function(data) {
    const ret = {
        large: `<div class="category--large">`,
        medium: [],
        small: []
    };

    data.large.forEach((largeItem, i) => {
        ret.large += `<div name="${i}"class="category--large__item">${largeItem}</div>`;
        let mediumHTML = `<div name="${i}" class="category--medium">`
        ret.small.push([]);
        data.medium[i].forEach((mediumItem, j) => {
            mediumHTML +=  `<div name="${i}-${j}" class="category--medium__item">${mediumItem}</div>`;
            let smallHTML = `<div name="${i}-${j}" class="category--small">`;
            data.small[i][j].forEach((smallItem, k) => {
                smallHTML += `<div name="${i}-${j}-${k}" class="category--small__item">${smallItem}</div>`;
            })
            smallHTML += "</div>";
            ret.small[i].push(smallHTML);
        })
        mediumHTML += "</div>";
        ret.medium.push(mediumHTML);
    });
    ret.large += "</div>";
    console.log(ret);
    return ret;
}

const transHTMLToDOM = function(data) {
    const ret = document.createElement("div");
    ret.setAttribute("class", "category--box horizontal");
    ret.innerHTML = data.large;
    ret.innerHTML += data.medium.reduce((acc, cur) => acc + cur, "");
    data.small.forEach((arr) => {
        ret.innerHTML += arr.reduce((acc, cur) => acc + cur, "");
    });
    return ret;
}

const setInfo = function(data) {
    const ret = {
        boxDOM: data,
        lIdx: 0,
        mIdx: 0,
        sIdx: 0,
        
    }
}

const addEventHandler = function(data) {
    const ret = {
        boxDOM: data,
        lIdx: 0,
        mIdx: 0,
        sIdx: 0,
        refreshIdx(i, j, k) {
            
        }      
    }
    data.addEventListener("mouseover", (e) => {
        const number = e.target.getAttribute("name"); // i-j-k
        switch(e.target.className) {
            case "category--large__item":
                ret.lIdx = idx;
                ret.mIdx = 0;
                ret.sIdx = 0;
                break;
            case "category--medium__item":
                ret.mIdx = idx;
                ret.sIdx = 0;
                break;
            case "category--small__item":
                ret.sIdx = 0;
                break;
        }
    });
    return ret;
}

const pipe = (...funcs) => data => {
    return funcs.reduce((acc, func) => {
        return func(acc);
    }, data);
};

export const initCategory = function(data) {
    return pipe(
        transJsonToString,
        transStringToHTML,
        transHTMLToDOM,
        setInfo,
        addEventHandler,
    )(data);
};