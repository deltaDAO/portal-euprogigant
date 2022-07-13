import React, { ReactElement } from 'react'
import classNames from 'classnames/bind'
import styles from './PageHeader.module.css'
import Markdown from '../atoms/Markdown'
import Logo from '../atoms/Logo'
import { graphql, useStaticQuery } from 'gatsby'
import Button from '../atoms/Button'

const cx = classNames.bind(styles)

export const previewBannerQuery = graphql`
  query previewBannerQuery {
    content: allFile(
      filter: { relativePath: { eq: "pages/index/banner.json" } }
    ) {
      edges {
        node {
          childIndexJson {
            previewBanner {
              title
              description
              cta {
                label
                previewUrl
              }
            }
          }
        }
      }
    }
  }
`

interface PreviewBanner {
  title: string
  description: string
  cta: {
    label: string
    previewUrl: string
  }
}

export default function PageHeader({
  title,
  description,
  center,
  powered,
  isHome
}: {
  title: string
  description?: string
  center?: boolean
  powered?: boolean
  isHome?: boolean
}): ReactElement {
  const data = useStaticQuery(previewBannerQuery)
  const { previewBanner }: { previewBanner: PreviewBanner } =
    data.content.edges[0].node.childIndexJson

  const styleClasses = cx({
    header: true,
    center: center,
    homeHeader: isHome
  })

  return (
    <div className={isHome ? styles.homeWrapper : styles.wrapper}>
      <header className={styleClasses}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          {description && (
            <Markdown text={description} className={styles.description} />
          )}
        </div>
        {isHome && previewBanner && (
          <div className={styles.previewBanner}>
            <h2 className={styles.previewTitle}>{previewBanner.title}</h2>
            <p className={styles.previewSubTitle}>
              {previewBanner.description}
            </p>
            <Button
              className={styles.previewButton}
              href={previewBanner.cta.previewUrl}
              style="primary"
            >
              {previewBanner.cta.label}
            </Button>
          </div>
        )}
        {powered && (
          <div className={styles.logoContainer}>
            <p className={styles.powered}>powered by</p>
            <a
              href="https://oceanprotocol.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Logo />
            </a>
          </div>
        )}
      </header>
    </div>
  )
}
