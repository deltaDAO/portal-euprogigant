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
  const [allowanceCount, setAllowanceCount] = useState<number>()
  const { signMessage, data: signature, isSuccess, isError } = useSignMessage()
  const {
    appConfig: {
      contractingProvider: { endpoint: contractingProviderEndpoint }
    }
  } = useMarketMetadata()

  const checkAllowance = async () => {
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
    setAllowanceCount(count)
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
      {allowanceCount ? (
        <Alert
          state="info"
          text={`You purchased access to this service **${allowanceCount} time${
            allowanceCount > 1 ? 's' : ''
          }**`}
          action={{
            name: 'Re-run',
            handleAction: () => checkAllowance()
          }}
        />
      ) : (
        <Button
          style="text"
          onClick={() => checkAllowance()}
          disabled={isRequesting}
        >
          Check Allowance
        </Button>
      )}
      <div className={styles.help}>
        You can validate your purchase count of this SaaS Offering against a
        contracting provider instance.
      </div>
    </div>
  )
}
