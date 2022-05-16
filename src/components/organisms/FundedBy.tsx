import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styles from './FundedBy.module.css'
import Container from '../atoms/Container'

const query = graphql`
  {
    fundedBy: allFile(
      filter: { absolutePath: { regex: "/src/images/fundedBy/" } }
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

interface Logos {
  fundedBy: {
    edges: {
      node: {
        childImageSharp: {
          id: string
          original: {
            src: string
          }
        }
      }
    }[]
  }
}

export default function FundedBy(): ReactElement {
  const data: Logos = useStaticQuery(query)
  const { fundedBy } = data

  return (
    <Container className={styles.wrapper}>
      <h3>Funded By</h3>
      <div className={styles.container}>
        {fundedBy?.edges.map((logo) => (
          <div key={logo.node.childImageSharp.id} className={styles.logo}>
            <img src={logo.node.childImageSharp.original.src} />
          </div>
        ))}
      </div>
    </Container>
  )
}
