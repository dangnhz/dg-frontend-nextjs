import React, { CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames/bind'
import { colors } from '@theme/colors'
import { PersonCardType } from 'types/about'
import styles from './PersonCard.module.scss'

const cx = classNames.bind(styles)

export interface CustomCSS extends CSSProperties {
  '--hover-color': string
}



export interface PersonCardProps {
  data: PersonCardType
  hoverColor?: string
}

const PersonCard: React.FC<PersonCardProps> = ({ data, hoverColor = colors.purple }) => {
  const { image, name, id, alias, description, role} = data

  return (
    <Link
      passHref
      href={`/about${alias ? alias : '/' + id}`}
    >
      <a
        className={cx('card')}
        style={{ '--hover-color': hoverColor} as CustomCSS}
      >
        <div className={cx('wrapper')}>
          <div className={cx('overlay')}></div>
          <div className={cx('image')}>
            <Image src={image} alt={name} layout="responsive" width={566} height={566} />
          </div>
          <div className={cx('info')}>
            {role && <div className={cx('role')}>{role}</div>}
            <h3 className={cx('title')}>{name}</h3>
            {description && (
              <div className={cx('description')} dangerouslySetInnerHTML={{ __html: description }}></div>
            )}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PersonCard
