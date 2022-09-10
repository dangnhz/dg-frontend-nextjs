import { ClientLogo } from '@components/Clients'
import Link from 'next/link'
import { ButtonRounded } from '@components/ui/Button/Button'
import React from 'react'
import classNames from 'classnames/bind'
import styles from './HomeClients.module.scss'

const cx = classNames.bind(styles)

import Grid from '@components/ui/Grid'

interface Props {
  title: string
  cards: any
  link: any
}

const clientTextIntro =
  '<p>Digital Garden has worked with clients across every sector in corporate, government and not-for-profit.</p>'

const HomeClients: React.FC<Props> = ({ title, cards: clientsData, link }) => {
  const clientListing = clientsData.map((item: any, index: number) => (
    <ClientLogo
      logo={item.logo}
      projectId={item.project.id}
      externalLink={item.external_link}
      projectAlias={item.project.alias}
      key={item.id || index}
    />
  ))

  return (
    <section className={cx('home-clients', 'max-width-5 mx-auto padding-horizontal padding-b-8')}>
      <h3 className="my-0 text-center homepage-title">{title}</h3>
      <div className={cx('home-clients-info')}>
        <div className={cx('home-clients-subtitle')}>
          <p>Some of Australia's biggest names.</p>
        </div>
        <div className={cx('home-clients-intro')} dangerouslySetInnerHTML={{ __html: clientTextIntro }}></div>
      </div>

      <Grid className="grid-clients">{clientsData?.length > 0 && clientListing}</Grid>

      <ButtonRounded>
        <Link href="/clients">
          <a>{link.title || 'View more'}</a>
        </Link>
      </ButtonRounded>
    </section>
  )
}

export default HomeClients
