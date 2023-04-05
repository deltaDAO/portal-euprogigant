import React, { ReactElement } from 'react'
import styles from './index.module.css'
import BlobShape from '@images/blobShape.svg'
import Compute from '@images/compute.svg'
import Lock from '@images/lock.svg'
import content from '../../../../content/pages/home/featured.json'
import Container from '@components/@shared/atoms/Container'
import Markdown from '@components/@shared/Markdown'
import Button from '@components/@shared/atoms/Button'

interface Featured {
  featured: {
    key: string
    title: string
    body: string
    cta: {
      label: string
      link: string
    }
  }[]
}

export default function FeaturedAssets(): ReactElement {
  const { featured }: Featured = content

  return (
    <Container className={styles.container}>
      <h3>Featured Assets</h3>
      <div className={styles.section}>
        {featured.map((type) => (
          <div key={type.key} className={styles.card}>
            <BlobShape className={styles.blob} />
            {type.key === 'data' ? (
              <Compute className={styles.icon} />
            ) : (
              <Lock className={styles.icon} />
            )}
            <h4>{type.title}</h4>
            <Markdown className={styles.description} text={type.body} />
            <Button style="primary" to={type.cta.link}>
              {type.cta.label}
            </Button>
          </div>
        ))}
      </div>
    </Container>
  )
}
