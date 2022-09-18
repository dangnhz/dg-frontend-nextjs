import React from 'react'
import cx from 'classnames'

interface Props {
    margin?: string
    padding?: string
    maxWidth?: string
    extraClasses?: string
    children: React.ReactNode
}

const Container:React.FC<Props> = ({children, margin, padding, maxWidth, extraClasses}) => {
  return (
    <div className={cx(margin, padding, extraClasses)}>
        <div className={cx('container', maxWidth)}>{children}</div>
    </div>
  )
}

export default Container