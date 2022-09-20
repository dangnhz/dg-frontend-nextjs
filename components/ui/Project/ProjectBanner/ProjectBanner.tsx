import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import classNames from 'classnames/bind'
import styles from './ProjectBanner.module.scss'

const cx = classNames.bind(styles)

interface Props {
  title: string
  titleColor: string
  buttonBgColor: string
  buttonText: string
  buttonTextColor: string
  image: string
  buttonLink: string
}

const ProjectBanner: React.FC<Props> = ({
  title,
  titleColor,
  buttonBgColor,
  buttonText,
  buttonTextColor,
  image,
  buttonLink,
}) => {
  const bannerButtonRef = useRef<HTMLDivElement>(null)
  const bannerTitleRef = useRef<HTMLDivElement>(null)
  const bannerImageRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      bannerTitleRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        duration: 0.4,
        opacity: 1,
        delay: 1.6,
      }
    )

    tl.fromTo(
      bannerButtonRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        duration: 0.4,
        y: 0,
        opacity: 1,
      }
    )
  }, [title])

  useEffect(() => {
    bannerRef.current?.addEventListener('mousemove', (e) => {
      const background = bannerImageRef.current
      const backgroundWidth = background?.getBoundingClientRect().width
      const backgroundHeight = background?.getBoundingClientRect().height
      const mouseX = e.clientX
      const mouseY = e.clientY

      if (backgroundWidth && backgroundHeight) {
        let dx = backgroundWidth / 2 - mouseX
        let dy = backgroundHeight / 2 - mouseY
        gsap.to(background, {
          x: dx * 0.04,
          y: dy * 0.04,
          duration: 2,
          scale: 1.05,
        })
      }
    })
  }, [])

  return (
    <div className={cx('project-banner')} ref={bannerRef}>
      <div className={cx('background')}>
        <div className={cx('background-image')} ref={bannerImageRef} style={{ backgroundImage: `url(${image})` }}></div>
      </div>
      <div className={cx("content-wrapper" , "max-width-5 mx-auto")}>
        <div className={cx("content", "margin-horizontal max-width-5")}>
          <div ref={bannerTitleRef}>
            <h1 className={cx("title")} style={{ color: titleColor === 'light' ? '#fff' : '#000' }}>
              {title}
            </h1>
          </div>
          <div ref={bannerButtonRef}>
            {buttonText && (
              <a
                target="_blank"
                className={cx("button")}
                style={{ backgroundColor: buttonBgColor, color: buttonTextColor === 'light' ? '#fff' : '#000' }}
                href={buttonLink}
                rel="noreferrer"
              >
                <span data-cursor-type="none">{buttonText}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectBanner
