import React from 'react'

/**
 * 空组件，仅作为Tabs组件收集属性用
 * @property {String | Number} value 选中的项
 * @property {String} title
 * @property {Boolean} disabled
 * @property {ReactNode | ReactNode[]} children
 */
export default function Panel({ value, title, disabled, children }) {
  return <></>
}
Panel.$$type = 'TabPanel'
