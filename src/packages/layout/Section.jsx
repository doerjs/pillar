import React from 'react'
import classNames from 'classnames'
import { getAriaProps } from '@/utils/element'

import './Section.less'

/**
 * @property {String} id
 * @property {String} className
 * @property {ReactNode | ReactNode[]} children
 */
export default function Section(props) {
  const { id, className, children } = props
  const sectionProps = getAriaProps(props)

  return (
    <section id={id} className={classNames('pila-right', { [className]: !!className })} {...sectionProps}>
      {children}
    </section>
  )
}
Section.$$type = 'Section'
