import { find, findOne } from "../util"

const POPUP_HIDE_DELAY = 250

// mouse-enter event listener
function enterHoverPopupTrigger(event) {
  const popupTarget = findOne(event.target.dataset.hoverPopupTarget)

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
}

// mouse-leave event listener
function leaveHoverPopupTrigger(event) {
  const popupTarget = findOne(event.target.dataset.hoverPopupTarget)

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
}

export function initHoverPopup() {
  find('[data-hover-popup-target]').forEach(element => {
    // add mouse-enter & mouse-leave event listeners
    element.addEventListener('mouseenter', enterHoverPopupTrigger)
    element.addEventListener('mouseleave', leaveHoverPopupTrigger)
  })
}
