(function(){
    const qs=new QuerySelector();
    const section=qs.query(document,"#section2");
    let html="";
    let pageNum=0;

    localStorage.setItem("popupData",JSON.stringify([]));

    function fetchPage(pNum){
        fetch("http://localhost:3000/item?" 
        + new URLSearchParams({page: pageNum}) ,{method: 'GET',})
        .then((response) => {
            if (response.status >= 400) 
                throw new Error("Bad response from server");
            return response.json();
        }).then((data)=>{
            const itemList=section.querySelector("#item-list");
            li=data.items.reduce((acc,{href,src,title,subtitle,badge})=>{
                return acc+`<span class="item">
                                <img src=${src}></img>
                                <div class="title">${title}</div>
                                <div class="subtitle">${subtitle}</div>
                                <div class="badge">${badge}</div>
                            </span>`;
            },"");
            pageNum++;
            itemList.innerHTML+=li;
            const newItemList=document.querySelectorAll(".item");
            newItemList.forEach(n=>{
                n.addEventListener("click",(e)=>{
                    const popupData=JSON.parse(localStorage.getItem("popupData"));
                    popupData.push({src:e.target.src});
                    localStorage.setItem("popupData",JSON.stringify(popupData));
                });
            })

        }).catch((err)=>{console.log(err)});
    }
    fetchPage(pageNum);

    html=`<div id="item-list">
        </div>
        <button id="load">더 보기 ↓</button>`;
    
    section.innerHTML=html;

    const loadBtn=qs.query(section,"#load");
    loadBtn.addEventListener("click",(e)=>{
        fetchPage(pageNum);
    });
    
})();