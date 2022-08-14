import { useState, useRef, useEffect, useCallback, Children } from 'react'
import { isUndefined, isFunction } from '@/utils/is'
import { nextTick } from '@/utils/nextTick'
import { getElementProps, isMatchElement } from '@/utils/element'
import { RawListElementFactory } from '@/utils/rawListElement'
import { keyLeft, keyRight, keyUp, keyDown, keyEnter, keySpace, keyboardFactory } from '@/utils/keyboard'

function getTab(element) {
  return {
    ...element.props,
    key: element.key,
    value: isUndefined(element.props.value) ? element.key : element.props.value,
  }
}

// 获取tabs的默认值
function getDefaultValue(props, tabs) {
  let defaultValue = props.defaultValue
  if (isUndefined(props.defaultValue) && tabs.length) {
    const firstAvailableTab = tabs.find((tab) => !tab.disabled) || tabs[0] || {}
    defaultValue = firstAvailableTab.value
  }
  return defaultValue
}

// 获取tabs可聚焦的第一个元素
function getDefaultFocusableValue(tabs) {
  const firstFocusableTab = tabs.find((tab) => {
    return !tab.disabled
  })
  return firstFocusableTab ? firstFocusableTab.value : undefined
}

function getTabs(props) {
  const tabs = Children.toArray(props.children).reduce((result, element) => {
    if (!isMatchElement(element, 'TabPanel')) {
      return result
    }

    const tab = getTab(element)
    result.push(tab)

    return result
  }, [])

  const defaultValue = getDefaultValue(props, tabs)
  const defaultFocusableValue = getDefaultFocusableValue(tabs)

  return { defaultValue, defaultFocusableValue, tabs }
}

export default function useTabList(props, option = {}) {
  const rawListElement = useRef(null)
  const { tabs, defaultValue, defaultFocusableValue } = getTabs(props)
  const [selectedTabValue, setSelectedTabValue] = useState(defaultValue)
  const isControlled = !isUndefined(props.value)

  useEffect(() => {
    rawListElement.current = new RawListElementFactory('tab')
  }, [])

  // 受控模式下，值改变设置内部值
  useEffect(() => {
    if (isControlled) {
      return
    }
    // value值改变之后获取当前选中值滚动到可视区域
    nextTick(() => {
      const selectedRawTabElement = rawListElement.current.getSelectedElement(option.ref.current)
      selectedRawTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
    })
  }, [props.value])

  // 触发值改变
  const change = useCallback(
    (value, tab) => {
      if (!isControlled) {
        setSelectedTabValue(value)
      }

      if (isFunction(props.onChange)) {
        props.onChange(value)
      }
    },
    [isControlled, props.onChange],
  )

  // 激活tab
  function enterFocusingTab() {
    const focusingElement = rawListElement.current.getFocusingElement(option.ref.current)
    if (focusingElement) {
      focusingElement.click()
    }
  }

  // focus前一个
  function focusingPrevTab() {
    const prevRawTabElement = rawListElement.current.getPrevAvailableElement(option.ref.current)
    if (prevRawTabElement) {
      prevRawTabElement.focus()
    }
  }

  // focus下一个
  function focusingNextTab() {
    const nextRawTabElement = rawListElement.current.getNextAvailableElement(option.ref.current)
    if (nextRawTabElement) {
      nextRawTabElement.focus()
    }
  }

  const tabListProps = getElementProps(props, option)
  tabListProps.role = 'tablist'
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

  const currentSelectedTabValue = isControlled ? props.value : selectedTabValue
  const selectedTab = tabs.find((tab) => tab.value === currentSelectedTabValue)
  const defaultFocusableTab = tabs.find((tab) => tab.value === defaultFocusableValue)
  const tabListState = {
    tabs,
    selectedTab,
    selectedTabValue: currentSelectedTabValue,
    focusableTab: selectedTab.disabled ? defaultFocusableTab : selectedTab,
    focusableTabValue: selectedTab.disabled ? defaultFocusableValue : selectedTab.value,
  }

  const tabListOperator = {
    change,
  }

  return {
    tabListProps,
    tabListState,
    tabListOperator,
  }
}
