import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styles from './ProjectPartners.module.css'
import Carousel from './Carousel'
import Container from '../atoms/Container'

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
    <Container>
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
    </Container>
  )
}
