import React, { useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './FeatureLeftRightImage.module.scss'
import { Column, Flex } from '@components/ui/Flex'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SubServiceList from '@components/ui/SubServiceList'

const cx = classNames.bind(styles)

interface Props {
  subServices?: {
    title: string
    serviceItems: any
    parentAlias: string
    parentId: string
  }
  mediaSide?: string
  isSticky?: boolean
  image: string
  title?: string
  body?: string
  gap?: string
  mediaWidth?: string
  bgColor?: string
  textColor?: string
}

const FeatureLeftRightImage: React.FC<Props> = ({
  subServices,
  mediaSide,
  isSticky,
  image,
  title,
  body,
  gap = 'lg',
  mediaWidth = '32%',
  bgColor,
  textColor,
}) => {
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
    'feature-left-right-image',
    'padding-horizontal',
    { 'padding-v-10': bgColor },
    { 'margin-v-7': !bgColor },
    { 'text-dark': textColor === 'dark' },
    { 'text-light': textColor === 'light' }
  )
  return (
    <div className={classes} ref={featureImageRef} style={{backgroundColor: bgColor}}>
      <div className="max-width-5 mx-auto">
        <Flex
          alignItems={`${isSticky ? 'start' : 'center'}`}
          direction={`${mediaSide === 'media-right' ? 'row-reserve' : 'row'}`}
          gap={gap}
        >
          <Column width={mediaWidth} className={cx({ 'is-sticky': isSticky })}>
            {subServices && (
              <SubServiceList
                title={subServices.title}
                serviceItems={subServices.serviceItems}
                parentAlias={subServices.parentAlias}
                parentId={subServices.parentId}
              />
            )}
            <div className={cx('image')} ref={imageRef}>
              <Image src={image} width={480} height={600} layout="responsive" alt={title ? title : 'image'} priority />
            </div>
          </Column>
          <Column>
            <div className={cx('content')}>
              {title && (
                <h3 className="title margin-b-3" ref={titleRef}>
                  {title}
                </h3>
              )}
              {body && <div className="body-copy" ref={contentRef} dangerouslySetInnerHTML={{ __html: body }}></div>}
            </div>
          </Column>
        </Flex>
      </div>
    </div>
  )
}

export default FeatureLeftRightImage
