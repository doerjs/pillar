import React from 'react'
import classNames from 'classnames'
import { matchElement } from '@/packages/utils'

import './Layout.less'

/**
 * @property {String} id
 * @property {String} className
 * @property {String} mode 排版模式 无(上下左右都不固定) ｜ fixed auto(上下固定) | fixed fixed(上下左右都固定)
 * @property {String | ReactNode} desc
 * @property {String | ReactNode} extra
 * @property {ReactNode | ReactNode[]} children
 */
export default function Layout({ id, className, mode, children }) {
  const [header = [], footer = [], side = [], other] = matchElement(children, ['Header', 'Footer', 'Side'])

  function renderContent() {
    const leftElement = side[0]
    const rightElement = side[1]

    return (
      <div className="pila-layout_content">
        {leftElement && <div className="pila-layout_left">{leftElement}</div>}
        <main className="pila-layout_main">{other}</main>
        {rightElement && <div className="pila-layout_right">{rightElement}</div>}
      </div>
    )
  }

  function renderContainer() {
    const headerElement = header[0]
    const footerElement = footer[0]

    return (
      <div className="pila-layout_container">
        {headerElement && <div className="pila-layout_header">{headerElement}</div>}
        {renderContent()}
        {footerElement && <div className="pila-layout_footer">{footerElement}</div>}
      </div>
    )
  }

  return (
    <div
      id={id}
      className={classNames('pila-layout', {
        [className]: !!className,
        'pila-layout--fixed-auto': mode === 'fixed auto',
        'pila-layout--fixed-fixed': mode === 'fixed fixed',
      })}
    >
      {renderContainer()}
    </div>
  )
}
Layout.$$type = 'Layout'
