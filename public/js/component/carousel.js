// append a simple image-carousel to the wrapper
function appendImageCarousel(wrapper, id, items) {
  const carouselItemHtmlString = items.reduce((str, { href, src }) => str + `
    <div class="carousel-item">
      <a href="${href}">
        <img src="${src}">
      </a>
    </div>
    `, '')

  // append to wrapper
  wrapper.innerHTML += `
    <div id="${id}" class="carousel">
      <div class="carousel-inner">
        ${carouselItemHtmlString}
      </div>
      <button class="carousel-button-prev">&#10094;</button>
      <button class="carousel-button-next">&#10095;</button>
    </div>
    `

  // initialize the carousel
  initCarousel(findOne(`#${id}`, wrapper))
}

// initialize a carousel
function initCarousel(carousel) {
  const carouselId = carousel.getAttribute('id')
  const items = find(`#${carouselId} .carousel-item`)
  const carouselInfo = {
    index: 0,
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
  setInterval(() => showNextCarouselItem(carouselInfo), 5000)
}

// show next carousel item (also support reverse order)
function showNextCarouselItem(carouselInfo, isReversed = false) {
  const { items, nItems, isOnTransition } = carouselInfo
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
  const nowItem = items[index]
  const nextItem = items[(index + 1) % nItems]

  // remove all prev/active/next classes
  items.forEach(item => {
    item.classList.remove('prev')
    item.classList.remove('active')
    item.classList.remove('next')
    item.classList.remove('reverse')
  })

  // add prev/active/next class
  prevItem.classList.add('prev')
  nowItem.classList.add('active')
  nextItem.classList.add('next')

  // add reverse class
  if (isReversed) {
    prevItem.classList.add('reverse')
    nowItem.classList.add('reverse')
    nextItem.classList.add('reverse')
  }

  // end of transition
  setTimeout(() => {
    carouselInfo.isOnTransition = false
  }, 300)
}
