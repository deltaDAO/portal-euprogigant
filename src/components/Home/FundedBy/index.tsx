import { ReactElement } from 'react'
import styles from './index.module.css'

export default function FundedBy(): ReactElement {
  const fundedByList = require
    .context('../../../../public/images/fundedBy', false, /\.(png|jpe?g)$/)
    .keys()
    .filter((e) => e.startsWith('./'))
    .map((x) => x.replace('./', ''))

  return (
    <div className={styles.wrapper}>
      <h3>Funded By</h3>
      <div className={styles.container}>
        {fundedByList.map((logo, i) => (
          <img
            key={`${logo}-${i}`}
            src={`/images/fundedBy/${logo}`}
            className={styles.logo}
          />
        ))}
      </div>
    </div>
  )
}
