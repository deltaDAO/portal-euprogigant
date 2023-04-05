import React, { ReactElement } from 'react'
import HomeContent from './Content'
import OnboardingSection from '@components/@shared/Onboarding'

export default function HomePage(): ReactElement {
  return (
    <>
      <OnboardingSection />
      <HomeContent />
    </>
  )
}
