import images from "../images";
import dapi from '../utils/CustomDomAPI.js';

const Header = (function() {
    const headerEle = dapi.querySelector('header')
    function render() {
        headerEle.innerHTML = `        <div class="header__logo">
            <img src="//search1.daumcdn.net/search/cdn/simage/shopping/v2/common/nav/logo_shw.png">
        </div>
        <div class="header__search-box">
            <input type="text">
            <img src="${images.searchIcon}">
        </div>`
    };
    return {render}
})()

export default Header;