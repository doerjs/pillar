import React from 'react'
import classNames from 'classnames'
import { matchElement } from '@/utils/element'

import './Header.less'

/**
 * @property {String} id
 * @property {String} className
 * @property {String | ReactNode} title
 * @property {String | ReactNode} desc
 * @property {String | ReactNode} extra
 * @property {ReactNode | ReactNode[]} children
 */
export default function Header({ id, className, title, desc, extra, children }) {
  const [action = [], other] = matchElement(children, ['Action'])

  const isHeadVisible = title || extra || !!action.length
  const isDescVisible = !!desc

  return (
    <header
      id={id}
      className={classNames('pila-header', {
        [className]: !!className,
        'pila-header--has-desc': !!desc,
      })}
    >
      {isHeadVisible && (
        <div className="pila-header__head">
          <div className="pila-header__title">
            <div className="pila-header__label">{title}</div>
            <div className="pila-header__extra">{extra}</div>
          </div>
          {action[0] && <div className="pila-header__action">{action[0]}</div>}
        </div>
      )}
      {isDescVisible && <div className="pila-header__desc">{desc}</div>}
      {other}
    </header>
  )
}
Header.$$type = 'Header'
