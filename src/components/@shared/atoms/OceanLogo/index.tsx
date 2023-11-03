import { ReactElement } from 'react'
import LogoAssetFull from '@oceanprotocol/art/logo/logo.svg'
import LogoAsset from '@images/logo.svg'
import styles from './index.module.css'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export interface LogoProps {
  noWordmark?: boolean
  white?: boolean
}

export default function OceanLogo({
  noWordmark,
  white
}: LogoProps): ReactElement {
  const styleClasses = cx({
    logo: true,
    white
  })

  return noWordmark ? (
    <LogoAsset className={styleClasses} />
  ) : (
    <LogoAssetFull className={styleClasses} />
  )
}
