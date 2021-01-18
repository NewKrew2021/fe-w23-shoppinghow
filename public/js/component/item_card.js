import { find } from "../util";

// append an item card to the wrapper
export function appendItemCard(wrapper, items) {
  const ItemCardHtmlString = items.reduce(
    (str, { href, src, title, subtitle, badge }) => str + `
    <div
      class="item-card box w-20 p-3"
      data-href="${href}"
      data-src="${src}"
    >
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

// initialize item card wrapper to handle click event for items
export function initItemCardWrapper() {
  find('.item-card-wrapper').forEach(wrapper => {
    // add click event listener
    wrapper.addEventListener('click', event => {
      // find the item card
      const itemCard = event.target.closest('.item-card')

      // handle exception: item card not found
      if (!itemCard) {
        return
      }

      // save data into the recent-viewed item list
      saveRecent(itemCard.dataset)

      // init recent view
      if (wrapper.dataset.recentView) {
        const recentView = findOne(wrapper.dataset.recentView)
        if (recentView) {
          initRecent(recentView)
        }
      }
    })
  });
}