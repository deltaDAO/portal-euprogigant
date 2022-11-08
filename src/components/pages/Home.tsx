import React, { ReactElement } from 'react'
import styles from './Home.module.css'
import Permission from '../organisms/Permission'
import HomeContent from '../organisms/HomeContent'
import OnboardingSection from './Home/Onboarding'
import FundedBy from '../organisms/FundedBy'
import ProjectPartners from '../organisms/ProjectPartners'
import FeaturedAssets from '../organisms/FeaturedAssets'
import PoweredBy from '../organisms/PoweredBy'
import { useUserPreferences } from '../../providers/UserPreferences'

export default function HomePage(): ReactElement {
  const { showOnboardingModule } = useUserPreferences()

  return (
    <Permission eventType="browse">
      <>
        {showOnboardingModule && (
          <section className={styles.content}>
            <OnboardingSection />
          </section>
        )}
        <section className={styles.content}>
          <HomeContent />
        </section>
        <FeaturedAssets />
        <section>
          <ProjectPartners />
          <FundedBy />
          <PoweredBy />
        </section>
      </>
    </Permission>
  )
}
