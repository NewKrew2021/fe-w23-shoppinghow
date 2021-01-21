/*
    구현중
*/

const URL = "http://localhost:3000";

const getWord = async function(keyword) {
    let url = `${URL}/word?keyword=${keyword}`;
    const res = await fetch(url);
    const resData = await res.json();
    return resData;
}

const getDOM = function(type) {

}

const getInputDOM = function() {
    const element = document.createElement("input");
    element.setAttribute("type", "search");
    element.setAttribute("class", "input-box border-none");
    return element;
}
const getTopSearchedBoxDOM = function() {

}
const getSuggestionBoxDOM = function() {
    const element = document.createElement("div");
}

const clickHandler = function(e) {

}

const inputHandler = function(e) {
    const DOM = e.target;

}
const keydownHandler = function(e) {

}

const addEventHandler = function(DOM) {
    DOM.addEventHandler("click", e => clickHandler(e));
    DOM.addEventHandler("input", e => inputHandler(e));
    DOM.addEventHandler("keydown", e => keydownHandler(e));
}
 
const pipe = (...funcs) => data => {
    return funcs.reduce((acc, func) => {
        return func(acc);
    }, data);
};

export const initSearch = function () {
    return pipe(
        getInputDOM,
        addEventHandler
    )();
};