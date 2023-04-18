import React, { ReactElement } from 'react'
import LogoAsset from '@images/euProGigant-logo.svg'
import styles from './index.module.css'

export default function Logo(): ReactElement {
  return <LogoAsset className={styles.logo} />
}
