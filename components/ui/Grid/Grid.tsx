import React from 'react'
import classNames from 'classnames/bind'
import styles from './Grid.module.scss'
import {CSSProperties} from 'react';


const cx = classNames.bind(styles)

interface CustomCSS extends CSSProperties {
  '--item-per-row': number
}
interface Props {
    className?: string,
    alignCenter?: boolean,
    itemPerRow?: number
    children: React.ReactNode
}

const Grid:React.FC<Props> = ({children, className, alignCenter, itemPerRow}) => {
  return (
    <div className={cx('grid', className, {'align-center': alignCenter})} style={{'--item-per-row': itemPerRow} as CustomCSS}>{children}</div>
  )
}

export default Grid