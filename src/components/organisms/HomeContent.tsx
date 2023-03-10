import React, { ReactElement } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Markdown from '../atoms/Markdown'
import styles from './HomeContent.module.css'
import classNames from 'classnames/bind'
import Button from '../atoms/Button'
import Container from '../atoms/Container'
import InteractiveModalImage from '../molecules/InteractiveModalImage'

const cx = classNames.bind(styles)

const query = graphql`
{
  file(absolutePath: {regex: "/content\\.json/"}) {
    childIndexJson {
      content {
        banner {
          image {
            childImageSharp {
              original {
                src
              }
            }
          }
          cta
          ctaTo
        }
        teaser {
          title
          text
        }
        paragraphs {
          title
          body
          cta
          ctaTo
          image {
            childImageSharp {
              original {
                src
              }
            }
          }
        }
      }
    }
  }
}
`
interface HomeContentData {
  file: {
    childIndexJson: {
      content: {
        banner: {
          image: { childImageSharp: { original: { src: string } } }
          cta: string
          ctaTo: string
        }
        teaser: {
          title: string
          text: string
        }
        paragraphs: {
          title: string
          body: string
          cta: string
          ctaTo: string
          image: { childImageSharp: { original: { src: string } } }
        }[]
      }
    }
  }
}

export default function HomeContent(): ReactElement {
  const data: HomeContentData = useStaticQuery(query)
  const { banner, paragraphs, teaser } = data.file.childIndexJson.content

  return (
    <Container>
      <div className={styles.banner}>
        <img src={banner.image.childImageSharp.original.src} />
        <Button
          className={styles.bannerButton}
          href={banner.ctaTo}
          style="primary"
          target="_blank"
          rel="noopener noreferrer"
          size="small"
        >
          {banner.cta}
        </Button>
      </div>
      <div className={styles.container}>
        <div className={styles.teaser}>
          <h2>{teaser.title}</h2>
          <Markdown text={teaser.text} />
        </div>
        <div className={styles.paragraphs}>
          {paragraphs.map((paragraph, i) => (
            <div
              key={paragraph.title}
              className={
                i % 2 === 1
                  ? cx({ paragraph: true, mirror: true })
                  : styles.paragraph
              }
            >
              <div className={styles.interactivity}>
                <InteractiveModalImage
                  src={paragraph.image.childImageSharp.original.src}
                  alt={paragraph.title}
                />
              </div>
              <div className={styles.content}>
                <h2>{paragraph.title}</h2>
                <Markdown text={paragraph.body} />
                <Button
                  href={paragraph.ctaTo}
                  style="primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {paragraph.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
