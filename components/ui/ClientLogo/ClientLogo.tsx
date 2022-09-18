import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ClientType } from 'types/client'
import classNames from 'classnames/bind'
import styles from './ClientLogo.module.scss'

const cx = classNames.bind(styles)


export const ClientLogo: React.FC<ClientType> = ({ logo, project, external_link }) => {
  const {id: projectId, alias: projectAlias} = project
  return (
    <>
      {external_link && !projectId && (
        <a href={external_link} target="_blank" rel="noopener noreferrer">
          <div className={cx('client-logo', 'clickable')}>
            <Image src={logo} alt="client logo" width={185} height={121} layout="responsive"/>
          </div>
        </a>
      )}

      {projectId && (
        <Link href={`/work${projectAlias ? projectAlias : '/' + projectId}`} passHref>
          <a className={cx('client-logo', 'clickable')} aria-label={projectAlias.replace('/', '')} href="">
            <Image src={logo} alt="client logo" width={185} height={121} layout="responsive" />
          </a>
        </Link>
      )}

      {!projectId && !external_link && (
        <div className={cx('client-logo')}>
          <Image src={logo} alt="client logo" width={185} height={121} layout="responsive"/>
        </div>
      )}
    </>
  )
}
