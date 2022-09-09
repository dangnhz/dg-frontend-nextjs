import React, { useEffect, useRef } from 'react'
import Typewriter from 'typewriter-effect'
import { isMobile, CustomView } from 'react-device-detect'
import { homepageCloud } from '@lib/cloud-images'
import gsap from 'gsap'
import Link from 'next/link'
import classNames from 'classnames/bind'
import styles from './HomeHero.module.scss'

const cx = classNames.bind(styles)

interface Props {
  banner: {
    title: string
    animated_words: Array<string>
    intro: string
    body: string
  }
}

const HomeHero: React.FC<Props> = ({ banner }) => {
  const { title, animated_words: words } = banner

  const largeBlobRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headerTimeline = gsap.timeline()

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
        <CustomView condition={!isMobile} className={cx('home-hero-background-animation')}>
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
        <CustomView condition={isMobile} className={cx('home-hero-background-image')}>
          <img src={homepageCloud.src} alt="hero-banner" />
        </CustomView>
      </div>
      <div className={cx('home-hero-content')}>
        <div className={cx('home-hero-title')}>
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
          <Link href="/work" passHref>
            <a className={cx('leaf-button')}>View our work</a>
          </Link>
        </div>
      </div>
      <div className={cx('home-hero-arrows')}>
        <div className={cx('arrow ', 'arrow-first')}></div>
        <div className={cx('arrow', 'arrow-second')}></div>
      </div>
    </section>
  )
}

export default HomeHero
