import React from 'react'
import classNames from 'classnames/bind'
import styles from './AboutListing.module.scss'
import AnimationFadeInUp from '@components/common/AnimationFadeInUp'
import FeatureLeftRightImage from '../FeatureImage/FeatureLeftRightImage'
import { PersonCardType } from 'types/about'
import Grid from '../Grid'
import PersonCard from '../PersonCard/PersonCard'

const cx = classNames.bind(styles)

interface Props {
  intro: {
    image: string
    text: string
  }
  teamData: Array<PersonCardType>
}

const AboutListing: React.FC<Props> = ({ intro, teamData }) => {
  return (
    <>
      <AnimationFadeInUp animationDelay={2}>
        <div className={cx('about-listing')}>
          <div className={cx('background')}></div>
          <FeatureLeftRightImage image={intro.image} body={intro.text} animation/>
          <div className={cx('team-listing', 'padding-horizontal')}>
            <div className="max-width-5 mx-auto">
              <h3 className="text-center">Our team</h3>
              <div className="margin-t-5">
                <Grid>
                  {teamData?.map((item) => (
                    <PersonCard key={item.id} data={item} />
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </AnimationFadeInUp>
    </>
  )
}

export default AboutListing
