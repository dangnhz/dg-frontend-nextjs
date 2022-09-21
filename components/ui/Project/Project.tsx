import SEO from '@components/common/SEO'
import React, { useEffect, useState, CSSProperties } from 'react'
import { colors } from '@theme/colors'
import { useUI } from '@context/UIContext'
import { useRouter } from 'next/router'
import PreFooter from '@components/common/PreFooter'
import { pageCurtainReveal } from '@utils/animations'

import ProjectBanner from './ProjectBanner'
import ProjectIntro from './ProjectIntro'
import FeatureImage from '../FeatureImage'
import RelatedProjects from '../RelatedProjects'
import ProjectBody from './ProjectBody'
import ProjectSlider from './ProjectSlider'
import ProjectMosaic from './ProjectMosaic'
import ProjectBreakout from './ProjectBreakout'
import ProjectResult from './ProjectResult/ProjectResult'

export interface CustomCSS extends CSSProperties {
  '--project-primary-color': string;
  '--project-secondary-color':string
}



const Project = ({ data:project }: any) => {
  const [curtainColor, setCurtainColor] = useState<any>(colors.pink)
  const {setCurrentTheme } = useUI()
  const router = useRouter()

  const meta = project?.meta

  useEffect(() => {
    setCurrentTheme('pink')
  }, [setCurrentTheme])

  useEffect(() => {
    const color = router.query.curtainColor

    if (color) {
      setCurtainColor(color)
    }
  }, [router])

  useEffect(() => {
    pageCurtainReveal()
  }, [])

  return (
    <>
      <SEO
        title={meta?.tags?.title}
        description={meta?.tags?.description || undefined}
        openGraph={{
          type: 'website',
          title: meta?.tags?.title,
          description: meta?.tags?.description || undefined,
          images: [
            {
              url: project?.projectBanner?.image,
              width: '800',
              height: '600',
              alt: meta?.tags?.title,
            },
          ],
        }}
      />
      <div className="page-inner">
      <div className="project-detail" style={{ '--project-primary-color': project?.primaryColor, '--project-secondary-color': project?.secondaryColor } as CustomCSS }>
								<ProjectBanner {...project.projectBanner} />
								{typeof project.projectIntro === 'object' && project.projectIntro !== null && !Array.isArray(project.projectIntro) && (
									<ProjectIntro {...project.projectIntro} />
								)}
								{project.projectSliderImages?.length > 0 && (
									<ProjectSlider projectSliderImages={project.projectSliderImages} buttonColor={project.secondaryColor} />
								)}
								{typeof project.projectBodyCopy === 'object' && project.projectBodyCopy !== null && !Array.isArray(project.projectBodyCopy) && (
									<ProjectBody {...project.projectBodyCopy} />
								)}
								{typeof project.projectMosaic === 'object' && project.projectMosaic !== null && !Array.isArray(project.projectMosaic) && (
									<ProjectMosaic {...project.projectMosaic} />
								)}
								{typeof project.projectBreakout === 'object' && project.projectBreakout !== null && !Array.isArray(project.projectBreakout) && (
									<ProjectBreakout {...project.projectBreakout} />
								)}
								{project.projectFeatureImages?.length > 0 && (
									<div className="project-feature-images">
										{project.projectFeatureImages.map((item:any, index:number) => (
											<FeatureImage
                      key={index}
                      image={item.image}
                      title={item.title}
                      body={item.body}
                      mediaSide={item.mediaSide}
                      mediaWidth="50%"
                      bgColor={item.bgColor}
                      textColor={item.textColor}
                      isSticky={item.isSticky}
                      />
										))}
                    
									</div>
								)}
								{typeof project.projectResults === 'object' && project.projectResults !== null && !Array.isArray(project.projectResults) && (
									<ProjectResult {...project.projectResults} />
								)}
								{project.relatedProjects?.length > 0 && (
                  <RelatedProjects title="Related projects" projects={project.relatedProjects} />
								)}
							</div>
      </div>

      <PreFooter />
      <div className="page-curtain" style={{ backgroundColor: curtainColor }}></div>
    </>
  )
}

export default Project


