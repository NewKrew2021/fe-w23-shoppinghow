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
    .then(items => appendImageCarousel(carouselWrapper,
      'carousel_promotion', items))
  }

  initBestPromotionSection()
  initCarouselPromotionSection()
})()