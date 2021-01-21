import { appendImageCarousel, appendItemCard, appendMultiNav, initCarousel, initHoverPopup, initHoverToggle, initItemCardWrapper, initRecentWrapper, initSearchBar } from './component'
import { myFetchGET, findOne } from './util'

// initialize the page
function initPage() {
  // init the best-promotion section
  function initBestPromotionSection() {
    myFetchGET('/items/best_promotion')
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
    myFetchGET('/items/carousel_promotion')
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
      myFetchGET('/items/best', { pageIndex: pageIndex, pageSize: pageSize })
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
    myFetchGET('/items/hot')
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
  initHoverToggle()
  initRecentWrapper(findOne('#recent_view'))
}

initPage()