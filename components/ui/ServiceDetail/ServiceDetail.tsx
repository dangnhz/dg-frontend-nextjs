import React, { useEffect } from 'react'
import { useUI } from '@context/UIContext'
import SEO from '@components/common/SEO'
import PageHeader from '../PageHeader'
import PreFooter from '@components/common/PreFooter'
import classNames from 'classnames/bind'
import styles from './ServiceDetail.module.scss'
import FeatureLeftRightImage from '../FeatureLeftRightImage'

const cx = classNames.bind(styles)

const ServiceDetail = ({ data }: { data: any }) => {
  const { id, alias, title, shortDescription, intro, animation_type, meta, body, serviceItems } = data

  const { setCurrentTheme } = useUI()

  const subServices = {
    title: `More about ${title}`,
    serviceItems:serviceItems.items,
    parentAlias: alias,
    parentId: id
  }

  useEffect(() => {
    setCurrentTheme('blue')
  }, [setCurrentTheme])


  return (
    <>
      <SEO title={meta?.tags.title} description={meta?.tags.description} />

      <PageHeader title={title} subtitle={shortDescription} description={intro} animationType={animation_type} />

      <div className={cx("service-detail")}>
        <div className={cx("background")}></div>

        <FeatureLeftRightImage image={body.image} body={body.text} isSticky subServices={subServices}/>
      </div>

      <PreFooter />
    </>
  )
}

export default ServiceDetail
