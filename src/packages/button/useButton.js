import { getElementProps } from '@/utils/element'
import { isFunction } from '@/utils/is'
import { keyEnter, keySpace, keyboardFactory } from '@/utils/keyboard'

export default function useButton(props, option) {
  const isDisabled = !!props.disabled
  const buttonProps = getElementProps(props, option)
  buttonProps.role = 'button'
  if (!isDisabled) {
    buttonProps.tabIndex = '0'
  }
  buttonProps['aria-disabled'] = isDisabled

  buttonProps.onClick = function (event) {
    if (isDisabled) {
      return
    }

    if (isFunction(option.onClick)) {
      option.onClick(event)
    }
  }

  function clickButton() {}
  buttonProps.onKeyDown = function (event) {
    if (isFunction(option.onKeyDown)) {
      option.onKeyDown(event)
    }

    const keyboards = [keyEnter(clickButton), keySpace(clickButton)]
    keyboardFactory(keyboards)(event)
  }

  buttonProps.onFocus = function (event) {
    if (isFunction(option.onFocus)) {
      option.onFocus(event)
    }

    event.currentTarget.setAttribute('aria-focusing', 'true')
  }

  buttonProps.onBlur = function (event) {
    if (isFunction(option.onBlur)) {
      option.onBlur(event)
    }

    event.currentTarget.removeAttribute('aria-focusing')
  }

  return { buttonProps }
}
