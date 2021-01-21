import { createElementFromHTML } from "./util";

export function initSearchBar(){
    const search = document.querySelector("#search");
    const searchBar = search.querySelector("#search-bar");
    searchBar.addEventListener("input",(e)=>{
        const keyword=e.target.value;
        fetch("http://localhost:3000/keyword-result?"
        + new URLSearchParams({keyword: keyword}), { method: 'GET', })
        .then((response) => {
            return response.json();
        }).then((data) => {
            //TODO:data.keywordData를 이용한 작업
            const li=data.keywordData.reduce((acc,text)=>
                acc+`<li class="keyword-li">${text}</li>`
            ,"");
            dropdown.innerHTML=li;
        }).catch((err) => { console.log(err) });
    });
    searchBar.addEventListener("focus",(e)=>{
        e.target.classList.add("focus");
        e.target.classList.remove("blur");
        
    });
    searchBar.addEventListener("blur",(e)=>{
        e.target.classList.add("blur");
        e.target.classList.remove("focus");
    });

    const dropdownHTML = `<div id="dropdown" class="focus">drop down</div>`;
    const dropdown=createElementFromHTML(dropdownHTML); 
    search.appendChild(dropdown);

}