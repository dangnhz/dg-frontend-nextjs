import React, { useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import { Column, Flex } from '@components/ui/Flex'
import Image from 'next/future/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

import styles from './FeatureImageBottom.module.scss';

const cx = classNames.bind(styles)

interface Props {
  mediaSide?: string
  image: string
  title?: string
  body?: string
  bgColor?: string
  textColor?: string
}

const FeatureImageBottom: React.FC<Props> = ({ mediaSide, image, title, body, bgColor, textColor }) => {
  const featureImageRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: featureImageRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    const fade = {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
        duration: 0.5,
      },
    }

    tl.fromTo(imageRef.current, fade.from, fade.to)

    tl.fromTo(titleRef.current, fade.from, fade.to)

    tl.fromTo(contentRef.current, fade.from, fade.to, '-=0.3')
  }, [])

  const classes = cx(
    'feature-image-bottom',
    'padding-horizontal',
    { 'padding-t-10': bgColor },
    { 'margin-v-7': !bgColor },
    { 'media-bottom': mediaSide === 'media-bottom' },
    { 'media-bottom-right': mediaSide === 'media-bottom-right' },
    { 'text-dark': textColor === 'dark' },
    { 'text-light': textColor === 'light' }
  )
  return (
    <div className={classes} ref={featureImageRef}>
      {bgColor && <div className={cx("background")} style={{ backgroundColor: bgColor }}></div>}
      <div className="max-width-5 mx-auto">
        <div className={cx('content')}>
            <Flex gap='lg'>
              <Column width='32%'>
                {title && (
                    <h3 className={cx("title")} ref={titleRef}>
                      {title}
                    </h3>
                  )}
              </Column>
              <Column>
                  {body && <div className={cx("body","body-copy")} ref={contentRef} dangerouslySetInnerHTML={{ __html: body }}></div>}
              </Column>
            </Flex>
        </div>
        <div className={cx('image', 'margin-t-3')} ref={imageRef}>
              <Image src={image} alt={title ? title : 'digital garden image'} width={1920} height={1080} style={{width: '100%', height: 'auto'}} />
        </div>
      </div>
    </div>
  )
}

export default FeatureImageBottom
