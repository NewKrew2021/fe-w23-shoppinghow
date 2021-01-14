(function(){
    const qs=new QuerySelector();
    const section=qs.query(document,"#section2");
    let html="";
    let pageNum=0;

    function fetchPage(pNum){
        fetch("http://localhost:3000/item?" 
        + new URLSearchParams({page: pageNum}) ,{method: 'GET',})
        .then((response) => {
            if (response.status >= 400) 
                throw new Error("Bad response from server");
            return response.json();
        }).then((data)=>{
            const itemList=qs.query(section,"#item-list");
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