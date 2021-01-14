const HIDE_DELAY = 250

function initHoverShow() {
  find('[data-hover-show-target]')
    .forEach(element => {
      const showTarget = findOne(element.dataset.hoverShowTarget)

      // add mouse-enter event listener
      element.addEventListener('mouseenter', event => {
        console.log('enter')

        // clear setTimeout handler
        const setTimeoutHandle = showTarget.dataset.hoverSetTimeout
        if (setTimeoutHandle) {
          clearTimeout(setTimeoutHandle)
          delete showTarget.dataset.hoverSetTimeout
        }

        // show the target
        showTarget.classList.add('show')
      })

      // add mouse-leave event listener
      element.addEventListener('mouseleave', event => {
        console.log('leave')

        // set setTimeout handler
        showTarget.dataset.hoverSetTimeout = setTimeout(() => {
          // hide the target after {HIDE_DELAY}ms
          showTarget.classList.remove('show')
          delete showTarget.dataset.hoverSetTimeout
        }, HIDE_DELAY)
      })
    })
}
