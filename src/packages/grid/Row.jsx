import React, { Children, cloneElement } from 'react'
import classNames from 'classnames'
import { isNumber } from '@/utils/is'
import { matchElement } from '@/utils/element'

import './Row.less'

function getGutterXY(gutter) {
  if (isNumber(gutter)) {
    return { x: gutter, y: gutter }
  }

  if (Array.isArray(gutter)) {
    const [x, y] = gutter
    return { x: x || 0, y: y || x || 0 }
  }

  return { x: 0, y: 0 }
}

/**
 * @property {String} id
 * @property {String} className
 * @property {Number | Number[]} gutter 栅格间距
 * @property {ReactNode | ReactNode[]} children
 */
export default function Row({ id, className, gutter, children }) {
  const [col = []] = matchElement(children, ['Col'])

  const gutterXY = getGutterXY(gutter)

  function style() {
    const styleSheet = {}

    styleSheet.marginLeft = `-${gutterXY.x / 2}px`
    styleSheet.marginRight = `-${gutterXY.x / 2}px`
    styleSheet.rowGap = `${gutterXY.y}px`

    return styleSheet
  }

  return (
    <div id={id} className={classNames('pila-row', { [className]: !!className })}>
      <div className="pila-row_content" style={style()}>
        {Children.map(col, (child) => {
          return cloneElement(child, { gutterX: gutterXY.x })
        })}
      </div>
    </div>
  )
}
Row.$$type = 'Row'
