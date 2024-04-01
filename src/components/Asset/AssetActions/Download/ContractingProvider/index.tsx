import { ReactElement, useCallback, useEffect, useState } from 'react'
import styles from './index.module.css'
import Button from '../../../../@shared/atoms/Button'
import { useAccount, useSignMessage } from 'wagmi'
import { getContractingProviderNonce, getPayPerUseCount } from '../../utils'
import Alert from '../../../../@shared/atoms/Alert'
import { useMarketMetadata } from '../../../../../@context/MarketMetadata'

export enum PAYMENT_MODES {
  SUBSCRIPTION = 'subscription',
  PAYPERUSE = 'payperuse'
}

export type PaymentMode = `${PAYMENT_MODES}`

export default function ContractingProvider(props: {
  did: string
}): ReactElement {
  const { did } = props
  const { address } = useAccount()
  const [isRequesting, setIsRequesting] = useState(false)
  const [accessCreditsCount, setAccessCreditsCount] = useState<number>()
  const { signMessage, data: signature, isSuccess, isError } = useSignMessage()
  const {
    appConfig: {
      contractingProvider: { endpoint: contractingProviderEndpoint }
    }
  } = useMarketMetadata()

  const checkAccessCredits = async () => {
    setIsRequesting(true)
    const nonce = await getContractingProviderNonce(
      contractingProviderEndpoint,
      address
    )
    signMessage({ message: nonce })
  }

  const updateCount = useCallback(async () => {
    const count = await getPayPerUseCount(
      contractingProviderEndpoint,
      address,
      signature,
      did
    )
    setAccessCreditsCount(count)
    setIsRequesting(false)
  }, [contractingProviderEndpoint, address, signature, did])

  useEffect(() => {
    if (isError) setIsRequesting(false)
    if (isSuccess) {
      updateCount()
    }
  }, [isSuccess, isError])

  return (
    <div className={styles.container}>
      {accessCreditsCount ? (
        <Alert
          state="info"
          text={`You purchased access to this service **${accessCreditsCount} time${
            accessCreditsCount > 1 ? 's' : ''
          }**`}
          action={{
            name: 'Re-run',
            handleAction: () => checkAccessCredits()
          }}
        />
      ) : (
        <Button
          style="text"
          onClick={() => checkAccessCredits()}
          disabled={isRequesting}
        >
          Check Access Credits
        </Button>
      )}
      <div className={styles.help}>
        You can validate your purchase count of this SaaS Offering against a
        contracting provider instance.
      </div>
    </div>
  )
}
