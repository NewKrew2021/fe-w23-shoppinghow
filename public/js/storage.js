/*
    storage.js
    로컬 스토리지 관련 함수
*/

/* 로컬 스토리지로부터 값을 가져와 이미지 태그에 넣는 함수 */
function getLocalStorage() {
    const target = DOM('#recent-img').querySelector();
    const cntTarget = DOM('.recent-count').querySelector();
    let text = "";
    for (let [key, value] of Object.entries(localStorage).sort()) {
        text += `<img class='mg-left-4' src=${value}>`
    }
    cntTarget.innerHTML = localStorage.length;
    target.innerHTML = text;
}

/* 이미 로컬 스토리지에 저장되어 있는 사진인지 판단하는 함수 */
function isExist(target){
    for (let [key, value] of Object.entries(localStorage)){
        if (value === target)
            return true;
    }
    return false;
}

/* 배너 사진 클릭 시 로컬 스토리지에 담는 이벤트 함수 */
function clickSaveStorage() {
    const bannerImage = DOM('.banner-img').querySelectorAll();
    bannerImage.forEach(function (element) {
        element.addEventListener('click', function () {
            let imgsrc = this.getAttribute('src');
            if (!isExist(imgsrc))
                localStorage.setItem(Date.now(),imgsrc);
        });
    });
}

/* 로그인 버튼 누르면 로컬 스토리지 비우기 */
function removeLocalStorage(){
    const loginBtn = DOM('#login').querySelector();
    loginBtn.addEventListener('click',()=>{
        localStorage.clear();
    })
}
removeLocalStorage();