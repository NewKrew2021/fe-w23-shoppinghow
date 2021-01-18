/*
    keyword.js
    쇼핑하우 검색창 클릭 시 나타나는 추가 영역 관련 함수
*/

/* 검색창 포커스 시 keyword 영역 표시, 포커스 해제 시 none */
function showKeywordInner(){
    const search_blank = dom('.search-input').querySelector();
    const keyword = dom('.keyword').querySelector();
    const keyword_inner = dom('.keyword-inner').querySelector();
    const auto_inner = dom('.auto-complete').querySelector();
    const search_input = dom('.search-input').querySelector();
    search_input.addEventListener('input',(e)=>{
        const value = e.target.value;
        if(value === ''){ // 빈 칸일 경우 다시 인기 키워드를 표시
            auto_inner.style.display = 'none';
            keyword_inner.style.display = 'block';
        }
    });
    search_blank.addEventListener('focus', ()=>{
        keyword.style.display = 'block';
    })
    search_blank.addEventListener('blur',()=>{
        keyword.style.display = 'none';
        keyword_inner.style.display = 'block';
        auto_inner.style.display = 'none';
    })
}
showKeywordInner();

/* 단어 입력 시 자동완성 영역 표시 */
function showAutocomplete(){
    const search_blank = dom('.search-input').querySelector();
    const keyword_inner = dom('.keyword-inner').querySelector();
    const auto_inner = dom('.auto-complete').querySelector();
    search_blank.addEventListener('keydown',()=>{
        keyword_inner.style.display = 'none';
        auto_inner.style.display = 'block';
    })
}
showAutocomplete();