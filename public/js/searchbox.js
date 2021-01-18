/*
    searchbox.js
    쇼핑하우 검색창 관련 클래스
*/

// 클래스화 - 모듈
class SearchBox{

}

/* 검색창 포커스 시 keyword 영역 표시, 포커스 해제 시 none */
function showKeywordInner(){
    const search_blank = dom('.search-input').querySelector();
    const keyword = dom('.keyword').querySelector();
    const keyword_inner = dom('.keyword-inner').querySelector();
    const auto_inner = dom('.auto-complete').querySelector();
    const search_input = dom('.search-input').querySelector();
    search_input.addEventListener('input',(e)=>{
        const value = e.target.value;
        if(value === ''){
            auto_inner.style.display = 'none';
            keyword_inner.style.display = 'block';
        }
        else{
            auto_inner.style.display = 'block';
            keyword_inner.style.display = 'none';
        }
    });
    search_blank.addEventListener('focus', ()=>{
        keyword.style.display = 'block';
    })
    search_blank.addEventListener('blur',()=>{
        keyword.style.display = 'none';
    })
}
showKeywordInner();