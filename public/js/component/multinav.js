// TODO: Refactor, fix bugs, and add coments
import MultiNavData from './multinav_data.json'
const { depth: MULTINAV_DEPTH, data: MULTINAV_DATA } = MultiNavData
const HOVER_HIDE_DELAY = 0

function getNavListItemHtmlString({ title, href }, hoverToggleTarget) {
  return `
    <li
      role="button"
      class="hover-bg-white"
      ${hoverToggleTarget ? `data-hover-toggle-target="#${hoverToggleTarget}"` : ''}
    >
    ${href ? `<a href="${href}">` : ``}
      <p class="px-3 py-2 m-0">${title}</p>
    ${href ? `</a>` : ``}
    </li>`
}

function getMultiNavHtmlString({ group, id, dataList, depth, isMainNav = false }) {
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
      class="d-flex flex-${depth} ${isMainNav ? `bg-light` : `bg-white text-small`}"
      ${isMainNav ? `` : `data-hover-toggle-group="${group}"`}
      data-hover-hide-delay="${HOVER_HIDE_DELAY}"
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
        group: id,
        id: subNavID,
        dataList: data.data,
        depth: depth - 1,
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
    htmlString + getMultiNavHtmlString(subNavData), '')

  // close wrapper
  htmlString += `</div>`

  // return complete HTML string
  return htmlString
}

// append multinav to the wrapper
export function appendMultiNav(wrapper) {
  const navData = {
    id:        'multinav',
    dataList:  MULTINAV_DATA,
    depth:     MULTINAV_DEPTH,
    isMainNav: true,
  }

  wrapper.innerHTML += getMultiNavHtmlString(navData)
}
