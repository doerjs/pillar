import React from 'react'
import classNames from 'classnames'

import './Side.less'

/**
 * @property {String} id
 * @property {String} className
 * @property {ReactNode | ReactNode[]} children
 */
export default function Side({ id, className, children }) {
  return (
    <aside id={id} className={classNames('pila-side', { [className]: !!className })}>
      {children}
    </aside>
  )
}
Side.$$type = 'Side'
