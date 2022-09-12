import React from 'react'
import Grid from '@components/ui/Grid'
import { colors } from '@theme/colors'
import classNames from 'classnames/bind'
import ProjectCard from '@components/ui/ProjectCard'
import { ProjectCardType } from 'types/project'
import styles from './ProjectListing.module.scss'

const cx = classNames.bind(styles)

interface Props {
  title: string
  subtitle: string
  projects: Array<ProjectCardType>
  intro: string
}

const ProjectListing: React.FC<Props> = ({ title, subtitle, projects, intro }) => {
  return (
    <section className={cx('home-project-listing', 'padding-v-7')}>
      <div className={cx('home-project-listing-wrapper')}>
        <div className="padding-horizontal">
          <div className="container max-width-6">
            <Grid>{projects?.length > 0 && projects.map((item) => <ProjectCard key={item.id} data={item} hoverColor={colors.green}/>)}</Grid>
          </div>
        </div>
        <div className="padding-horizontal margin-t-5">
          <div className="container max-width-5">
            <h2 className="text-center homepage-title">{title}</h2>
            <div className={cx('home-project-listing-info')}>
              <div className={cx('home-project-listing-subtitle')}>
                <p>{subtitle}</p>
              </div>
              <div className={cx('home-project-listing-intro')} dangerouslySetInnerHTML={{ __html: intro }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectListing
