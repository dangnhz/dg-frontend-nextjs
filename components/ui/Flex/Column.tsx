import React, { CSSProperties } from 'react'
import classNames from 'classnames/bind'
import styles from './Column.module.scss'

const cx = classNames.bind(styles)

export interface CustomCSS extends CSSProperties {
  '--col-width': string
}

interface Props {
  className?: string,
  width?: string
  children?: React.ReactNode
}

const Column: React.FC<Props> = ({ children, className, width }) => {
  return (
    <div className={cx('column', className, { 'flex-1': !width })} style={{ '--col-width': width } as CustomCSS}>
      {children}
    </div>
  )
}

export default Column
