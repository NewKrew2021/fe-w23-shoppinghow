import images from "../images";
const CardTemplate = (
    function() {
        function get ({href, title, subtitle, badge}, id = undefined) {
            return `<div class="card" ${id ? "id="+id: ''}>
                <img class="card__image" src="${href}">
                <div class="card__title">
                    ${title}
                </div>
                <div class="card__subtitle">
                    ${subtitle}
                </div>
                <div class="card__badge">
                    ${(badge === '테마' ? `<img src="${images.themaIcon}">`: badge)}
                </div>
            </div>`
        }
        return {get}
    }
)();

export default CardTemplate;