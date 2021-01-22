import { createElementFromHTML ,getMatchingPisition} from "./util";

export function initSearchBar(){
    const search = document.querySelector("#search");
    const searchBar = search.querySelector("#search-bar");
    let currentKeyword="";
    let dropdownInit=false;//한글입력후 아래버튼을 누르면 키가 두번 입력되는것을 해결하기위해 사용
    let dropdownLen=-1;
    let dropdownIndex=-1;

    const dropdownHTML = `<div id="dropdown" class="hide"></div>`;
    const dropdown=createElementFromHTML(dropdownHTML); 
    search.appendChild(dropdown);
    const liList=dropdown.childNodes;

    searchBar.addEventListener("input",(e)=>{
        const keyword=e.target.value;
        dropdown.classList.add("show-block");
        dropdown.classList.add("focus");
        if(keyword===currentKeyword) return;
        currentKeyword=keyword;
        fetch("http://localhost:3000/keyword-result?"
        + new URLSearchParams({keyword: keyword}), { method: 'GET', })
        .then((response) => {
            return response.json();
        }).then((data) => {
            const keywordData=data.keywordData;
            dropdownInit=false;
            dropdownIndex=keywordData.length-1;
            //if(keywordData.length===0) return;
            dropdownLen=keywordData.length;
            const li=keywordData.reduce((acc,text)=>{
                const pos=getMatchingPisition(text,keyword);
                return acc+`<li class="keyword-li" text="${text}">
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
    searchBar.addEventListener("keydown",(e)=>{
        if(e.key!=="ArrowDown") return;
        if(!dropdownInit) {//두번의 입력 중 한번은 이곳에서 리턴시킨다.
            dropdownInit=true;
            return;
        }
        if(liList.length===0) return;
        liList[dropdownIndex].classList.remove("active");
        dropdownIndex=(dropdownIndex+1)%dropdownLen;
        liList[dropdownIndex].classList.add("active");
        searchBar.value=liList[dropdownIndex].attributes.text.value;
        
    });
    searchBar.addEventListener("keydown",(e)=>{
        if(e.key!=="ArrowUp") return;
        if(!dropdownInit) {
            dropdownInit=true;
            return;
        }
        if(liList.length===0) return;
        liList[dropdownIndex].classList.remove("active");
        dropdownIndex=(dropdownIndex===0?dropdownLen-1:dropdownIndex-1);
        liList[dropdownIndex].classList.add("active");
        searchBar.value=liList[dropdownIndex].attributes.text.value;

    })

}