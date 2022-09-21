import React from 'react'
import styles from './ProjectBreakout.module.scss'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/future/image'
import { Column, Flex } from '@components/ui/Flex'
import classNames from 'classnames/bind'

gsap.registerPlugin(ScrollTrigger)

const cx = classNames.bind(styles)
interface Props {
  bgColor: string
  textColor: string
  heading: string
  body: string
  image: string
}

const ProjectBreakout: React.FC<Props> = ({ bgColor, textColor, heading, body, image }) => {

  return (
    <div className={cx('project-breakout', 'padding-horizontal margin-v-7')} >
      <div className={cx('project-breakout-background')} style={{ backgroundColor: bgColor }}></div>
      <div className={cx('project-breakout-inner max-width-5 mx-auto')}>
        <Flex alignItems="center" gap="xl">
          <Column width="30%">
            <div className={cx('left-column')}>
              <div className="body-copy">
                <div
                  className={cx('project-breakout-content')}
                  style={{ color: textColor === 'light' ? '#fff' : '#000' }}
                >
                  <h3 className={cx('project-breakout-heading')}>{heading}</h3>
                  <div className={cx('project-breakout-body')} dangerouslySetInnerHTML={{ __html: body }}></div>
                </div>
              </div>
            </div>
          </Column>
          <Column>
            <div className={cx('right-column')}>
              {image && (
                <div className="project-breakout-image">
                  <Image src={image} alt="project-breakout" width={950} height={660} style={{width: '100%', height: 'auto'}} />
                </div>
              )}
            </div>
          </Column>
        </Flex>
      </div>
    </div>
  )
}

export default ProjectBreakout
