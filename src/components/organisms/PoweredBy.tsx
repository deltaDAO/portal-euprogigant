import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styles from './PoweredBy.module.css'
import LinkOpener from '../molecules/LinkOpener'
import Logo from '../atoms/Logo'

const query = graphql`
  {
    deltaDao: file(relativePath: { eq: "deltaDAO_Logo_Hoch_RGB_positiv.png" }) {
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
      <div className={styles.logoContainer}>
        <LinkOpener
          className={styles.logo}
          uri="https://delta-dao.com"
          openNewTab
        >
          <img src={deltaDao.childImageSharp.original.src} />
        </LinkOpener>
        <LinkOpener uri="https://oceanprotocol.com" openNewTab>
          <Logo />
        </LinkOpener>
      </div>
    </div>
  )
}
