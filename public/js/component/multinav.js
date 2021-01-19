// TODO: Refactor, fix bugs, and add coments
import MultiNavData from './multinav_data.json'
const { depth: MULTINAV_DEPTH, data: MULTINAV_DATA } = MultiNavData
const HOVER_HIDE_DELAY = 0

function getNavListItemHtmlString({ title, href }, hoverPopupTarget) {
  return `
    <li
      role="button"
      class="nav-item"
      ${hoverPopupTarget ? `data-hover-popup-target="#${hoverPopupTarget}"` : ''}
    >
    ${href ? `<a href="${href}">` : ``}
      ${title}
    ${href ? `</a>` : ``}
    </li>`
}

export function appendMultiNav(wrapper) {
  const subNavData = [[MULTINAV_DATA]]
  let htmlString = `<div class="d-flex">`

  // init sub-nav data list
  for (let i = 1; i < MULTINAV_DEPTH; i++) {
    subNavData.push([])
  }

  // make nav and init next subNavData
  for (let i = 0; i < MULTINAV_DEPTH; i++) {
    // subNavData[i]: nav
    htmlString += `<nav class="flex-1 ${i == 0 ? 'bg-light' : 'text-small'}">`
    for (let j = 0; j < subNavData[i].length; j++) {
      // subNavData[i][j]: ul
      const subNavID = subNavData[i][j]?.id || ''
      htmlString += `
        <ul
          id="${subNavID}"
          class="nav-list nav-vertical ${i == 0 ? '' : 'hover-popup-target'}"
          ${subNavID ? `data-hover-popup-target="#${subNavID}"` : ''}
          data-hover-hide-delay="${HOVER_HIDE_DELAY}"
        >`
      for (let k = 0; k < subNavData[i][j].length; k++) {
        // li = subNavData[i][j][k]
        const nextNavData = subNavData[i][j][k].data
        if (nextNavData) {
          nextNavData.id = nextNavData.id || 'multinav-' + i + j + k;
          subNavData[i + 1].push(nextNavData)
        }

        htmlString += getNavListItemHtmlString(subNavData[i][j][k], nextNavData?.id)
      }
      htmlString += `</ul>`
    }
    htmlString += `</nav>`
  }
  htmlString += `</div>`


  wrapper.innerHTML += htmlString
}