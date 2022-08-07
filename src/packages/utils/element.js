import { Children } from 'react'
import { isString } from './is'

export function getAriaProps(props) {
  const arias = ['aria-label', 'aria-labelledby', 'aria-describedby', 'aria-details']

  return arias.reduce((result, ariaKey) => {
    if (isString(props[ariaKey])) {
      result[ariaKey] = props[ariaKey]
    }
    return result
  }, {})
}

export function getElementProps(props, option = {}) {
  const nextProps = getAriaProps(props)

  // 注入所有on开头的事件属性
  const isLikeEventReg = /^on[A-Z]{1}[A-Za-z]*$/
  Object.keys(option).forEach((key) => {
    if (isLikeEventReg.test(key)) {
      nextProps[key] = option[key]
    }
  })

  return nextProps
}

function isElement(element, type) {
  if (!element.type || !element.type.$$type) {
    return false
  }

  return element.type.$$type === type
}

/**
 * 按照传入的匹配类型获取节点类型函数，返回值的数组的最后一个为未匹配中的所有节点
 * @param {ReactNode | ReactNode[]} children
 * @param {Array<String>} matches 匹配的节点类型
 * @return {Array<Array<ReactNode>>}
 */
export function matchElement(children, matches = []) {
  const otherNodes = []
  const matchedNodes = Children.toArray(children).reduce((result, element) => {
    if (!element) {
      return result
    }

    const index = matches.findIndex((type) => {
      return isElement(element, type)
    })

    if (index < 0) {
      otherNodes.push(element)
      return result
    }

    if (!result[index]) {
      result[index] = []
    }

    result[index].push(element)

    return result
  }, [])

  matchedNodes[matches.length] = otherNodes

  return matchedNodes
}

export function isMatchElement(element, type) {
  if (!element) {
    return false
  }

  return isElement(element, type)
}
