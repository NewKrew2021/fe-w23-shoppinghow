export function initItemSection(){
    const section=document.querySelector("#section2");
    let html="";
    let pageNum=0;

    localStorage.setItem("popupData",JSON.stringify([]));

    //버튼 클릭시 동작하는 5개 추가 fetch 함수
    function fetchPage(pNum){
        fetch("http://localhost:3000/items?" 
        + new URLSearchParams({page: pageNum}) ,{method: 'GET',})
        .then((response) => {
            if (response.status >= 400) 
                throw new Error("Bad response from server");
            return response.json();
        }).then((data)=>{
            const itemList=section.querySelector("#item-list");
            const li=data.items.reduce((acc,{href,src,title,subtitle,badge})=>{
                return acc+`<span class="item">
                                <img src=${src} href=${href}></img>
                                <div class="title">${title}</div>
                                <div class="subtitle">${subtitle}</div>
                                <div class="badge">${badge}</div>
                            </span>`;
            },"");
            pageNum++;
            itemList.innerHTML+=li;
        }).catch(console.log);
    }
    fetchPage(pageNum);

    html=`<div id="item-list">
        </div>
        <button id="load">더 보기 ↓</button>`;
    
    section.innerHTML=html;

    //리스트 전체에 item에 대한 클릭 이벤트 추가
    const itemList=document.querySelector("#item-list");
    itemList.addEventListener("click",(e)=>{
        const item=e.target.closest(".item");
        const img=item.querySelector("img");
        const src=img.src;
        const href=img.attributes.href.value;

        const popupData=JSON.parse(localStorage.getItem("popupData"));
        popupData.push({src:src,href:href});
        localStorage.setItem("popupData",JSON.stringify(popupData));
    });

    //더보기 클릭시 동작하는 리스너
    const loadBtn=section.querySelector("#load");
    loadBtn.addEventListener("click",(e)=>{
        fetchPage(pageNum);
    });
    
};