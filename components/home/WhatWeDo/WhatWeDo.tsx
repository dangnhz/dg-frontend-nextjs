import React from 'react'

import { ServiceCardType } from 'types/service'
import classNames from 'classnames/bind'
import styles from './WhatWeDo.module.scss'
import ServiceCardIconListing from '@components/ui/ServiceCardLIconListing'

const cx = classNames.bind(styles)

interface Props {
  title?: string
  tiles: Array<ServiceCardType>
  backgroundColor?: string,
}

const WhatWeDo: React.FC<Props> = ({ title, tiles, backgroundColor }) => {

  return (
    <section className={cx('what-we-do', 'padding-t-5 padding-b-8 padding-horizontal', backgroundColor)}>
      <div className="max-width-5 mx-auto">
        {title && <h2 className="my-0 text-center homepage-title"> {title} </h2>}
        <div className="margin-t-5">
          <ServiceCardIconListing tiles={tiles}/>
        </div>
      </div>
    </section>
  )
}

export default WhatWeDo
