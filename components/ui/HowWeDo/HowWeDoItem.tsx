import React from 'react'
import { blueCloud } from '@lib/cloud-images'
import styles from './HowWeDoItem.module.scss'
import Image from 'next/image'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  step: {
    icon: string
    label: string
    field_blurb: string
  }
}

const HowWeDoItem: React.FC<Props> = ({ step }) => {
  return (
    <div className={cx('item')}>
      <div className={cx('images')}>
        <div className={cx('circles')}>{step.icon && <Image src={step.icon} alt={step.label} layout="fill" />}</div>
        <div className={cx('cloud')}>
          <Image src={blueCloud.src} alt={step.label} layout="fill" />
        </div>
      </div>
      <div className={cx('text')}>
        {step.label && <h6 className={cx('title')}>{step.label}</h6>}
        {step.field_blurb && (
          <div className={cx('description')} dangerouslySetInnerHTML={{ __html: step.field_blurb }}></div>
        )}
      </div>
    </div>
  )
}

export default HowWeDoItem
