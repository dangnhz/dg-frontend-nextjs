import React from 'react'
import Link from 'next/link'
import ArrowRight from '@components/icons/ArrowRight'
import classNames from 'classnames/bind'
import styles from './ServiceCardIcon.module.scss'

const cx = classNames.bind(styles)

export interface ServiceCardProps {
  id: string
  alias: string
  icon: string
  cloud: string
  title: string
  description: string
  isActive: boolean
  extraClass: string
}

const ServiceCardIcon: React.FC<ServiceCardProps> = ({
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
              <img src={cloud} alt={title} width={200} height={180} />
            </div>
            <div className={cx('services-card-icon')}>
              <img src={icon} alt="service-icon" width="100" height="100" />
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
