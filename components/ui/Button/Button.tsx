import Link from 'next/link'
import React from 'react'
import classNames from 'classnames/bind'

import styles from './Button.module.scss'

const cx = classNames.bind(styles)

interface ButtonRoundedProps {
    color?: string
    hoverColor?: string
    children?: React.ReactNode
}

interface ButtonLinkProps {
  href: string
  color?: string
  hoverColor?: string
  text?: string,
  children?: React.ReactNode
}

export const ButtonRounded:React.FC<ButtonRoundedProps> = ({ children, color = 'green', hoverColor }) => {
  return <div className={cx('button-rounded', color, { [`hover-${hoverColor}`]: hoverColor })}>{children}</div>
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ href, color = 'green', hoverColor, text }) => {
  return (
    <Link href={href} passHref prefetch={false}>
      <a className={cx('button-link', color, { [`hover-${hoverColor}`]: hoverColor })} data-cursor-type="none">
        {text}
      </a>
    </Link>
  )
}
