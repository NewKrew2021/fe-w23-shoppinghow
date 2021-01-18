/*
    keyword.js
    쇼핑하우 검색창 클릭 시 나타나는 추가 영역 관련 함수
*/

/* 검색창 포커스 시 keyword 영역 표시, 포커스 해제 시 none */
function showKeywordInner(){
    const search_blank = dom('.search-input').querySelector();
    const keyword = dom('.keyword').querySelector();
    search_blank.addEventListener('focus', ()=>{
        keyword.style.display = 'block';
    })
    search_blank.addEventListener('blur',()=>{
        keyword.style.display = 'none';
    })
}
showKeywordInner();