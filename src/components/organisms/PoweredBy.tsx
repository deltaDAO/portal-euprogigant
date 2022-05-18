import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styles from './PoweredBy.module.css'
import LinkOpener from '../molecules/LinkOpener'

const query = graphql`
  {
    deltaDao: file(
      relativePath: { eq: "deltaDAO_Logo_RGB_positiv_small.png" }
    ) {
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
      <p>Powered By</p>
      <LinkOpener
        className={styles.logo}
        uri="https://delta-dao.com"
        openNewTab
      >
        <img src={deltaDao.childImageSharp.original.src} />
      </LinkOpener>
    </div>
  )
}
