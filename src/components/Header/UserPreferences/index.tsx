import { ReactElement } from 'react'
import Tooltip from '@shared/atoms/Tooltip'
import Cog from '@images/cog.svg'
import styles from './index.module.css'
import Debug from './Debug'
import Caret from '@images/caret.svg'
import ExternalContent from './ExternalContent'
import Onboarding from './Onboarding'
import AutomationWalletMode from './AutomationWalletMode'
import { useMarketMetadata } from '@context/MarketMetadata'

export default function UserPreferences(): ReactElement {
  const { appConfig } = useMarketMetadata()

  return (
    <Tooltip
      content={
        <ul className={styles.preferencesDetails}>
          <li>
            <ExternalContent />
          </li>
          {appConfig.automationConfig.enableAutomation === 'true' && (
            <li>
              <AutomationWalletMode />
            </li>
          )}
          <li>
            <Onboarding />
          </li>
          <li>
            <Debug />
          </li>
        </ul>
      }
      trigger="click focus mouseenter"
      className={styles.preferences}
    >
      <>
        <Cog aria-label="Preferences" className={styles.icon} />
        <Caret aria-hidden="true" className={styles.caret} />
      </>
    </Tooltip>
  )
}
