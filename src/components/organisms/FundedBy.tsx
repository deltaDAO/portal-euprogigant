import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styles from './FundedBy.module.css'
import Container from '../atoms/Container'
import Img, { FluidObject } from 'gatsby-image'

const query = graphql`
  {
    fundedBy: allFile(
      filter: { absolutePath: { regex: "/src/images/fundedBy/" } }
    ) {
      edges {
        node {
          childImageSharp {
            id
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
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
          fluid: FluidObject
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
          <Img
            key={logo.node.childImageSharp.id}
            className={styles.logo}
            fluid={logo.node.childImageSharp.fluid}
          />
        ))}
      </div>
    </Container>
  )
}
