(function(){
    const nav=document.querySelector("#header-nav");
    let html="";

    const category=`<img src ="/image/category.png"></img>
                <span>카테고리</span>`;
    html+=category;

    (function(){
        const dataList=[
            {text:"핫딜"},
            {text:"베스트100"},
            {text:"할인특가"},
            {text:"기획전"}
        ];
        const navData=dataList.reduce((acc,{text})=>{
            return acc+`<span class="nav">${text}</span>`
        },"");
        
        html+=navData;
    })();

    (function(){
        const dataList=[
            {text:"마스크"},
            {text:"스노우체인"},
            {text:"DIY키트"},
            {text:"비타민"},
            {text:"2021팬톤가구"}
        ];
        const navData=dataList.reduce((acc,{text})=>{
            return acc+`<span class="nav hash">#${text}</span>`
        },"");
        html+=navData;
    })();

    const sideNav=`
        <span>
            <img src ="/image/login.png"></img>
            <span>로그인</span>
        </span>
        <span id="recent-item">
            <img src ="/image/recent_item.png"></img>
            <span>최근본 상품</span>
            <div id="recent-popup">
                ejqhrl
            </div>
        </span>`;
    html+=sideNav;

   
    nav.innerHTML+=html;

    const qs=new QuerySelector();
    const recentItem=qs.query(document,"#recent-item");
    const popup=qs.query(document,"#recent-popup");
    recentItem.addEventListener("mouseenter",()=>{
        popup.style.display="block";
    });
    recentItem.addEventListener("mouseleave",()=>{
        popup.style.display="none";
    });


})();