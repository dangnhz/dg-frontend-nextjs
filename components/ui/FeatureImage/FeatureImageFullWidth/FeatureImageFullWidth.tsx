import Image from 'next/image'
import React from 'react'
import classNames from 'classnames/bind'
import styles from './FeatureImageFullWidth.module.scss'

const cx = classNames.bind(styles)

const FeatureImageBottom = ({image}: {image: string}) => {
  return (
    <div className="margin-v-10">
       <div className={cx("image")}>
            <Image src={image} alt='digital garden' width={1920} height={1080} layout="responsive"/>
          </div>
    </div>
  )
}

export default FeatureImageBottom