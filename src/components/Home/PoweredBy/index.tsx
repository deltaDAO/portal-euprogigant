import { ReactElement } from 'react'
import styles from './index.module.css'
import DeltaDaoLogo from '@images/deltaDAO_Logo_RGB_positiv.svg'

export default function PoweredBy(): ReactElement {
  return (
    <div className={styles.container}>
      <p>Powered By</p>
      <div className={styles.logoContainer}>
        <a className={styles.logo} href="https://delta-dao.com">
          <DeltaDaoLogo />
        </a>
      </div>
    </div>
  )
}
