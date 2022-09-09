import React from 'react'
import classNames from 'classnames/bind'
import styles from './Grid.module.scss'


const cx = classNames.bind(styles)

interface Props {
    className?: string,
    children: React.ReactNode
}

const Grid:React.FC<Props> = ({children, className}) => {
  return (
    <div className={cx('grid', className)}>{children}</div>
  )
}

export default Grid