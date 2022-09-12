import React, { CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames/bind'
import { colors } from '@theme/colors'
import { ProjectCardType } from 'types/project'
import styles from './ProjectCard.module.scss'

const cx = classNames.bind(styles)

export interface CustomCSS extends CSSProperties {
  '--hover-color': string
  '--text-color': string
}



export interface ProjectCardProps {
  data: ProjectCardType
  hoverColor: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data, hoverColor = colors.green }) => {
  const { image, title, id, alias, shortDescription, clientName, thumbnailColor, isGated } = data

  return (
    <Link
      passHref
      href={{
        pathname: `${isGated ? '/gated' : '/work'}${alias}`,
        query: { curtainColor: hoverColor, projectId: id, isGated: isGated },
      }}
      as={`${isGated ? '/gated' : '/work'}${alias}`}
    >
      <a
        className={cx('card', 'zoom-in')}
        style={{ '--hover-color': hoverColor, '--text-color': thumbnailColor || '#fff' } as CustomCSS}
      >
        <div className={cx('wrapper')}>
          <div className={cx('overlay')}></div>
          <div className={cx('image')}>
            <Image src={image} alt={title} layout="responsive" width={566} height={566} />
          </div>
          <div className={cx('info')}>
            {clientName && <div className={cx('category')}>{clientName}</div>}
            <h3 className={cx('title')}>{title}</h3>
            {shortDescription && (
              <div className={cx('description')} dangerouslySetInnerHTML={{ __html: shortDescription }}></div>
            )}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProjectCard
