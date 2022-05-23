import { graphql, useStaticQuery } from 'gatsby'
import React, { ReactElement, useEffect, useRef } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import { OnboardingStep } from '..'
import StepBody from '../../../../organisms/Onboarding/StepBody'
import StepHeader from '../../../../organisms/Onboarding/StepHeader'
import { toast } from 'react-toastify'

const query = graphql`
  query DownloadMetaMaskQuery {
    file(
      relativePath: { eq: "pages/index/onboarding/steps/downloadMetamask.json" }
    ) {
      childStepsJson {
        title
        subtitle
        body
        image {
          childImageSharp {
            original {
              src
            }
          }
        }
        buttonLabel
      }
    }
  }
`

export default function DownloadMetamask(): ReactElement {
  const data = useStaticQuery(query)
  const { title, subtitle, body, image, buttonLabel }: OnboardingStep =
    data.file.childStepsJson

  const onboarding = useRef<MetaMaskOnboarding>()

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  const downloadMetaMask = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      onboarding.current.stopOnboarding()
      toast.success(
        'MetaMask is already installed, you can move to the next step.'
      )
      return
    }
    onboarding.current.startOnboarding()
  }

  const actions = [
    {
      buttonLabel,
      buttonAction: () => downloadMetaMask(),
      loading: false,
      completed: false
    }
  ]

  return (
    <div>
      <StepHeader title={title} subtitle={subtitle} />
      <StepBody
        body={body}
        image={image.childImageSharp.original.src}
        actions={actions}
      />
    </div>
  )
}
