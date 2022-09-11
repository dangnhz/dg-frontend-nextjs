import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import Lottie from 'lottie-react'
import gsap from 'gsap'
import { isMobile, browserName, CustomView } from 'react-device-detect'
import classNames from 'classnames/bind'

import styles from './PageHeader.module.scss'

import {
  animationType1,
  animationType2,
  animationType3,
  animationType4,
  animationType5,
  animationType6,
} from '@lib/blob-animations'

import { pinkCloud, blueCloud, greenCloud, purpleCloud, orangeCloud, redCloud } from '@lib/cloud-images'
import { useWindowSize } from 'react-use'

interface Props {
  title: string
  subtitle: string
  description: string
  animationType: string
}

const cx = classNames.bind(styles)

const PageHeader: React.FC<Props> = ({ title, subtitle, description, animationType = 'type3' }) => {
  const [animationData, setAnimationData] = useState(animationType1)
  const [cloudImage, setCloudImage] = useState(greenCloud)
  const [isOnMobile, setIsOnMobile] = useState(false)
  const { width } = useWindowSize()

  useEffect(() => {
    setIsOnMobile(isMobile)
  }, [])

  useEffect(() => {
    if (animationType) {
      switch (animationType) {
        case 'type1':
          setAnimationData(animationType1)
          setCloudImage(pinkCloud)
          return
        case 'type2':
          setAnimationData(animationType2)
          setCloudImage(purpleCloud)
          return
        case 'type3':
          setAnimationData(animationType3)
          setCloudImage(greenCloud)
          return
        case 'type4':
          setAnimationData(animationType4)
          setCloudImage(blueCloud)
          return
        case 'type5':
          setAnimationData(animationType5)
          setCloudImage(orangeCloud)
          return
        case 'type6':
          setAnimationData(animationType6)
          setCloudImage(redCloud)
          return
        default:
          setAnimationData(animationType3)
          return
      }
    }
  }, [animationType])

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMin meet',
    },
  }

  const pageHeaderRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const titleWrapper = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headerTimeline = gsap.timeline()

    headerTimeline.fromTo(
      titleRef.current,
      {
        yPercent: 100,

        delay: 0.5,
      },
      {
        yPercent: 0,
        duration: 0.4,
      }
    )

    headerTimeline.fromTo(
      blobRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.3,
      }
    )

    headerTimeline.fromTo(
      subtitleRef.current,
      {
        opacity: 0,

        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
      },
      '-=0.1'
    )

    headerTimeline.fromTo(
      descriptionRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
      },
      '-=0.1'
    )
  }, [])

  useEffect(() => {
    const cloud = document.querySelector('.js-page-header-animation') as HTMLElement
    const titleRect = titleRef.current?.getBoundingClientRect()
    cloud.style.left = titleRect ? titleRect.width - 150 + 'px' : ''
  }, [width])

  return (
    <div ref={pageHeaderRef} className={cx('page-header', 'padding-horizontal padding-b-7')}>
      <div className={cx('page-header-wrapper', 'max-width-5')}>
        <div className={cx('page-header-title')} ref={titleWrapper}>
          <div ref={blobRef} className={cx('animation-wrapper')}>
            <CustomView
              condition={browserName !== 'Safari' && !isOnMobile}
              className={cx('page-header-animation', 'js-page-header-animation')}
            >
              <Lottie {...lottieOptions} />
            </CustomView>
            <CustomView
              condition={browserName === 'Safari' || isOnMobile}
              className={cx('page-header-animation', 'js-page-header-animation', 'cloud-image')}
            >
              <img src={cloudImage.src} alt="title-cloud" />
            </CustomView>
          </div>
          <h1 ref={titleRef}>{title}</h1>
        </div>
        <div className={cx('page-header-content')}>
          <div
            ref={subtitleRef}
            className={cx('page-header-subtitle')}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          ></div>
          <div
            ref={descriptionRef}
            className={cx('page-header-description')}
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader
