import { isFunction } from '@/utils/is'
import { getElementProps } from '@/utils/element'

export default function useTab(tab, tabListState, tabListOperator, option = {}) {
  const isSelected = tab.value === tabListState.selectedTabValue
  const isDisabled = !!tab.disabled

  const tabProps = getElementProps({}, option)
  tabProps.role = 'tab'

  tabProps.id = `tab-${tab.value}`
  if (!isDisabled) {
    tabProps.tabIndex = tabListState.focusableTabValue === tab.value ? '0' : '-1'
  }

  tabProps['aria-selected'] = isSelected
  tabProps['aria-disabled'] = isDisabled
  tabProps['aria-controls'] = `tab-panel-${tab.value}`

  tabProps.onClick = function (event) {
    if (isDisabled) {
      return
    }

    if (isFunction(option.onClick)) {
      option.onClick(event)
    }

    event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
    tabListOperator.change(tab.value, tab)
  }

  tabProps.onFocus = function (event) {
    if (isFunction(option.onFocus)) {
      option.onFocus(event)
    }

    event.currentTarget.setAttribute('aria-focusing', 'true')
  }

  tabProps.onBlur = function (event) {
    if (isFunction(option.onBlur)) {
      option.onBlur(event)
    }

    event.currentTarget.removeAttribute('aria-focusing')
  }

  return { tabProps }
}
