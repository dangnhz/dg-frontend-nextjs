import React, { useEffect } from 'react'
import { useUI } from '@context/UIContext'
import SEO from '@components/common/SEO'
import PageHeader from '../PageHeader'
import PreFooter from '@components/common/PreFooter'
import classNames from 'classnames/bind'
import styles from './ServiceDetail.module.scss'
import FeatureLeftRightImage from '../FeatureLeftRightImage'
import Container from '../Container'
import ClientListing from '../ClientListing'
import FavoriteTools from '../FavoriteTools'
import OtherServices from '../OtherServices'
import RelatedProjects from '../RelatedProjects'
import AnimationFadeInUp from '@components/common/AnimationFadeInUp';

const cx = classNames.bind(styles)

const ServiceDetail = ({ data }: { data: any }) => {
  const {
    id,
    alias,
    title,
    shortDescription,
    intro,
    animation_type,
    meta,
    body,
    serviceItems,
    featureImages,
    clients,
    favouriteTools,
    otherServices,
    relatedProjects,
  } = data

  const { setCurrentTheme } = useUI()

  const subServices = {
    title: `More about ${title}`,
    serviceItems: serviceItems.items,
    parentAlias: alias,
    parentId: id,
  }

  useEffect(() => {
    setCurrentTheme('blue')
  }, [setCurrentTheme])

  return (
    <>
      <SEO title={meta?.tags.title} description={meta?.tags.description} />

      <PageHeader title={title} subtitle={shortDescription} description={intro} animationType={animation_type} />

      <AnimationFadeInUp animationDelay={2}>
        <div className={cx('service-detail')}>
          <div className={cx('background')}></div>
  
          {body && <FeatureLeftRightImage image={body.image} body={body.text} isSticky subServices={subServices} />}
  
          {featureImages?.length > 0 && (
            <div className="service-feature-images margin-t-10">
              {featureImages.map((item: any, index: number) => (
                <FeatureLeftRightImage
                  key={index}
                  image={item.image}
                  title={item.title}
                  body={item.body}
                  mediaSide={item.mediaSide}
                  gap="xl"
                />
              ))}
            </div>
          )}
  
          {clients?.cards?.length > 0 && (
            <Container maxWidth='max-width-6' padding='padding-horizontal' margin='margin-v-7'>
              <ClientListing clients={clients.cards} title={clients.heading} alignCenter />
            </Container>
          )}
  
          {favouriteTools?.items?.length > 0 && (
            <FavoriteTools tools={favouriteTools.items} title={favouriteTools.heading} alignCenter itemPerRow={4} />
          )}
        </div>
      </AnimationFadeInUp>
      {otherServices?.items?.length > 0 && <OtherServices title={otherServices.heading} tiles={otherServices.items} />}
      {relatedProjects?.items?.length > 0 && (
        <RelatedProjects title={relatedProjects.heading} projects={relatedProjects.items} />
      )}
      <PreFooter />
    </>
  )
}

export default ServiceDetail
