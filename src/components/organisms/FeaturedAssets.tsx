import React, { ReactElement } from 'react'
import Container from '../atoms/Container'
import Markdown from '../atoms/Markdown'
import styles from './FeaturedAssets.module.css'
import { ReactComponent as BlobShape } from '../../images/blobShape.svg'
import { ReactComponent as Compute } from '../../images/compute.svg'
import { ReactComponent as Lock } from '../../images/lock.svg'
import Button from '../atoms/Button'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query FeaturedSectionQuery {
    file(relativePath: { eq: "pages/index/featured.json" }) {
      childIndexJson {
        featured {
          key
          title
          body
          cta {
            label
            link
          }
        }
      }
    }
  }
`

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
  const data = useStaticQuery(query)
  const { featured }: Featured = data.file.childIndexJson

  return (
    <Container>
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
