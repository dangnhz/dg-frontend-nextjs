import React from 'react'
import styles from './ProjectResult.module.scss'

import Image from 'next/future/image'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const ResultIntro = ({ intro }: { intro: string }) => {
  return (
    <div className={cx('project-result-intro')}>
      <div className="body-copy" dangerouslySetInnerHTML={{ __html: intro }}></div>
    </div>
  )
}

const ResultImage = ({ image }: { image: string }) => {
  return (
    <div className={cx('image-wrapper')}>
      <Image src={image} alt="result" width={500} height={800} />
    </div>
  )
}

const ResultStats = ({ stats }: any) => {
  return (
    <div className={cx('project-results-stats')}>
      {stats?.length > 0 &&
        stats.map((item: any, index: number) => (
          <div className={cx('stats-item', 'padding-v-3')} key={index}>
            <div className={cx('stats-item-heading')}>
              <h5 dangerouslySetInnerHTML={{ __html: item.statsHeading }}></h5>
            </div>
            <div className={cx('stats-item-number')}>
              <h2> {item.statsNumber}</h2>
            </div>
          </div>
        ))}
    </div>
  )
}

const ResultImpactStatement = ({ impactStatement }: { impactStatement: string }) => {
  return (
    <div className={cx('project-results-impact-statement', 'padding-v-2')}>
      <h2>{impactStatement}</h2>
    </div>
  )
}

const ResultTestimonial = ({ testimonial }: any) => {
  return (
    <div className={cx('project-results-testimonial')}>
      <div className={cx('quote')} dangerouslySetInnerHTML={{ __html: testimonial.quote }}></div>
      <div className={cx('author')}>
        <div className="body-copy margin-t-1">{testimonial.author ? testimonial.author : ''}</div>
      </div>
    </div>
  )
}

const ResultGraph = ({ graph }: { graph: string }) => {
  return (
    <div className={cx('project-results-graph')}>
      <Image src={graph} alt="project-results-graph" width={500} height={500} />
    </div>
  )
}

const ProjectResultsFull = ({ bgColor, heading, intro, image, stats, impactStatement, testimonial, graph }: any) => {
  return (
    <div
      className={cx('project-result', 'padding-horizontal padding-t-7 padding-b-10 margin-v-7')}
      style={{ backgroundColor: bgColor }}
    >
      <div className={cx('project-result-inner', 'max-width-5 mx-auto')}>
        <div className={cx('project-results-top')}>
          <div className={cx('two-columns-layout')}>
            <div className={cx('left-column')}>
              <h2 className={cx('project-result-heading')}>{heading}</h2>
            </div>

            <div className={cx('right-column')}>{intro && <ResultIntro intro={intro} />}</div>
          </div>
        </div>
        <div className={cx('project-results-middle')}>
          <div className={cx('two-columns-layout')}>
            <div className={cx('left-column')}>{image && <ResultImage image={image} />}</div>

            <div className={cx('right-column')}>
              {stats?.length > 0 && <ResultStats stats={stats} />}
              {impactStatement && <ResultImpactStatement impactStatement={impactStatement} />}
            </div>
          </div>
        </div>
        <div className={cx('project-results-bottom')}>
          <div className={cx('two-columns-layout')}>
            <div className={cx('right-column')}>
              {testimonial && testimonial.quote && <ResultTestimonial testimonial={testimonial} />}
            </div>

            <div className={cx('left-column')}>{graph && <ResultGraph graph={graph} />}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProjectResultsNoGraph = ({ bgColor, heading, intro, image, stats, impactStatement, testimonial }: any) => {
  return (
    <div
      className={cx(
        'project-result',
        'project-result--no-graph',
        'padding-horizontal padding-t-7 padding-b-7 margin-v-7'
      )}
      style={{ backgroundColor: bgColor }}
    >
      <div className={cx('project-result-inner', 'max-width-5 mx-auto')}>
        <div className={cx('project-results-top')}>
          <div className={cx('two-columns-layout')}>
            <div className={cx('left-column')}>
              <h2 className="project-result-heading">{heading}</h2>
              {image && <ResultImage image={image} />}
            </div>
            <div className={cx('right-column')}>
              {testimonial && testimonial.quote && <ResultTestimonial testimonial={testimonial} />}

              {intro && <ResultIntro intro={intro} />}

              {stats?.length > 0 && <ResultStats stats={stats} />}

              {impactStatement && <ResultImpactStatement impactStatement={impactStatement} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProjectResults = (props: any) => {
  if (!props.graph) return <ProjectResultsNoGraph {...props} />

  return <ProjectResultsFull {...props} />
}

export default ProjectResults
