import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames/bind'
import styles from './ClientLogo.module.scss'

const cx = classNames.bind(styles)

interface Props {
  logo: string
  projectId: string
  projectAlias: string
  externalLink: string
}

export const ClientLogo: React.FC<Props> = ({ logo, projectId, projectAlias, externalLink }) => {
  return (
    <>
      {externalLink && !projectId && (
        <a href={externalLink} target="_blank" rel="noopener noreferrer">
          <div className={cx('client-logo')}>
            <Image src={logo} alt="client logo" width={185} height={121}/>
          </div>
        </a>
      )}

      {projectId && (
        <Link href={`/work${projectAlias ? projectAlias : '/' + projectId}`} passHref>
          <a className={cx('client-logo')} aria-label={projectAlias.replace('/', '')} href="">
            <Image src={logo} alt="client logo" width={185} height={121}  />
          </a>
        </Link>
      )}

      {!projectId && !externalLink && (
        <div className={cx('client-logo')}>
          <Image src={logo} alt="client logo" width={185} height={121} />
        </div>
      )}
    </>
  )
}
