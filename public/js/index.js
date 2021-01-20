import { appendImageCarousel, appendItemCard, appendMultiNav, initCarousel, initHoverPopup, initItemCardWrapper, initRecentWrapper, initSearchBar } from './component'

// initialize the page
function initPage() {
  // init the best-promotion section
  function initBestPromotionSection() {
    fetchItems('/best_promotion')
      .then(item => {
        findOne('#box_best_promotion').innerHTML = `
          <a href="${item.href}">
            <img src="${item.src}">
          </a>
          `
      })
  }

  // init the carousel-promotion section
  function initCarouselPromotionSection() {
    const carouselWrapper = findOne('#box_carousel_promotion')
    const carouselID = 'carousel_promotion'
    fetchItems('/carousel_promotion')
      .then(items => appendImageCarousel(carouselWrapper, carouselID, items))
      .then(() => {
        // initialize the carousel
        initCarousel(findOne(`#${carouselID}`, carouselWrapper))
      })
  }

  function initCategoryMultiNav() {
    appendMultiNav(findOne('#popup_category'))
  }

  // init the carousel-promotion section
  function initBestItems() {
    let pageIndex = 0
    let pageSize = 5

    function loadBestItems() {
      const cardItemsWrapper = findOne('#best_items')
      fetchItems('/best', { pageIndex: pageIndex, pageSize: pageSize })
        .then(items => appendItemCard(cardItemsWrapper, items))
      pageIndex++;
    }

    // add event listener to the button
    findOne('#btn_load_best_items')
      .addEventListener('click', loadBestItems)

    // load first items
    loadBestItems()
  }

  // init the hot item carousel
  function initHotItem() {
    const carouselWrapper = findOne('#box_carousel_hot')
    const carouselID = 'carousel_hot'
    fetchItems('/hot')
      .then(items => appendImageCarousel(carouselWrapper, carouselID, items, 5))
      .then(() => {
        // initialize the carousel
        initCarousel(findOne(`#${carouselID}`, carouselWrapper))
      })
  }

  initBestPromotionSection()
  initCarouselPromotionSection()
  initCategoryMultiNav()
  initBestItems()
  initHotItem()

  initSearchBar()
  initItemCardWrapper()
  initHoverPopup()
  initRecentWrapper(findOne('#recent_view'))
}

initPage()