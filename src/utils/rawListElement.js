export function RawListElementFactory(role) {
  this.role = role
}

RawListElementFactory.prototype.isSelected = function (element) {
  return element.getAttribute('aria-selected') === 'true'
}

RawListElementFactory.prototype.isDisabled = function (element) {
  return element.getAttribute('aria-disabled') === 'true'
}

RawListElementFactory.prototype.isFocusing = function (element) {
  return element.getAttribute('aria-focusing') === 'true'
}

RawListElementFactory.prototype.getElements = function (listElement = document.body) {
  return [...listElement.querySelectorAll(`[role=${this.role}]`)]
}

RawListElementFactory.prototype.getAvailableElementIndex = function (elements) {
  let selectedElementIndex = -1
  let focusingElementIndex = -1

  elements.forEach((element, index) => {
    const isSelected = this.isSelected(element)
    const isDisabled = this.isDisabled(element)
    const isFocusing = this.isFocusing(element)

    if (isSelected && !isDisabled) {
      selectedElementIndex = index
    }

    if (isFocusing) {
      focusingElementIndex = index
    }
  })

  return focusingElementIndex >= 0 ? focusingElementIndex : selectedElementIndex
}

RawListElementFactory.prototype.getSelectedElement = function (listElement = document.body) {
  return listElement.querySelector(`[role=${this.role}][aria-selected=true]`)
}

RawListElementFactory.prototype.getFocusingElement = function (listElement = document.body) {
  return listElement.querySelector(`[role=${this.role}][aria-focusing=true][aria-disabled=false]`)
}

RawListElementFactory.prototype.getPrevAvailableElement = function (listElement = document.body) {
  const elements = this.getElements(listElement)
  if (!elements.length) {
    return
  }

  const availableElementIndex = this.getAvailableElementIndex(elements)
  let loopElementCount = 1
  function getPrevElement(index) {
    if (loopElementCount >= elements.length) {
      return {}
    }

    loopElementCount += 1

    let currIndex = index - 1
    if (currIndex < 0) {
      currIndex = elements.length - 1
    }

    return { element: elements[currIndex], elementIndex: currIndex }
  }

  let { elementIndex, element } = getPrevElement(availableElementIndex)
  while (element && this.isDisabled(element)) {
    const res = getPrevElement(elementIndex)
    elementIndex = res.elementIndex
    element = res.element
  }

  return element
}

RawListElementFactory.prototype.getNextAvailableElement = function (listElement = document.body) {
  const elements = this.getElements(listElement)
  if (!elements.length) {
    return
  }

  const availableElementIndex = this.getAvailableElementIndex(elements)
  let loopElementCount = 1
  function getNextElement(index) {
    if (loopElementCount >= elements.length) {
      return {}
    }

    loopElementCount += 1
    let currIndex = index + 1
    if (currIndex >= elements.length) {
      currIndex = 0
    }

    return { element: elements[currIndex], elementIndex: currIndex }
  }

  let { elementIndex, element } = getNextElement(availableElementIndex)
  while (element && this.isDisabled(element)) {
    const res = getNextElement(elementIndex)
    elementIndex = res.elementIndex
    element = res.element
  }

  return element
}
