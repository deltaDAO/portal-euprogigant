import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styles from './PoweredBy.module.css'

const query = graphql`
  {
    deltaDao: file(relativePath: { eq: "deltaDAO-logo.png" }) {
      childImageSharp {
        original {
          src
        }
      }
    }
  }
`

interface Logo {
  deltaDao: {
    childImageSharp: {
      original: {
        src: string
      }
    }
  }
}

export default function PoweredBy(): ReactElement {
  const data: Logo = useStaticQuery(query)
  const { deltaDao } = data

  return (
    <div className={styles.container}>
      <h4>Powered By</h4>
      <div className={styles.logo}>
        <img src={deltaDao.childImageSharp.original.src} />
      </div>
    </div>
  )
}
