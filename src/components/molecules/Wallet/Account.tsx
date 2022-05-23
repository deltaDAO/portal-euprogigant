import React, { FormEvent, useEffect, useRef, useState } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import { ReactComponent as Caret } from '../../../images/caret.svg'
import { accountTruncate } from '../../../utils/web3'
import Loader from '../../atoms/Loader'
import styles from './Account.module.css'
import { useWeb3 } from '../../../providers/Web3'
import Blockies from '../../atoms/Blockies'

// Forward ref for Tippy.js
// eslint-disable-next-line
const Account = React.forwardRef((props, ref: any) => {
  const { accountId, accountEns, web3Modal, connect } = useWeb3()

  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>()
  const onboarding = useRef<MetaMaskOnboarding>()

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
    setIsMetaMaskInstalled(MetaMaskOnboarding.isMetaMaskInstalled())
  }, [])

  async function handleActivation(e: FormEvent<HTMLButtonElement>) {
    // prevent accidentially submitting a form the button might be in
    e.preventDefault()

    if (isMetaMaskInstalled && MetaMaskOnboarding.isMetaMaskInstalled()) {
      await connect()
      return
    }

    onboarding.current.startOnboarding()
    setIsMetaMaskInstalled(true)
  }

  const buttonText = isMetaMaskInstalled ? (
    <>
      Connect&nbsp;<span>Wallet</span>
    </>
  ) : (
    <>
      Download&nbsp;<span>MetaMask</span>
    </>
  )

  return !accountId && web3Modal?.cachedProvider ? (
    // Improve user experience for cached provider when connecting takes some time
    <button className={styles.button} onClick={(e) => e.preventDefault()}>
      <Loader message="Reconnecting..." />
    </button>
  ) : accountId ? (
    <button
      className={styles.button}
      aria-label="Account"
      ref={ref}
      onClick={(e) => e.preventDefault()}
    >
      <Blockies accountId={accountId} />
      <span className={styles.address} title={accountId}>
        {accountTruncate(accountEns || accountId)}
      </span>
      <Caret aria-hidden="true" className={styles.caret} />
    </button>
  ) : (
    <button
      className={`${styles.button} ${styles.initial}`}
      onClick={(e) => handleActivation(e)}
      // Need the `ref` here although we do not want
      // the Tippy to show in this state.
      ref={ref}
    >
      {buttonText}
    </button>
  )
})

export default Account
