import { useState, useEffect, Children } from 'react'
import {
  getElementProps,
  keyboardFactory,
  keyLeft,
  keyRight,
  keyUp,
  keyDown,
  keyEnter,
  keySpace,
  isMatchElement,
  isUndefined,
  isFunction,
  RawListElementFactory,
  nextTick,
} from '@/packages/utils'

const rawListElement = new RawListElementFactory('tab')

function getTab(element) {
  const { value, ...props } = element.props

  props.value = isUndefined(value) ? element.key : value
  return {
    key: element.key,
    isDisabled: !!props.disabled,
    props,
  }
}

function getTabList(props) {
  return Children.toArray(props.children).reduce((tabs, element) => {
    if (!isMatchElement(element, 'TabPanel')) {
      return tabs
    }

    const tab = getTab(element)
    tabs.push(tab)

    return tabs
  }, [])
}

function getDefaultValue(tabs, props) {
  if (!isUndefined(props.defaultValue)) {
    return props.defaultValue
  }

  if (!Array.isArray(tabs) || !tabs.length) {
    return
  }

  const tab = tabs.find((tab) => !tab.props.disabled) || tabs[0]
  return tab.props.value
}

// 是否受控模式
function isControlled(props) {
  return !isUndefined(props.value)
}

// 获取默认可聚焦tab项
function getDefaultFocusableTab(tabs, value) {
  let selectedTab
  let focusableTab

  tabs.forEach((tab) => {
    const isSelected = tab.props.value === value
    if (isSelected) {
      selectedTab = tab
    }

    if (!tab.isDisabled && !focusableTab) {
      focusableTab = tab
    }
  })

  if (selectedTab && !selectedTab.isDisabled) {
    return selectedTab
  }

  return focusableTab
}

export default function useTabList(props, option = {}) {
  const tabs = getTabList(props)
  const [value, setValue] = useState(getDefaultValue(tabs, props))

  const tabListProps = getElementProps(props, option)
  tabListProps.role = 'tablist'

  // 激活tab
  function enterFocusingTab() {
    const focusingElement = rawListElement.getFocusingElement(option.ref.current)
    if (focusingElement) {
      focusingElement.click()
    }
  }

  function focusingPrevTab() {
    const prevRawTabElement = rawListElement.getPrevAvailableElement(option.ref.current)
    if (prevRawTabElement) {
      prevRawTabElement.focus()
    }
  }

  function focusingNextTab() {
    const nextRawTabElement = rawListElement.getNextAvailableElement(option.ref.current)
    if (nextRawTabElement) {
      nextRawTabElement.focus()
    }
  }

  // 监听相关快捷键事件
  tabListProps.onKeyDown = function (event) {
    if (isFunction(option.onKeyDown)) {
      option.onKeyDown(event)
    }

    const keyboards = [keyEnter(enterFocusingTab), keySpace(enterFocusingTab)]

    if (props.orientation === 'vertical') {
      keyboards.push(keyUp(focusingPrevTab))
      keyboards.push(keyDown(focusingNextTab))
    } else {
      keyboards.push(keyLeft(focusingPrevTab))
      keyboards.push(keyRight(focusingNextTab))
    }

    keyboardFactory(keyboards, { preventDefault: true })(event)
  }

  function emitChange(value) {
    if (isFunction(props.onChange)) {
      props.onChange(value)
    }
  }

  const tabListState = {
    value,
    tabs,
    // 是否受控模式
    isControlled: isControlled(props),
    // 默认可聚焦的tab项
    defaultFocusableTab: getDefaultFocusableTab(tabs, value),
    change(value) {
      setValue(value)
      emitChange(value)
    },
    emitChange,
  }

  // 受控模式下，值改变设置内部值
  useEffect(() => {
    if (isUndefined(props.value)) {
      return
    }
    setValue(props.value)

    // value值改变之后获取当前选中值滚动到可视区域
    nextTick(() => {
      const selectedRawTabElement = rawListElement.getSelectedElement(option.ref.current)
      selectedRawTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
    })
  }, [props.value])

  return {
    tabListProps,
    tabListState,
  }
}
