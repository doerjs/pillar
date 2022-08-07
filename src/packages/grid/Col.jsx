import React from 'react'
import classNames from 'classnames'
import { isNumber, isObject } from '@/packages/utils'

import './Col.less'

function formatSpec(spec) {
  if (isNumber(spec)) {
    return { span: spec }
  }

  if (isObject(spec)) {
    return { span: spec.span, offset: spec.offset }
  }

  return {}
}

/**
 * 栅格总列数为24，支持响应式
 * @property {String} id
 * @property {String} className
 * @property {Number} gutterX 栅格横向间距，由Row组件透传
 * @property {Number} span 栅格数
 * @property {Number} offset 偏移栅格数
 * @property {Number | Object<span, offset>} xs <1024
 * @property {Number | Object<span, offset>} sm 1024~1280
 * @property {Number | Object<span, offset>} md 1280~1600
 * @property {Number | Object<span, offset>} lg 1600~1920
 * @property {Number | Object<span, offset>} xl 1920~2560
 * @property {Number | Object<span, offset>} xxl >2560
 * @property {ReactNode | ReactNode[]} children
 */
export default function Col({ id, className, gutterXY, span = 6, offset = 0, xs, sm, md, lg, xl, xxl, children }) {
  const colClassName = {}
  if (className) {
    colClassName[className] = true
  }

  function isValidSize(size) {
    return size >= 0 && size <= 24
  }

  function formatSize(size) {
    return Math.floor(size)
  }

  function addSpanClassName(spec, specName) {
    if (isNumber(spec) && isValidSize(spec)) {
      colClassName[`pila-col-${formatSize(spec)}${specName ? '--' + specName : ''}`] = true
    } else if (isObject(spec) && isNumber(spec.span) && isValidSize(spec.span)) {
      colClassName[`pila-col-${formatSize(spec.span)}${specName ? '--' + specName : ''}`] = true
    }
  }

  function addOffsetClassName(spec, specName) {
    if (isNumber(spec) && isValidSize(spec)) {
      colClassName[`pila-col-${formatSize(spec)}_offset${specName ? '--' + specName : ''}`] = true
    } else if (isObject(spec) && isNumber(spec.offset) && isValidSize(spec.offset)) {
      colClassName[`pila-col-${formatSize(spec.offset)}_offset${specName ? '--' + specName : ''}`] = true
    }
  }

  const xsSpec = formatSpec(xs)
  const smSpec = formatSpec(sm)
  const mdSpec = formatSpec(md)
  const lgSpec = formatSpec(lg)
  const xlSpec = formatSpec(xl)
  const xxlSpec = formatSpec(xxl)

  addSpanClassName(span)
  addSpanClassName(xsSpec, 'xs')
  addSpanClassName(smSpec, 'sm')
  addSpanClassName(mdSpec, 'md')
  addSpanClassName(lgSpec, 'lg')
  addSpanClassName(xlSpec, 'xl')
  addSpanClassName(xxlSpec, 'xxl')

  addOffsetClassName(offset)
  addOffsetClassName(xsSpec, 'xs')
  addOffsetClassName(smSpec, 'sm')
  addOffsetClassName(mdSpec, 'md')
  addOffsetClassName(lgSpec, 'lg')
  addOffsetClassName(xlSpec, 'xl')
  addOffsetClassName(xxlSpec, 'xxl')

  function style() {
    const styleSheet = {}

    styleSheet.paddingLeft = `${gutterXY.x / 2}px`
    styleSheet.paddingRight = `${gutterXY.x / 2}px`

    return styleSheet
  }

  return (
    <div id={id} className={classNames('pila-col', colClassName)} style={style()}>
      <div className="pila-col_content">{children}</div>
    </div>
  )
}
Col.$$type = 'Col'
