import React, { ReactElement } from 'react'
import HomeContent from './Content'
import OnboardingSection from '@components/@shared/Onboarding'
import FeaturedAssets from './FeaturedAssets'
import Container from '@components/@shared/atoms/Container'
import { ProjectPartners } from './ProjectPartners'
import FundedBy from './FundedBy'
import PoweredBy from './PoweredBy'

export default function HomePage(): ReactElement {
  return (
    <>
      <Container>
        <OnboardingSection />
        <HomeContent />
        <FeaturedAssets />
      </Container>

      <ProjectPartners />

      <Container>
        <FundedBy />
        <PoweredBy />
      </Container>
    </>
  )
}
