import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import classNames from 'classnames/bind'
import styles from './ProjectIntro.module.scss'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import ArrowBold from '@components/icons/ArrowBold'
import { Column, Flex } from '@components/ui/Flex'
import Image from 'next/future/image'
gsap.registerPlugin(ScrollTrigger)

const cx = classNames.bind(styles)

interface Props {
  bgColor: string
  textColor: string
  clientLogo: string
  clientUrl: string
  introText: string
  whatWeDid: any
}

const ProjectIntro: React.FC<Props> = ({ bgColor, textColor, clientLogo, clientUrl, introText, whatWeDid }) => {
  const projectIntroRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectIntroRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      leftColRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
      }
    )

    tl.fromTo(
      rightColRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
      },
      '-=0.2'
    )
  }, [])

  return (
    <div
      ref={projectIntroRef}
      className={cx("project-intro", "padding-v-6")}
      style={{ backgroundColor: bgColor, color: textColor === 'light' ? '#fff' : '#000' }}
    >
      <div className={cx("project-intro-inner", "padding-horizontal max-width-5 mx-auto")}>
        <Flex gap='lg'>
          <Column >
            <div className={cx("left-column")} ref={leftColRef}>
              {clientLogo && (
                <div className={cx("client-logo", "margin-b-1")}>
                  <a href={clientUrl} target="_blank" rel="noopener noreferrer">
                    <Image src={clientLogo} width={320} height={250} alt="client-logo" style={{width: '100%', height: 'auto'}} priority/>
                  </a>
                </div>
              )}
            </div>
          </Column>
          <Column width='60%'>
            <div className={cx("right-column")} ref={rightColRef}>
              <div className={cx("project-intro-text", "body-copy")} dangerouslySetInnerHTML={{ __html: introText }}></div>
              {whatWeDid?.length > 0 && (
                <div className={cx("project-intro-what-we-did")}>
                  <h5>What we did:</h5>
                  <div className={cx("project-intro-what-we-did-listing", "body-copy")}>
                    <ul>
                      {whatWeDid.map((item:any, index:number) => (
                        <li key={index} data-cursor-type="none">
                          <Link
                            prefetch={false}
                            passHref
                            href={`/services${item.service_alias}${
                              item.service_item_alias ? item.service_item_alias : ''
                            }`}
                          >
                            <a>
                              <span className={cx("link-icon")}>
                                <ArrowBold color={textColor === 'light' ? '#fff' : '#000'} />
                              </span>
                              {item.title}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </Column>
        </Flex>
      </div>
    </div>
  )
}

export default ProjectIntro
