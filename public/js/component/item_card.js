// append an item card to the wrapper
function appendItemCard(wrapper, items) {
  const ItemCardHtmlString = items.reduce(
    (str, { href, src, title, subtitle, badge }) => str + `
    <div class="box w-20 p-3">
      <a href="#">
        <img src="${src}">
        <small class="d-block mt-3">
          <h3 class="text-ellipsis mb-1">${title}</h3>
          <p class="text-ellipsis my-1 gray">${subtitle}</p>
          <span class="mt-2 badge">${badge}</span>
        </small>
      </a>
    </div>
    `, '')

  // append to wrapper
  wrapper.innerHTML += ItemCardHtmlString
}
