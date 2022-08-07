function isStyleVisible(element) {
  if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) {
    return false
  }

  const { display, visibility } = element.style

  let isVisible = display !== 'none' && visibility !== 'hidden' && visibility !== 'collapse'

  if (isVisible) {
    const { getComputedStyle } = element.ownerDocument.defaultView
    const { display: computedDisplay, visibility: computedVisibility } = getComputedStyle(element)

    isVisible = computedDisplay !== 'none' && computedVisibility !== 'hidden' && computedVisibility !== 'collapse'
  }

  return isVisible
}

function isAttributeVisible(element, childElement) {
  return (
    !element.hasAttribute('hidden') &&
    (element.nodeName === 'DETAILS' && childElement && childElement.nodeName !== 'SUMMARY'
      ? element.hasAttribute('open')
      : true)
  )
}

export function isElementVisible(element, childElement) {
  return (
    element.nodeName !== '#comment' &&
    isStyleVisible(element) &&
    isAttributeVisible(element, childElement) &&
    (!element.parentElement || isElementVisible(element.parentElement, element))
  )
}
