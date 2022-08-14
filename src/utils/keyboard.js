import { isFunction } from './is'

/**
 * 创建按键匹配函数
 */
export function createMatchKeyBoard(keyCode) {
  return function (handler) {
    return function (event) {
      const isMatch = !event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey && event.code === keyCode
      if (!isMatch) return false

      isFunction(handler) && handler(event)

      return true
    }
  }
}

/**
 * 创建ctrl + 按键匹配函数
 */
export function createMatchCtrlKeyBoard(keyCode) {
  return function (handler) {
    return function (event) {
      const isMatch = (event.ctrlKey || event.metaKey) && !event.shiftKey && !event.altKey && event.code === keyCode
      if (!isMatch) return false

      isFunction(handler) && handler(event)

      return true
    }
  }
}

/**
 * 创建shift + 按键匹配函数
 */
function createMatchShiftKeyBoard(keyCode) {
  return function (handler) {
    return function (event) {
      const isMatch = !event.ctrlKey && !event.metaKey && !event.altKey && event.shiftKey && event.code === keyCode
      if (!isMatch) return false

      isFunction(handler) && handler(event)

      return true
    }
  }
}

/**
 * 创建ctrl + shift + 按键匹配函数
 */
export function createMatchCtrlAndShiftKeyBoard(keyCode) {
  return function (event, handler) {
    const isMatch = !event.altKey && (event.ctrlKey || event.metaKey) && event.shiftKey && event.code === keyCode
    if (!isMatch) return false

    isFunction(handler) && handler(event)

    return true
  }
}

/**
 * 快捷键注册工厂
 */
export function keyboardFactory(keyboards = [], option = {}) {
  return function (event) {
    keyboards.every((keyboard) => {
      const isMatched = keyboard(event)
      if (!isMatched) {
        return true
      }

      if (option.preventDefault) {
        event.preventDefault()
      }

      if (option.stopPropagation) {
        event.stopPropagation()
      }

      return false
    })
  }
}

/**
 * 回车
 */
export const keyEnter = createMatchKeyBoard('Enter')

/**
 * 空格
 */
export const keySpace = createMatchKeyBoard('Space')

/**
 * 左移
 */
export const keyLeft = createMatchKeyBoard('ArrowLeft')

/**
 * 右移
 */
export const keyRight = createMatchKeyBoard('ArrowRight')

/**
 * 上移
 */
export const keyUp = createMatchKeyBoard('ArrowUp')

/**
 * 下移
 */
export const keyDown = createMatchKeyBoard('ArrowDown')

/**
 * 退出
 */
export const keyEsc = createMatchKeyBoard('Escape')

/**
 * Tab
 */
export const keyTab = createMatchKeyBoard('Tab')

/**
 * Shift + Tab
 */
export const keyShiftTab = createMatchShiftKeyBoard('Tab')
