import React, { useEffect } from 'react'
import { useUI } from '@context/UIContext'
import SEO from '@components/common/SEO'
import PageHeader from '../PageHeader'
import PreFooter from '@components/common/PreFooter'
import classNames from 'classnames/bind'
import styles from './ServiceDetail.module.scss'
import FeatureLeftRightImage from '../FeatureImage/FeatureLeftRightImage'
import Container from '../Container'
import ClientListing from '../ClientListing'
import FavoriteTools from '../FavoriteTools'
import OtherServices from '../OtherServices'
import RelatedProjects from '../RelatedProjects'
import AnimationFadeInUp from '@components/common/AnimationFadeInUp'
import FeatureImage from '../FeatureImage'

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
    serviceItems: serviceItems?.items.filter((item: { link: object }) => item.link != null),
    parentAlias: alias,
    parentId: id,
  }

  useEffect(() => {
    setCurrentTheme('blue')
  }, [setCurrentTheme])

  return (
    <>
      <SEO
        title={meta?.tags?.title}
        description={meta?.tags.description}
        openGraph={{
          type: 'website',
          title: meta?.tags?.title,
          description: meta?.tags?.description || undefined,
        }}
      />

      <PageHeader
        title={title}
        subtitle={shortDescription}
        description={intro}
        animationType={animation_type || 'type4'}
      />

      <AnimationFadeInUp animationDelay={2}>
        <div className={cx('service-detail')}>
          <div className={cx('background')}></div>

          {body && (
            <FeatureLeftRightImage
              image={body.image}
              body={body.text}
              isImageSticky
              subServices={subServices}
              animation
            />
          )}

          {featureImages?.length > 0 && (
            <div className="service-feature-images margin-t-10">
              {featureImages.map((item: any, index: number) => (
                <FeatureImage
                  key={index}
                  image={item.image}
                  title={item.title}
                  body={item.body}
                  mediaSide={item.mediaSide}
                  bgColor={item.bgColor}
                  textColor={item.textColor}
                  isSticky={item.isSticky}
                />
              ))}
            </div>
          )}

          {clients?.cards?.length > 0 && (
            <Container maxWidth="max-width-6" padding="padding-horizontal" margin="margin-v-7">
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
