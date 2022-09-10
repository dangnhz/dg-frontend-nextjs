import React from 'react'
import { Panel } from './Panel'
import classNames from 'classnames/bind'

import styles from './HomePanels.module.scss'

const cx = classNames.bind(styles)

interface Props {
  data: any
}

const HomePanels: React.FC<Props> = ({ data }) => {

  const panelListing = data.map((item: any, index: number) => <Panel data={item} key={index} />)

  return <div className={cx('home-panels', 'margin-b-8')}>{data?.length > 0 && panelListing}</div>
}

export default HomePanels
