import React from 'react'
import { Action } from '@/packages/action'
import { Layout, Header, Footer, Side, Section } from '@/packages/layout'

import styles from './Layout.module.less'

export default function LayoutDemo() {
  return (
    <div className={styles.layout}>
      <Layout mode="fixed fixed">
        <Header title="基础用法" desc="演示Layout组件的基础用法" extra="额外的信息">
          <Action>
            <button>按钮</button>
            <button>按钮</button>
          </Action>
        </Header>
        <Side>Side</Side>
        <Layout mode="fixed auto">
          <Section>Section inner</Section>
          <Side>Side inner</Side>
          <Header>Header inner</Header>
          内容区域
          <Footer>Footer inner</Footer>
        </Layout>
        <Section>Section</Section>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  )
}
