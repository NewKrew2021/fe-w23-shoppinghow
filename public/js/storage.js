/*
    storage.js
    
    로컬 스토리지 관련 기능을 담은 클래스
*/
import { dom } from './util.js';

export default class Storage {
    constructor() {
        this.target = dom('#recent-img').querySelector();
        this.cntTarget = dom('.recent-count').querySelector();
        this.bannerImage = dom('.banner-img').querySelectorAll();
        this.loginBtn = dom('#login').querySelector();
    }

    getLocalStorage() {
        let text = "";
        for (let [key, value] of Object.entries(localStorage).sort()) {
            text += `<img class='mg-left-4' src=${value}>`
        }
        this.cntTarget.innerHTML = localStorage.length;
        this.target.innerHTML = text;
    }

    clickSaveHandler() {
        function isExist(target){
            for (let [key, value] of Object.entries(localStorage)) {
                if (value === target)
                    return true;
            }
            return false;
        }
        this.bannerImage.forEach(function (element) {
            element.addEventListener('click', function () {
                let imgsrc = this.getAttribute('src');
                if (!isExist(imgsrc))
                    localStorage.setItem(Date.now(), imgsrc);
            });
        });
    }
}