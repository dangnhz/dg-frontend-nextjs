import React from 'react'
import Link from 'next/link'
import ArrowRight from '@components/icons/ArrowRight'
import { ServiceCardType } from 'types/service'
import classNames from 'classnames/bind'
import styles from './ServiceCardIcon.module.scss'
import Image from 'next/image'

const cx = classNames.bind(styles)


const ServiceCardIcon: React.FC<ServiceCardType> = ({
  id,
  alias,
  icon,
  cloud,
  title,
  description,
  isActive,
  extraClass = '',
}) => {
  return (
    <div className={cx('services-card', { active: isActive }, extraClass)}>
      <Link passHref href={`/services${alias ? alias : '/' + id}`}>
        <a className={cx('services-card-wrapper')}>
          <div className={cx('services-card-top')}>
            <div className={cx('services-card-cloud')}>
              <Image src={cloud} alt={title} width={200} height={180} />
            </div>
            <div className={cx('services-card-icon')}>
              <Image src={icon} alt="service-icon" width="100" height="100" />
            </div>
          </div>
          <div className={cx('services-card-title')}>
            <h2>
              {title} <ArrowRight />
            </h2>
          </div>
          {description && <div className={cx('services-card-description')} dangerouslySetInnerHTML={{ __html: description }}></div>}
        </a>
      </Link>
    </div>
  )
}

export default ServiceCardIcon
