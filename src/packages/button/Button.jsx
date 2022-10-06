import React, { useRef } from 'react'
import classNames from 'classnames'

import useButton from './useButton'

/**
 * @property {String} className
 * @property {String} text 按钮文案
 * @property {String} prefix 前缀按钮图标
 * @property {String} icon 按钮图标
 * @property {Boolean} disabled 禁用按钮
 * @property {['default', 'primary', 'dashed', 'link']} status 按钮样式默认default
 * @property {(event) => void} onClick
 */
export default function Button(props) {
  const buttonElement = useRef()

  const { buttonProps } = useButton(props, { ref: buttonElement })

  return (
    <div className={classNames('pila-button', { [props.className]: !!props.className })} {...buttonProps}>
      {props.prefix && <i className={`iconfont ${props.prefix}`}></i>}
      <span>{props.text}</span>
      {props.icon && <i className={`iconfont ${props.icon}`}></i>}
    </div>
  )
}
