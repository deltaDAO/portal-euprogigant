import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styles from './FundedBy.module.css'
import Container from '../atoms/Container'

const query = graphql`
  {
    allFile(filter: { absolutePath: { regex: "/src/images/fundedBy/" } }) {
      edges {
        node {
          childImageSharp {
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
      original: {
        src: string
      }
    }
  }
}

export default function FundedBy(): ReactElement {
  const data = useStaticQuery(query)
  const logos: Logo[] = data?.allFile?.edges

  return (
    <Container className={styles.wrapper}>
      <h3>Funded By</h3>
      <div className={styles.container}>
        {logos?.map((logo, i) => (
          <div key={i} className={styles.logo}>
            <img src={logo.node.childImageSharp.original.src} />
          </div>
        ))}
      </div>
    </Container>
  )
}
