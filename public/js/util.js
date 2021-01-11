"use strict";
(function fetchInitialData(){
    fetch("http://localhost:3000/data" ,{
        method: 'GET',
    }).then((response) => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then((data)=>{
        //TODO: data 활용하는 코드 만들기.
    }).catch((err)=>{
        console.log(err);
    });
})();
