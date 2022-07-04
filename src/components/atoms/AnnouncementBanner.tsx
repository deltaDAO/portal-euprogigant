import React, { ReactElement } from 'react'
import classNames from 'classnames/bind'
import Markdown from '../atoms/Markdown'
import Button from '../atoms/Button'
import styles from './AnnouncementBanner.module.css'
import BuildId from './BuildId'

const cx = classNames.bind(styles)

export interface AnnouncementAction {
  name: string
  style?: string
  handleAction: () => void
}

export default function AnnouncementBanner({
  text,
  action,
  showBuild,
  state,
  className
}: {
  text: string
  action?: AnnouncementAction
  showBuild?: boolean
  state?: 'success' | 'warning' | 'error'
  className?: string
}): ReactElement {
  const styleClasses = cx({
    banner: true,
    error: state === 'error',
    warning: state === 'warning',
    success: state === 'success',
    [className]: className
  })

  return (
    <div className={styleClasses}>
      {text && (
        <>
          <Markdown className={styles.text} text={text} />
          {showBuild && (
            <div className={styles.build}>
              <BuildId />
            </div>
          )}
        </>
      )}

      {action && (
        <Button style="text" size="small" onClick={action.handleAction}>
          {action.name}
        </Button>
      )}
    </div>
  )
}
