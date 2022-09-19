import React from 'react'
import FeatureImageBottom from './FeatureImageBottom'
import FeatureImageFullWidth from './FeatureImageFullWidth'
import FeatureLeftRightImage from './FeatureLeftRightImage'

interface Props {
  title?: string
  body?: string
  image: string
  mediaWidth?: string
  gap?:string
  mediaSide?: string
  bgColor?: string
  textColor?: string
  isSticky?: boolean
}

const FeatureImage: React.FC<Props> = ({ title, body, image, mediaWidth, mediaSide, gap="xl",  bgColor, textColor, isSticky }) => {
  if (!title && !body && !mediaSide) {
    return <FeatureImageFullWidth image={image} />
  }

  if (mediaSide === 'media-bottom' || mediaSide === 'media-bottom-right') {
    return <FeatureImageBottom title={title} body={body} image={image} mediaSide={mediaSide} bgColor={bgColor} textColor={textColor}/>
  }
  return (
    <FeatureLeftRightImage
      mediaWidth={mediaWidth}
      image={image}
      title={title}
      body={body}
      mediaSide={mediaSide}
      gap={gap}
      bgColor={bgColor}
      textColor={textColor}
      isContentSticky={isSticky}
      mobileContentOnTop
    />
  )
}

export default FeatureImage
