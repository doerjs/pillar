import React from 'react'
import { Row, Col } from '@/packages/grid'

import styles from './Grid.module.less'

export default function GridDemo() {
  function renderBlock() {
    return <div style={{ height: '100px', background: '#ddd' }}></div>
  }

  return (
    <div className={styles.grid}>
      <Row gutter={16}>
        <Col xs={{ span: 20, offset: 4 }} md={{ span: 16, offset: 2 }}>
          {renderBlock()}
        </Col>
        <Col span={4} offset={2}>
          {renderBlock()}
        </Col>
        <Col>{renderBlock()}</Col>
        <Col>{renderBlock()}</Col>
        <Col>{renderBlock()}</Col>
        <Col>{renderBlock()}</Col>
        <Col>{renderBlock()}</Col>
      </Row>
    </div>
  )
}
