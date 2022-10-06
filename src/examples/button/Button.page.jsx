import React from 'react'
import { Button } from '@/packages/button'

import styles from './Button.module.less'

export default function ButtonDemo() {
  return (
    <div className={styles.button}>
      <Button text="按钮" />
    </div>
  )
}
