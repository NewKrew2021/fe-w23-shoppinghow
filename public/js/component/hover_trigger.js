import { find, findOne } from "../util"

const POPUP_HIDE_DELAY = 250

/*

  Hover Toggle: show one, hide others in same group
  Hover Popup: show or not

*/

// mouse-enter event listener for hover-toggle
function enterHoverToggleTrigger(event) {
  const toggleTarget = findOne(event.target.dataset.hoverToggleTarget)
  const toggleGroup = find(`[data-hover-toggle-group="${toggleTarget.dataset.hoverToggleGroup}"]`)

  // toggle all off
  toggleGroup.forEach((element => {
    element.classList.remove('show')
  }))

  // toggle the target on
  toggleTarget.classList.add('show')
}

// mouse-enter event listener for hover-popup
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

// mouse-leave event listener for hover-popup
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

export function initHoverToggle() {
  find('[data-hover-toggle-target]').forEach(element => {
    // add mouse-enter event listeners
    element.addEventListener('mouseenter', enterHoverToggleTrigger)

    // show the first element in each group
    const toggleTarget = findOne(element.dataset.hoverToggleTarget)
    const firstElementInGroup = findOne(`[data-hover-toggle-group="${toggleTarget.dataset.hoverToggleGroup}"]`)
    firstElementInGroup.classList.add('show')
  })
}

export function initHoverPopup() {
  find('[data-hover-popup-target]').forEach(element => {
    // add mouse-enter & mouse-leave event listeners
    element.addEventListener('mouseenter', enterHoverPopupTrigger)
    element.addEventListener('mouseleave', leaveHoverPopupTrigger)
  })
}
