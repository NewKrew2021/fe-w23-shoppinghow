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

function getMultiNavHtmlString(id, dataList, depth, isMainNav = false) {
  /*

  dataList: array of {
    id?
    title?
    href?
    data?
  }

  */

  // array of { id, dataList }
  const subNavDataList = []
  let htmlString = '';

  // open wrapper
  htmlString += `
    <div
      id="${id}"
      class="d-flex flex-${depth} ${isMainNav ? `` : `hover-popup-target`}"
      ${isMainNav ? `` : `data-hover-popup-target="#${id}" data-hover-hide-delay="${HOVER_HIDE_DELAY}"`}
    >`

  // open nav
  htmlString += `<nav class="flex-1">`

  // open list
  htmlString += `<ul class="nav-list nav-vertical">`

  // for each list item,
  htmlString += dataList.reduce((htmlString, data) => {
    let subNavID

    // if item has sub-nav,
    if (data.data) { 
      // make ID for sub-nav
      subNavID = `${id}-sub${subNavDataList.length}`

      // push sub-nav data to {subNavDataList}
      subNavDataList.push({
        id: subNavID,
        dataList: data.data
      })
    }

    // make list item and return the accumulated
    return htmlString + getNavListItemHtmlString(data, subNavID)
  }, '')

  // close list
  htmlString += `</ul>`

  // close nav
  htmlString += `</nav>`

  // append sub-nav (if exist)
  htmlString += subNavDataList.reduce((htmlString, subNavData) =>
    htmlString + getMultiNavHtmlString(subNavData.id, subNavData.dataList, depth - 1), '')

  // close wrapper
  htmlString += `</div>`

  // return complete HTML string
  return htmlString
}

// append multinav to the wrapper
export function appendMultiNav(wrapper) {
  wrapper.innerHTML += getMultiNavHtmlString(
    'multinav',     // id
    MULTINAV_DATA,  // dataList
    MULTINAV_DEPTH, // depth
    true            // isMainNav
  )
}
