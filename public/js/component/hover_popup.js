import { find, findOne } from "../util"

const POPUP_HIDE_DELAY = 250

export function initHoverPopup() {
  find('[data-hover-popup-target]')
    .forEach(element => {
      const popupTarget = findOne(element.dataset.hoverPopupTarget)

      // add mouse-enter event listener
      element.addEventListener('mouseenter', event => {
        // clear setTimeout handler
        const setTimeoutHandle = popupTarget.dataset.hoverSetTimeout
        if (setTimeoutHandle) {
          clearTimeout(setTimeoutHandle)
          delete popupTarget.dataset.hoverSetTimeout
        }

        // show the target
        setTimeout(() => {
          popupTarget.classList.add('show')
        }, 0)
      })

      // add mouse-leave event listener
      element.addEventListener('mouseleave', event => {
        // directly hide
        if (popupTarget.dataset.hoverSetTimeout == 0) {
          popupTarget.classList.remove('show')
          return
        }
        // or, set setTimeout handler
        popupTarget.dataset.hoverSetTimeout = setTimeout(() => {
          // hide the target after {POPUP_HIDE_DELAY}ms
          popupTarget.classList.remove('show')
          delete popupTarget.dataset.hoverSetTimeout
        }, popupTarget.dataset.hoverHideDelay || POPUP_HIDE_DELAY)
      })
    })
}
