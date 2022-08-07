import React, { useRef } from 'react'
import classNames from 'classnames'
import { matchElement } from '@/packages/utils'

import useTabList from './useTabList'
import useTab from './useTab'
import usePanel from './usePanel'
import useScroll from './useScroll'

import './Tabs.less'

function Tab({ state, tab }) {
  const { tabProps } = useTab(tab, state)

  return (
    <div className="pila-tabs_tab" {...tabProps}>
      <div className="pila-tabs_title" title={tab.props.title}>
        {tab.props.title}
      </div>
    </div>
  )
}

function Panel({ state, tab }) {
  const { panelProps } = usePanel(tab, state)

  return (
    <div className="pila-tabs_panel" {...panelProps}>
      {tab.props.children}
    </div>
  )
}

/**
 * @property {String} id
 * @property {String} className
 * @property {String} orientation 排版模式 horizontal(水平) ｜ vertical(垂直)
 * @property {Boolean} disabled
 * @property {String | Number} value 选中的项
 * @property {String | Number} defaultValue 默认选中的项
 * @property {key => void} onChange
 * @property {ReactNode | ReactNode[]} children
 */
export default function Tabs(props) {
  const tabListElement = useRef()
  const { tabListProps, tabListState } = useTabList(props, { ref: tabListElement })
  const { prevIndicatorProps, scrollProps, nextIndicatorProps } = useScroll(props, tabListState, {
    scrollOption: { ref: tabListElement },
  })

  const [action = []] = matchElement(props.children, ['Action'])

  return (
    <div
      id={props.id}
      className={classNames('pila-tabs', {
        [props.className]: !!props.className,
        'pila-tabs--vertical': props.orientation === 'vertical',
        'pila-tabs--horizontal': props.orientation === 'horizontal',
      })}
    >
      <div className="pila-tabs_wrapper">
        <div className="pila-tabs_prev">
          <div className="pila-tabs_left" {...prevIndicatorProps}></div>
        </div>
        <div className="pila-tabs_list" ref={tabListElement} {...{ ...scrollProps, ...tabListProps }}>
          {tabListState.tabs.map((tab) => (
            <Tab key={tab.key} tab={tab} state={tabListState}></Tab>
          ))}
        </div>
        {action[0] && <div className="pila-tabs_action">{action[0]}</div>}
        <div className="pila-tabs_next">
          <div className="pila-tabs_right" {...nextIndicatorProps}></div>
        </div>
      </div>
      <div className="pila-tabs_panels">
        {tabListState.tabs.map((tab) => (
          <Panel key={tab.key} tab={tab} state={tabListState}></Panel>
        ))}
      </div>
    </div>
  )
}
