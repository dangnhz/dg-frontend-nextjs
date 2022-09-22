import React from 'react'
import Link from 'next/link'

import styles from './ServicesItem.module.scss'
import SubServiceList from '../SubServiceList'
import Image from 'next/future/image'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const ServicesItem = ({ data }: { data: any }) => {
  const { id, alias, title, icon, shortDescription, longDescription, serviceItems } = data

  return (
    <div className={cx('services-item')}>
      <div className={cx('wrapper')}>
        {icon && (
          <div className={cx('icon', 'margin-b-2')}>
            <Image src={icon} alt={title} width={80} height={80} />
          </div>
        )}
        <div className={cx('title')}>
          <Link href={`/services${alias ? alias : '/' + id}`} passHref prefetch={false}>
            <a>
              <h2>{title}</h2>
            </a>
          </Link>
        </div>
        <div
          className={cx('short-description', 'margin-t-2')}
          dangerouslySetInnerHTML={{ __html: shortDescription }}
        ></div>
        <div className={cx('description', 'margin-v-1')} dangerouslySetInnerHTML={{ __html: longDescription }}></div>
        <div className={cx('sub-service')}>
          <SubServiceList serviceItems={serviceItems} parentAlias={alias} parentId={id} />
        </div>
        <div className={cx('button', 'margin-t-3')} data-cursor-type="none">
          <Link href={`/services${alias ? alias : '/' + id}`} passHref prefetch={false}>
            <a className={cx('my-0', 'button-link')}>
              <span>Learn more </span>
              <span className={cx('btn-service-title')}>about {title}</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ServicesItem
