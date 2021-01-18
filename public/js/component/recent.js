import { loadRecent } from "../util"

export function initRecentWrapper(wrapper) {
  const recent = loadRecent()
  let recentItemHtmlString

  if (recent.length == 0) {
    // no item
    recentItemHtmlString = `
      <p class="my-5 text-center">
        <strong>최근 본 상품</strong>이 없습니다
      </p>
      `
  } else {
    recentItemHtmlString = 
      recent
      .map(itemString => JSON.parse(itemString))
      .reduce(
        (htmlString, { href, src }) => htmlString + `
          <a href="${href}" class="p-1 w-33">
            <img src="${src}">
          </a>
        `, '')
  }

  // set wrapper
  wrapper.innerHTML = recentItemHtmlString
}
