/*
    # Array(String) 형태
     large: ["패션/뷰티", "가전/컴퓨터", "가구/생활/건강" ...]
    medium: [["여성의류", "남성의류", "테마의류/잡화" ...], [], [], ...]
     small: [[["니트/스웨터", "티셔츠", "가디건", ...], [], [], ...], [], ...]

    
    # Array(HTML) 형태


    
    # CSS class
    category--box
    category--large, category--medium, category--small
    category--large__item, category--medium__item, category--small__item 
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
        ret.large += `<div class="category--large__item">${largeItem}</div>`;
        let mediumHTML = `<div class="category--medium">`
        data.medium[i].forEach((mediumItem, j) => {
            mediumHTML +=  `<div class="category--medium__item">${mediumItem}</div>`;
            ret.small.push([]);
            let smallHTML = `<div class="category--small">`;
            data.small[i][j].forEach((smallItem) => {
                smallHTML += `<div class="category--small__item">${smallItem}</div>`;
            })
            smallHTML += "</div>";
            ret.small[j].push(smallHTML);
        })
        mediumHTML += "</div>";
        ret.medium.push(mediumHTML);
    });
    ret.large += "</div>";
    console.log(ret);
    return ret;
}

const transHTMLToDOM = function(data) {
    return null;
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
        transHTMLToDOM
    )(data);
};