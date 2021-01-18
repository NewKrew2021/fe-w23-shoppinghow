import { find, findOne } from "../util"

const CAROUSEL_TRANSITION_INTERVAL = 5000
const CAROUSEL_TRANSITION_DELAY = 300

// append a simple image-carousel to the wrapper
export function appendImageCarousel(wrapper, id, items, pageSize = 1) {
  const carouselItemHtmlString = items.reduce((str, { href, src }) => str + `
    <div class="carousel-item w-${Math.floor(100 / pageSize)}">
      <a href="${href}">
        <img src="${src}">
      </a>
    </div>
    `, '')

  // append to wrapper
  wrapper.innerHTML += `
    <div id="${id}" class="carousel" data-page-size="${pageSize}">
      <div class="carousel-inner">
        ${carouselItemHtmlString}
      </div>
      <button class="carousel-button-prev">&#10094;</button>
      <button class="carousel-button-next">&#10095;</button>
    </div>
    `
}

// initialize a carousel
export function initCarousel(carousel) {
  const carouselId = carousel.getAttribute('id')
  const items = find(`#${carouselId} .carousel-item`)
  const carouselInfo = {
    index: 0,
    pageSize: parseInt(carousel.dataset.pageSize) || 1,
    items: items,
    nItems: items.length,
    isOnTransition: false,
  }

  // add click event listener to prev button
  findOne(`#${carouselId} .carousel-button-prev`)
    .addEventListener('click', () => showNextCarouselItem(carouselInfo, true))

  // add click event listener to next button
  findOne(`#${carouselId} .carousel-button-next`)
    .addEventListener('click', () => showNextCarouselItem(carouselInfo))

  // show first item
  showNextCarouselItem(carouselInfo)

  // set interval event
  setInterval(() => showNextCarouselItem(carouselInfo), CAROUSEL_TRANSITION_INTERVAL)
}

// show next carousel item (also support reverse order)
export function showNextCarouselItem(carouselInfo, isReversed = false) {
  const { pageSize, items, nItems, isOnTransition } = carouselInfo
  let { index } = carouselInfo

  // prevent duplicated transition
  if (isOnTransition) return
  carouselInfo.isOnTransition = true

  // set index
  if (isReversed)
    index--
  else
    index++
  index = (index + nItems) % nItems
  carouselInfo.index = index

  // find items to transit
  const prevItem = items[(index - 1 + nItems) % nItems]
  const nowItems = []
  const nextItem = items[(index + pageSize) % nItems]

  // find all items to be active
  for (let i = 0; i < pageSize; i++) {
    nowItems.push(items[(index + i) % nItems])
  }

  // remove all prev/active/next classes and translateX setting
  items.forEach(item => {
    item.classList.remove('prev', 'active', 'next', 'reverse')
    delete item.dataset.carouselItemTranslateX
  })

  // add prev/active/next class
  prevItem.classList.add('prev')
  nowItems.forEach(item => item.classList.add('active'))
  nextItem.classList.add('next')

  // add reverse class
  if (isReversed) {
    prevItem.classList.add('reverse')
    nowItems.forEach(item => item.classList.add('reverse'))
    nextItem.classList.add('reverse')
  }

  // set translateX for items
  prevItem.dataset.carouselItemTranslateX = pageSize - 1
  for (let i = 0; i < pageSize; i++) {
    nowItems[i].dataset.carouselItemTranslateX = pageSize + i
  }
  nextItem.dataset.carouselItemTranslateX = pageSize * 2

  // end of transition
  setTimeout(() => {
    carouselInfo.isOnTransition = false
  }, CAROUSEL_TRANSITION_DELAY)
}
