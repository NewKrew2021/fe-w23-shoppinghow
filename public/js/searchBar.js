import { createElementFromHTML ,getMatchingPisition} from "./util";

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
            const li=data.keywordData.reduce((acc,text)=>{
                const pos=getMatchingPisition(text,keyword);
                return acc+`<li class="keyword-li">
                <span>${text.substring(0,pos.matchStart)}</span><!--
                --><span class="match">${text.substring(pos.matchStart,pos.matchEnd)}</span><!--
                --><span>${text.substring(pos.matchEnd)}</span>
                </li>`
            }
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