import React, { ReactElement } from 'react'
import repoMetadata from '../../../repo-metadata.json'
import styles from './BuildId.module.css'

export default function BuildId(): ReactElement {
  const commitBranch = repoMetadata.branch
  const commitId = repoMetadata.commit
  const isMainBranch = commitBranch === 'main'

  return (
    <a
      className={styles.buildId}
      href={`https://github.com/deltaDAO/portal-euprogigant/tree/${commitId}`}
      target="_blank"
      rel="noreferrer"
      title="Build ID referring to the linked commit hash."
    >
      {commitId.substring(0, 7)}
    </a>
  )
}
