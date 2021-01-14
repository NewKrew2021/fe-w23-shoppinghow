// initialize the page
(function initPage() {
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
    fetchItems('/carousel_promotion')
      .then(items => appendImageCarousel(carouselWrapper, 'carousel_promotion', items))
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

  initBestPromotionSection()
  initCarouselPromotionSection()
  initBestItems()
  initItemCardWrapper()
})()