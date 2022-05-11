import React, { ReactElement } from 'react'
import Container from '../atoms/Container'
import Markdown from '../atoms/Markdown'
import styles from './FeaturedAssets.module.css'

export default function FeaturedAssets(): ReactElement {
  return (
    <div className={styles.section}>
      <Container>
        <h3>Featured Assets</h3>
        <div className={styles.card}>
          <h4>Title</h4>
          <Markdown text="lalalala" />
        </div>
        {/* <AssetList
        assets={result?.results}
        showPagination={false}
        isLoading={loading}
        className={assetListClassName}
      />
      {action && action} */}
      </Container>
    </div>
  )
}
