import images from "../images";

export function getCardTemplate ({href, title, subtitle, badge}, id) {
        return `<div class="card" id="${id}">
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