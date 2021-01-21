export function initSearchBar(){
    const searchBar = document.querySelector("#search-bar");
    searchBar.addEventListener("input",(e)=>{
        const keyword=e.target.value;
        fetch("http://localhost:3000/keyword-result?"
        + new URLSearchParams({keyword: keyword}), { method: 'GET', })
        .then((response) => {
            return response.json();
        }).then((data) => {
            //TODO:data.keywordData를 이용한 작업
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
}