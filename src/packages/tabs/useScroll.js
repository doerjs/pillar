import { useState, useEffect } from 'react'
import { isFunction } from '@/utils/is'
import { scrollLeft, scrollTop } from '@/utils/animate'
import { keyEnter, keySpace, keyboardFactory } from '@/utils/keyboard'
import { getElementProps } from '@/utils/element'

export default function useScroll(props, option = {}) {
  const { prevOption = {}, scrollOption = {}, nextOption = {} } = option

  const [isScroll, setScroll] = useState(false)
  const scrollProps = getElementProps({}, scrollOption)

  useEffect(() => {
    let isCurrentScroll = false
    if (props.orientation === 'vertical') {
      isCurrentScroll = scrollOption.ref.current.scrollHeight > scrollOption.ref.current.clientHeight
    } else {
      isCurrentScroll = scrollOption.ref.current.scrollWidth > scrollOption.ref.current.clientWidth
    }

    setScroll(isCurrentScroll)
  }, [props.children, props.orientation])

  function scrollToPrev() {
    if (props.orientation === 'vertical') {
      scrollTop(
        scrollOption.ref.current,
        scrollOption.ref.current.scrollTop - scrollOption.ref.current.clientHeight / 2,
      )
    } else {
      scrollLeft(
        scrollOption.ref.current,
        scrollOption.ref.current.scrollLeft - scrollOption.ref.current.clientWidth / 2,
      )
    }
  }

  const prevIndicatorProps = getElementProps({}, prevOption)
  prevIndicatorProps.role = 'button'
  prevIndicatorProps.tabIndex = '0'
  prevIndicatorProps['aria-label'] = 'Previous'
  prevIndicatorProps['aria-hidden'] = isScroll ? 'false' : 'true'
  prevIndicatorProps.onKeyDown = function (event) {
    if (isFunction(prevOption.onKeyDown)) {
      prevOption.onKeyDown(event)
    }

    keyboardFactory([keyEnter(scrollToPrev), keySpace(scrollToPrev)], { preventDefault: true })(event)
  }
  prevIndicatorProps.onClick = function (event) {
    if (isFunction(prevOption.onClick)) {
      prevOption.onClick(event)
    }

    scrollToPrev()
  }

  function scrollToNext() {
    if (props.orientation === 'vertical') {
      scrollTop(
        scrollOption.ref.current,
        scrollOption.ref.current.scrollTop + scrollOption.ref.current.clientHeight / 2,
      )
    } else {
      scrollLeft(
        scrollOption.ref.current,
        scrollOption.ref.current.scrollLeft + scrollOption.ref.current.clientWidth / 2,
      )
    }
  }

  const nextIndicatorProps = getElementProps({}, nextOption)
  nextIndicatorProps.role = 'button'
  nextIndicatorProps.tabIndex = '0'
  nextIndicatorProps['aria-label'] = 'Next'
  nextIndicatorProps['aria-hidden'] = isScroll ? 'false' : 'true'
  nextIndicatorProps.onKeyDown = function (event) {
    if (isFunction(nextOption.onKeyDown)) {
      nextOption.onKeyDown(event)
    }

    keyboardFactory([keyEnter(scrollToNext), keySpace(scrollToNext)], { preventDefault: true })(event)
  }
  nextIndicatorProps.onClick = function (event) {
    if (isFunction(nextOption.onClick)) {
      nextOption.onClick(event)
    }

    scrollToNext()
  }

  return { prevIndicatorProps, scrollProps, nextIndicatorProps }
}
