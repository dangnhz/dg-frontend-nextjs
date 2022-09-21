import React, { useEffect, useRef, useState } from 'react'
import Typewriter from 'typewriter-effect'
import { isMobile, CustomView } from 'react-device-detect'
import { homepageCloud } from '@lib/cloud-images'
import gsap from 'gsap'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames/bind'
import styles from './Hero.module.scss'
import { ButtonRounded } from '@components/ui/Button/Button'

const cx = classNames.bind(styles)

interface Props {
  banner: {
    title: string
    animated_words: Array<string>
    intro: string
    body: string
  }
}

const Hero: React.FC<Props> = ({ banner }) => {
  const { title, animated_words: words } = banner
  const [isOnMobile, setIsOnMobile] = useState(false)

  const largeBlobRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => setIsOnMobile(isMobile), [])

  useEffect(() => {
    const headerTimeline = gsap.timeline()

    headerTimeline.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        duration: 0.4,
        delay: 0.5,
        y: 0,
      }
    )

    headerTimeline.fromTo(
      largeBlobRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
      }
    )

    headerTimeline.fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        y: 30,
        delay: 0.7,
      },
      {
        opacity: 1,
        duration: 0.4,
        y: 0,
      }
    )

    headerTimeline.fromTo(
      buttonRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
      }
    )
  }, [])

  return (
    <section className={cx('home-hero', 'max-width-7 mx-auto')}>
      <div className={cx('home-hero-background')} ref={largeBlobRef}>
        <CustomView condition={!isOnMobile} className={cx('home-hero-background-animation')}>
          <svg viewBox="0 0 699 475" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="gradient">
                <stop offset="0%" style={{ stopColor: '#4BB91E' }} />
                <stop offset="70%" style={{ stopColor: '#56d826' }} />
                <stop offset="100%" style={{ stopColor: '#78ec25' }} />
              </linearGradient>
            </defs>
            <path
              d="M561.696 51C452.487 51 75 55.0464 75 250.612C75 341.352 152.565 424 291.046 424C437.392 424 624 332.752 624 51H561.696Z"
              fill="url(#gradient)"
            />
          </svg>
        </CustomView>
        <CustomView condition={isOnMobile} className={cx('home-hero-background-image')}>
          <Image src={homepageCloud.src} alt="leaf" layout="responsive" width={400} height={300} priority/>
        </CustomView>
      </div>
      <div className={cx('home-hero-content')}>
        <div className={cx('home-hero-title')} ref={titleRef}>
          {title} <br />
          <span>
            <Typewriter
              options={{
                strings: words,
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </div>
        <div
          className={cx('home-hero-subtitle')}
          ref={subtitleRef}
          dangerouslySetInnerHTML={{ __html: banner.intro }}
        ></div>
        <div className={cx('home-hero-button')} ref={buttonRef} data-cursor-type="none">
          <ButtonRounded>
            <Link href="/work" passHref prefetch={false}>
              <a className={cx('leaf-button')}>View our work</a>
            </Link>
          </ButtonRounded>
        </div>
      </div>
      <div className={cx('home-hero-arrows')}>
        <div className={cx('arrow', 'arrow-first')}></div>
        <div className={cx('arrow', 'arrow-second')}></div>
      </div>
    </section>
  )
}

export default Hero
