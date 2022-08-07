import { getElementProps, isFunction } from '@/packages/utils'

export default function useTab(tab, tabListState, option = {}) {
  const isSelected = tab.props.value === tabListState.value

  const tabProps = getElementProps({}, option)
  tabProps.role = 'tab'

  tabProps.id = `tab-${tab.props.value}`
  if (!tab.isDisabled) {
    tabProps.tabIndex =
      tabListState.defaultFocusableTab && tabListState.defaultFocusableTab.props.value === tab.props.value ? '0' : '-1'
  }

  tabProps['aria-selected'] = isSelected
  tabProps['aria-disabled'] = tab.isDisabled
  tabProps['aria-controls'] = `tab-panel-${tab.props.value}`

  tabProps.onClick = function (event) {
    if (isFunction(option.onClick)) {
      option.onClick(event)
    }

    if (tab.isDisabled) {
      return
    }

    event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })

    if (tabListState.isControlled) {
      tabListState.emitChange(tab.props.value)
      return
    }

    tabListState.change(tab.props.value)
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

    event.preventDefault()
    event.currentTarget.removeAttribute('aria-focusing')
  }

  return { tabProps }
}
