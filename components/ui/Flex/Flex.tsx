import React from 'react'
import classNames from 'classnames/bind'
import styles from './Flex.module.scss'

const cx = classNames.bind(styles)

interface Props {
  mobileContentOnTop?:boolean,
  direction?: string
  alignItems?: string
  justify?: string
  gap?: string
  children: React.ReactNode
}
const Flex: React.FC<Props> = ({ children, mobileContentOnTop, direction, alignItems, justify, gap }) => {
  const classes = cx(
    'flex',
    direction,
    {'mobile-content-on-top': mobileContentOnTop},
    { [`align-${alignItems}`]: alignItems },
    { [`justify-${justify}`]: justify },
    { [`gap-${gap}`]: gap }
  )
  return <div className={classes}>{children}</div>
}

export default Flex
