import {
  createContext,
  useContext,
  ReactElement,
  ReactNode,
  useState,
  useEffect
} from 'react'
import { LoggerInstance, LogLevel } from '@oceanprotocol/lib'
import { isBrowser } from '@utils/index'
import { useMarketMetadata } from './MarketMetadata'
import { AUTOMATION_MODES } from './Automation/AutomationProvider'

interface UserPreferencesValue {
  debug: boolean
  setDebug: (value: boolean) => void
  currency: string
  setCurrency: (value: string) => void
  chainIds: number[]
  privacyPolicySlug: string
  showPPC: boolean
  setChainIds: (chainIds: number[]) => void
  bookmarks: string[]
  addBookmark: (did: string) => void
  removeBookmark: (did: string) => void
  setPrivacyPolicySlug: (slug: string) => void
  setShowPPC: (value: boolean) => void
  allowExternalContent: boolean
  setAllowExternalContent: (value: boolean) => void
  onboardingStep: number
  setOnboardingStep: (step: number) => void
  showOnboardingModule: boolean
  setShowOnboardingModule: (value: boolean) => void
  locale: string
  automationWalletJSON: string
  setAutomationWalletJSON: (encryptedWallet: string) => void
  automationWalletMode: AUTOMATION_MODES
  setAutomationWalletMode: (mode: AUTOMATION_MODES) => void
}

const UserPreferencesContext = createContext(null)

const localStorageKey = 'ocean-user-preferences-v4'

function getLocalStorage(): UserPreferencesValue {
  const storageParsed =
    isBrowser && JSON.parse(window.localStorage.getItem(localStorageKey))
  return storageParsed
}

function setLocalStorage(values: Partial<UserPreferencesValue>) {
  return (
    isBrowser &&
    window.localStorage.setItem(localStorageKey, JSON.stringify(values))
  )
}

function UserPreferencesProvider({
  children
}: {
  children: ReactNode
}): ReactElement {
  const { appConfig } = useMarketMetadata()
  const localStorage = getLocalStorage()
  // Set default values from localStorage
  const [debug, setDebug] = useState<boolean>(localStorage?.debug || false)
  const [currency, setCurrency] = useState<string>(
    localStorage?.currency || 'EUR'
  )
  const [locale, setLocale] = useState<string>()
  const [bookmarks, setBookmarks] = useState(localStorage?.bookmarks || [])
  const [chainIds, setChainIds] = useState(
    localStorage?.chainIds || appConfig.chainIds
  )
  const { defaultPrivacyPolicySlug } = appConfig

  const [privacyPolicySlug, setPrivacyPolicySlug] = useState<string>(
    localStorage?.privacyPolicySlug || defaultPrivacyPolicySlug
  )

  const [showPPC, setShowPPC] = useState<boolean>(
    localStorage?.showPPC !== false
  )

  const [allowExternalContent, setAllowExternalContent] = useState<boolean>(
    localStorage?.allowExternalContent || false
  )

  const [automationWallet, setAutomationWallet] = useState<string>(
    localStorage?.automationWalletJSON || ''
  )

  const [automationWalletMode, setAutomationWalletMode] =
    useState<AUTOMATION_MODES>(
      localStorage?.automationWalletMode || AUTOMATION_MODES.SIMPLE
    )

  const [showOnboardingModule, setShowOnboardingModule] = useState<boolean>(
    localStorage?.showOnboardingModule === undefined
      ? false
      : localStorage?.showOnboardingModule
  )

  const [onboardingStep, setOnboardingStep] = useState<number>(
    localStorage?.onboardingStep || 0
  )

  // Write values to localStorage on change
  useEffect(() => {
    setLocalStorage({
      chainIds,
      debug,
      currency,
      bookmarks,
      privacyPolicySlug,
      showPPC,
      allowExternalContent,
      automationWalletJSON: automationWallet,
      automationWalletMode,
      showOnboardingModule,
      onboardingStep
    })
  }, [
    chainIds,
    debug,
    currency,
    bookmarks,
    privacyPolicySlug,
    showPPC,
    allowExternalContent,
    automationWallet,
    automationWalletMode,
    showOnboardingModule,
    onboardingStep
  ])

  // Set ocean.js log levels, default: Error
  useEffect(() => {
    debug === true
      ? LoggerInstance.setLevel(LogLevel.Verbose)
      : LoggerInstance.setLevel(LogLevel.Error)
  }, [debug])

  // Get locale always from user's browser
  useEffect(() => {
    if (!window) return
    setLocale(window.navigator.language)
  }, [])

  function addBookmark(didToAdd: string): void {
    const newPinned = [...bookmarks, didToAdd]
    setBookmarks(newPinned)
  }

  function removeBookmark(didToAdd: string): void {
    const newPinned = bookmarks.filter((did: string) => did !== didToAdd)
    setBookmarks(newPinned)
  }

  // Bookmarks old data structure migration
  useEffect(() => {
    if (bookmarks.length !== undefined) return
    const newPinned: string[] = []
    for (const network in bookmarks) {
      ;(bookmarks[network] as unknown as string[]).forEach((did: string) => {
        did !== null && newPinned.push(did)
      })
    }
    setBookmarks(newPinned)
  }, [bookmarks])

  // chainIds old data migration
  // remove deprecated networks from user-saved chainIds
  useEffect(() => {
    if (!chainIds.includes(3) && !chainIds.includes(4)) return
    const newChainIds = chainIds.filter((id) => id !== 3 && id !== 4)
    setChainIds(newChainIds)
  }, [chainIds])

  return (
    <UserPreferencesContext.Provider
      value={
        {
          debug,
          currency,
          locale,
          chainIds,
          bookmarks,
          privacyPolicySlug,
          showPPC,
          setChainIds,
          setDebug,
          setCurrency,
          addBookmark,
          removeBookmark,
          setPrivacyPolicySlug,
          setShowPPC,
          allowExternalContent,
          setAllowExternalContent,
          automationWalletJSON: automationWallet,
          setAutomationWalletJSON: setAutomationWallet,
          automationWalletMode,
          setAutomationWalletMode,
          showOnboardingModule,
          setShowOnboardingModule,
          onboardingStep,
          setOnboardingStep
        } as UserPreferencesValue
      }
    >
      {children}
    </UserPreferencesContext.Provider>
  )
}

// Helper hook to access the provider values
const useUserPreferences = (): UserPreferencesValue =>
  useContext(UserPreferencesContext)

export { UserPreferencesProvider, useUserPreferences }
