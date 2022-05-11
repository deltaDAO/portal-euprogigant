import React, { ReactElement, TouchEvent, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Carousel.module.css'

const cx = classNames.bind(styles)

export default function Carousel({
  children,
  show = 1,
  infiniteLoop
}: {
  children: ReactElement[]
  show?: 1 | 2 | 3 | 4
  infiniteLoop?: boolean
}): ReactElement {
  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0)
  const [length, setLength] = useState(children.length)
  console.log(children.length, children)

  const [isRepeating, setIsRepeating] = useState(
    infiniteLoop && children.length > show
  )
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  const [touchPosition, setTouchPosition] = useState(null)

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length)
    setIsRepeating(infiniteLoop && children.length > show)
  }, [children, infiniteLoop, show])

  useEffect(() => {
    if (isRepeating) {
      if (currentIndex === show || currentIndex === length) {
        setTransitionEnabled(true)
      }
    }
  }, [currentIndex, isRepeating, show, length])

  const next = () => {
    if (isRepeating || currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  const prev = () => {
    if (isRepeating || currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
    }
  }

  const handleTouchStart = (e: TouchEvent) => {
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  const handleTouchMove = (e: TouchEvent) => {
    const touchDown = touchPosition

    if (touchDown === null) {
      return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
      next()
    }

    if (diff < -5) {
      prev()
    }

    setTouchPosition(null)
  }

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false)
        setCurrentIndex(length)
      } else if (currentIndex === length + show) {
        setTransitionEnabled(false)
        setCurrentIndex(show)
      }
    }
  }

  const renderExtraPrev = () => {
    const output = []
    for (let index = 0; index < show; index++) {
      output.push(children[length - 1 - index])
    }
    output.reverse()
    return output
  }

  const renderExtraNext = () => {
    const output = []
    for (let index = 0; index < show; index++) {
      output.push(children[index])
    }
    return output
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        {(isRepeating || currentIndex > 0) && (
          <button onClick={prev} className={styles.leftArrow}>
            &lt;
          </button>
        )}
        <div
          className={styles.carouselContentWrapper}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={cx({ carouselContent: true, [`show${show}`]: true })}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
              transition: !transitionEnabled ? 'none' : undefined
            }}
            onTransitionEnd={() => handleTransitionEnd()}
          >
            {length > show && isRepeating && renderExtraPrev()}
            {children}
            {length > show && isRepeating && renderExtraNext()}
          </div>
        </div>
        {(isRepeating || currentIndex < length - show) && (
          <button onClick={next} className={styles.rightArrow}>
            &gt;
          </button>
        )}
      </div>
    </div>
  )
}
