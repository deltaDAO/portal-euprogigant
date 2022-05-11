import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styles from './ProjectPartners.module.css'
import Carousel from './Carousel'
import Container from '../atoms/Container'
import LinkOpener from '../molecules/LinkOpener'

const query = graphql`
  {
    allFile(
      filter: { absolutePath: { regex: "/src/images/projectPartners/" } }
    ) {
      edges {
        node {
          childImageSharp {
            id
            original {
              src
            }
          }
        }
      }
    }
  }
`

interface Logo {
  node: {
    childImageSharp: {
      id: string
      original: {
        src: string
      }
    }
  }
}

export default function ProjectPartners(): ReactElement {
  const data = useStaticQuery(query)
  const logos: Logo[] = data?.allFile?.edges

  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        <h3 className={styles.title}>These partners work with us</h3>
        <Carousel show={4} infiniteLoop>
          {logos.map((logo) => (
            <div
              key={logo.node.childImageSharp.id}
              className={styles.logoContainer}
            >
              <img
                src={logo.node.childImageSharp.original.src}
                className={styles.logo}
              />
            </div>
          ))}
        </Carousel>
        <div className={styles.footer}>
          <LinkOpener
            uri="https://euprogigant.com/partner/projektpartner/"
            openNewTab
          >
            All project partners
          </LinkOpener>
        </div>
      </Container>
    </div>
  )
}
