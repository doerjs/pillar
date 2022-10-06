import React, { useRef } from 'react'
import classNames from 'classnames'
import { matchElement } from '@/utils/element'

import useTabList from './useTabList'
import useTab from './useTab'
import usePanel from './usePanel'
import useScroll from './useScroll'

import './Tabs.less'

function Tab({ tab, state, operator }) {
  const { tabProps } = useTab(tab, state, operator)
  return (
    <div className="pila-tabs__tab" {...tabProps}>
      <div className="pila-tabs__title" title={tab.title}>
        {tab.title}
      </div>
    </div>
  )
}

function Panel({ tab, state, operator }) {
  const { panelProps } = usePanel(tab, state, operator)
  return (
    <div className="pila-tabs__panel" {...panelProps}>
      {tab.children}
    </div>
  )
}

/**
 * @property {String} className
 * @property {String} orientation 排版模式 horizontal(水平) ｜ vertical(垂直)
 * @property {Boolean} disabled
 * @property {Boolean} destroyInHided 隐藏时销毁TabPanel
 * @property {String | Number} value 选中的项
 * @property {String | Number} defaultValue 默认选中的项
 * @property {key => void} onChange
 * @property {ReactNode | ReactNode[]} children
 */
export default function Tabs(props) {
  const tabListElement = useRef()
  const { tabListProps, tabListState, tabListOperator } = useTabList(props, { ref: tabListElement })
  const { prevIndicatorProps, scrollProps, nextIndicatorProps } = useScroll(props, {
    scrollOption: { ref: tabListElement },
  })

  const [action = []] = matchElement(props.children, ['Action'])

  return (
    <div
      className={classNames('pila-tabs', {
        [props.className]: !!props.className,
        'pila-tabs--vertical': props.orientation === 'vertical',
        'pila-tabs--horizontal': props.orientation === 'horizontal',
      })}
    >
      <div className="pila-tabs__wrapper">
        <div className="pila-tabs__prev">
          <div className="pila-tabs__left" {...prevIndicatorProps}></div>
        </div>
        <div className="pila-tabs__list" ref={tabListElement} {...{ ...scrollProps, ...tabListProps }}>
          {tabListState.tabs.map((tab) => (
            <Tab key={tab.key} tab={tab} state={tabListState} operator={tabListOperator}></Tab>
          ))}
        </div>
        {action[0] && <div className="pila-tabs__action">{action[0]}</div>}
        <div className="pila-tabs__next">
          <div className="pila-tabs__right" {...nextIndicatorProps}></div>
        </div>
      </div>
      {props.destroyInHided ? (
        <div className="pila-tabs__panels">
          <Panel tab={tabListState.selectedTab} state={tabListState} operator={tabListOperator}></Panel>
        </div>
      ) : (
        <div className="pila-tabs__panels">
          {tabListState.tabs.map((tab) => (
            <Panel key={tab.key} tab={tab} state={tabListState} operator={tabListOperator}></Panel>
          ))}
        </div>
      )}
    </div>
  )
}
