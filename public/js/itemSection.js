(function(){
    const qs=new QuerySelector();
    const section=qs.query(document,"#section2");
    let html="";

    fetch("http://localhost:3000/item" ,{method: 'GET',})
    .then((response) => {
        if (response.status >= 400) 
            throw new Error("Bad response from server");
        return response.json();
    }).then((data)=>{
        li=data.items.reduce((acc,{href,src,title,subtitle,badge})=>{
            return acc+`<span class="item">
                            <img src=${src}></img>
                            <div class="title">${title}</div>
                            <div class="subtitle">${subtitle}</div>
                            <div class="badge">${badge}</div>
                        </span>`;
        },"");

        section.innerHTML+=li;
    }).catch((err)=>{console.log(err)});
    



})();
