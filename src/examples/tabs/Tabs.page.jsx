import React, { useState } from 'react'
import Tabs, { Panel } from '@/packages/tabs'
import Action from '@/packages/action'

import styles from './Tabs.module.less'

function Content({ title }) {
  console.log('render content', title)
  return <div>{title}</div>
}

export default function LayoutDemo() {
  const [activeTab, setActiveTab] = useState('tab2')

  return (
    <div className={styles.tab}>
      <div className={styles.item}>
        <Tabs
          defaultValue={activeTab}
          onChange={(value) => {
            console.log('changed', value)
            setActiveTab('tab6')
          }}
        >
          <Panel value="tab1" disabled title="tab1">
            <Content title="Content4"></Content>
          </Panel>
          <Panel value="tab2" disabled title="tab22222222222">
            Tab Content2
          </Panel>
          <Panel title="tab3">
            <Content title="Content 3"></Content>
          </Panel>
          <Panel title="tab4">
            <Content title="Content4"></Content>
          </Panel>
          <Panel title="tab5">
            <Content title="Content5"></Content>
          </Panel>
          <Panel title="tab6">
            <Content title="Content6"></Content>
          </Panel>
          <Panel title="tab7">
            <Content title="Content7"></Content>
          </Panel>
          <Panel title="tab8">
            <Content title="Content8"></Content>
          </Panel>
          <Panel title="tab9">
            <Content title="Content9"></Content>
          </Panel>
          <Panel title="tab10">Tab Content3</Panel>
          <Panel title="tab11">Tab Content3</Panel>
          <Panel title="tab12">Tab Content3</Panel>
          <Panel title="tab13">Tab Content3</Panel>
          <Panel title="tab14">Tab Content3</Panel>
          <Panel value="tab15" title="tab15">
            Tab Content3
          </Panel>
          <Panel title="tab16">Tab Content3</Panel>
          <Panel title="tab17">Tab Content3</Panel>
          <Panel title="tab18">Tab Content3</Panel>
          <Panel title="tab19">Tab Content3</Panel>
          <Panel value="tab20" title="tab20">
            Tab Content3
          </Panel>
          <Panel title="tab21">Tab Content3</Panel>
          <Panel value="tab22" title="tab22">
            Tab Content3
          </Panel>
          <Action>
            <button>添加</button>
            <button>删除</button>
            <Content title="Action"></Content>
          </Action>
        </Tabs>
      </div>
      <div className={styles.item}>
        <Tabs
          orientation="vertical"
          defaultValue={activeTab}
          onChange={(value) => {
            console.log('changed', value)
            setActiveTab('tab20')
          }}
        >
          <Panel value="tab1" disabled title="tab1">
            Tab Content1
          </Panel>
          <Panel value="tab2" disabled title="tab2222222222222">
            Tab Content2
          </Panel>
          <Panel title="tab3">Tab Content3</Panel>
          <Panel title="tab4">Tab Content4</Panel>
          <Panel title="tab5">Tab Content5</Panel>
          <Panel title="tab6">Tab Content6</Panel>
          <Panel title="tab7">Tab Content7</Panel>
          <Panel title="tab8">Tab Content8</Panel>
          <Panel title="tab9">Tab Content9</Panel>
          <Panel title="tab10">Tab Content3</Panel>
          <Panel title="tab11">Tab Content3</Panel>
          <Panel title="tab12">Tab Content3</Panel>
          <Panel title="tab13">Tab Content3</Panel>
          <Panel title="tab14">Tab Content3</Panel>
          <Panel value="tab15" title="tab15">
            Tab Content3
          </Panel>
          <Panel title="tab16">Tab Content3</Panel>
          <Panel title="tab17">Tab Content3</Panel>
          <Panel title="tab18">Tab Content3</Panel>
          <Panel title="tab19">Tab Content3</Panel>
          <Panel value="tab20" title="tab20">
            Tab Content3
          </Panel>
          <Panel title="tab21">Tab Content3</Panel>
          <Panel value="tab22" title="tab22">
            Tab Content3
          </Panel>
          <Action>
            <button>添加</button>
            <button>删除</button>
          </Action>
        </Tabs>
      </div>
    </div>
  )
}
