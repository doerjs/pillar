import React from 'react'
import classNames from 'classnames'
import { matchElement } from '@/utils/element'

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
  const [header = [], footer = [], side = [], section = [], main, mainOption] = matchElement(children, [
    'Header',
    'Footer',
    'Side',
    'Section',
  ])

  function renderContent() {
    let leftElement
    let rightElement

    const sideElement = side[0]
    const sectionElement = section[0]
    if (sideElement && sectionElement) {
      leftElement = sideElement.type.$$elementIndex > sectionElement.type.$$elementIndex ? sectionElement : sideElement
      rightElement = sideElement.type.$$elementIndex > sectionElement.type.$$elementIndex ? sideElement : sectionElement
    } else if (sideElement) {
      leftElement = sideElement.type.$$elementIndex < mainOption.startElementIndex ? sideElement : null
      rightElement = sideElement.type.$$elementIndex > mainOption.startElementIndex ? sideElement : null
    } else if (sectionElement) {
      leftElement = sectionElement.type.$$elementIndex < mainOption.startElementIndex ? sectionElement : null
      rightElement = sectionElement.type.$$elementIndex > mainOption.startElementIndex ? sectionElement : null
    }

    return (
      <div className="pila-layout__content">
        {leftElement && <div className="pila-layout__left">{leftElement}</div>}
        <main className="pila-layout__main">{main}</main>
        {rightElement && <div className="pila-layout__right">{rightElement}</div>}
      </div>
    )
  }

  function renderContainer() {
    const headerElement = header[0]
    const footerElement = footer[0]

    return (
      <div className="pila-layout__container">
        {headerElement && <div className="pila-layout__header">{headerElement}</div>}
        {renderContent()}
        {footerElement && <div className="pila-layout__footer">{footerElement}</div>}
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
