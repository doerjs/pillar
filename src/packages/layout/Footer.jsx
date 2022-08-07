import React from 'react'
import classNames from 'classnames'

import './Footer.less'

/**
 * @property {String} id
 * @property {String} className
 * @property {ReactNode | ReactNode[]} children
 */
export default function Footer({ id, className, children }) {
  return (
    <footer
      id={id}
      className={classNames('pila-footer', {
        [className]: !!className,
      })}
    >
      {children}
    </footer>
  )
}
Footer.$$type = 'Footer'
