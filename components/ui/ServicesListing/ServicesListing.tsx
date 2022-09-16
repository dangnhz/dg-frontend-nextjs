import React, { useState, useRef, useEffect, useCallback } from 'react'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import ServicesItem from './ServicesItem'
import Image from 'next/image'
import classNames from 'classnames/bind'
import styles from './ServicesListing.module.scss'

const cx = classNames.bind(styles)

interface Props {
  services: any
}

const ServicesListing: React.FC<Props> = ({ services }) => {
  const servicesRef = useRef(null)

  const imageRef = useRef(null)

  const [teaserImages, setTeaserImages] = useState<Array<string>>([])

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const changeToNextImage = useCallback(() => {
    setCurrentImageIndex((preValue) => {
      if (preValue < teaserImages.length - 1) {
        return preValue + 1
      } else return preValue
    })
  }, [teaserImages])

  const changeToPreviousImage = useCallback(() => {
    setCurrentImageIndex((preValue) => {
      if (preValue > 0) {
        return preValue - 1
      } else return preValue
    })
  }, [])

  useEffect(() => {
    const images = services.map((item: { teaserImage: string }) => item.teaserImage)
    setTeaserImages(images)
  }, [services])

  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    //change image
    gsap.utils.toArray('.js-item-wrap').forEach((item: any, index: number) => {
      if (index !== 0) {
        ScrollTrigger.create({
          trigger: item,
          start: '150px center',
          onEnter: changeToNextImage,
          onLeaveBack: changeToPreviousImage,
          // markers: true,
        })
      }
    })

    //clean up
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [teaserImages, changeToNextImage, changeToPreviousImage])

  useEffect(() => {
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh()
    })
  }, [])

  return (
    <div ref={servicesRef} className={cx('services-listing', 'padding-horizontal')}>
      <div className={cx('background')}></div>
      <div className={cx('wrapper', 'mx-auto max-width-5')}>
        <div ref={imageRef} className={cx('image')}>
          {services?.length > 0 &&
            teaserImages.map((image: string, index: number) => (
              <div key={index} className={cx('image-wrap', { active: currentImageIndex === index })}>
                <Image src={image} alt="services" layout='fill' priority/>
              </div>
            ))}
        </div>
        <div className={cx('items')}>
          {services.map((item: any) => (
            <div key={item.id} className={cx('item-wrap', 'js-item-wrap')}>
              <ServicesItem data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesListing
