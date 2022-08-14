/**
 * 创建动画函数
 */
export function createAnimate(step = 20) {
  let raf = null

  return function (duration, frame) {
    let current = 0

    clear()

    function clear() {
      if (raf) {
        window.cancelAnimationFrame(raf)
        raf = null
      }
    }

    function update() {
      clear()

      if (current >= duration) {
        return
      }

      current += step
      frame(step)

      raf = window.requestAnimationFrame(update)
    }

    raf = window.requestAnimationFrame(update)
  }
}

/**
 * 横向滚动动画
 */
export function scrollLeft(rawScrollElement, newScrollLeft) {
  const scrollLeft = rawScrollElement.scrollLeft
  const scrollWidth = rawScrollElement.scrollWidth

  const duration = Math.abs(scrollLeft - newScrollLeft)
  const direction = scrollLeft > newScrollLeft ? 'prev' : 'next'

  const animate = createAnimate()

  animate(duration, (step) => {
    const prevScrollLeft = rawScrollElement.scrollLeft
    let nextScrollLeft = direction === 'prev' ? prevScrollLeft - step : prevScrollLeft + step
    nextScrollLeft = Math.min(Math.max(nextScrollLeft, 0), scrollWidth)
    rawScrollElement.scrollLeft = nextScrollLeft
  })
}

/**
 * 纵向滚动动画
 */
export function scrollTop(rawScrollElement, newScrollTop) {
  const scrollTop = rawScrollElement.scrollTop
  const scrollHeight = rawScrollElement.scrollHeight

  const duration = Math.abs(scrollTop - newScrollTop)
  const direction = scrollTop > newScrollTop ? 'prev' : 'next'

  const animate = createAnimate()

  animate(duration, (step) => {
    const prevScrollTop = rawScrollElement.scrollTop
    let nextScrollTop = direction === 'prev' ? prevScrollTop - step : prevScrollTop + step
    nextScrollTop = Math.min(Math.max(nextScrollTop, 0), scrollHeight)
    rawScrollElement.scrollTop = nextScrollTop
  })
}
