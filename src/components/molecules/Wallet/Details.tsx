import React, { ReactElement } from 'react'
import Button from '../../atoms/Button'
import styles from './Details.module.css'
import { useOcean } from '@oceanprotocol/react'
import Web3Feedback from './Feedback'
import { getNetworkName } from '../../../utils/wallet'
import { getInjectedProviderName } from 'web3modal'
import Conversion from '../../atoms/Price/Conversion'

export default function Details({ attrs }: { attrs: any }): ReactElement {
  const { balance, connect, logout, chainId } = useOcean()

  return (
    <div className={styles.details} {...attrs}>
      <ul>
        {Object.entries(balance).map(([key, value]) => (
          <li className={styles.balance} key={key}>
            <span>{key.toUpperCase()}</span> {value}
            {key === 'ocean' && <Conversion price={value} />}
          </li>
        ))}

        <li className={styles.actions}>
          <span title="Connected provider">
            {getInjectedProviderName()}
            <br />
            {getNetworkName(chainId)}
          </span>
          <Button
            style="text"
            size="small"
            onClick={() => {
              logout()
              connect()
            }}
          >
            Switch Wallet
          </Button>
        </li>
      </ul>
      <Web3Feedback />
      <div className={styles.arrow} data-popper-arrow />
    </div>
  )
}