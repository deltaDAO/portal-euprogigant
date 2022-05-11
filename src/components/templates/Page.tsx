import React, { ReactNode, ReactElement } from 'react'
import PageHeader from '../molecules/PageHeader'
import Seo from '../atoms/Seo'
import Container from '../atoms/Container'

export interface PageProps {
  children: ReactNode
  title?: string
  uri: string
  description?: string
  noPageHeader?: boolean
}

export default function Page({
  children,
  title,
  uri,
  description,
  noPageHeader
}: PageProps): ReactElement {
  const isHome = uri === '/'

  const childElements = (
    <>
      {title && !noPageHeader && (
        <PageHeader title={title} description={description} powered={isHome} />
      )}
      {children}
    </>
  )

  return (
    <>
      <Seo title={title} description={description} uri={uri} />
      {isHome ? childElements : <Container>{childElements}</Container>}
    </>
  )
}
