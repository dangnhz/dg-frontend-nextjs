import React from 'react'
import FeatureImageBottom from './FeatureImageBottom'
import FeatureImageFullWidth from './FeatureImageFullWidth'
import FeatureLeftRightImage from './FeatureLeftRightImage'

interface Props {
  title?: string
  body?: string
  image: string
  mediaSide?: string
  bgColor?: string
  textColor?: string
  isSticky?: boolean
}

const FeatureImage: React.FC<Props> = ({ title, body, image, mediaSide, bgColor, textColor, isSticky }) => {
  if (!title && !body && !mediaSide) {
    return <FeatureImageFullWidth image={image} />
  }

  if (mediaSide === 'media-bottom' || mediaSide === 'media-bottom-right') {
    return <FeatureImageBottom title={title} body={body} image={image} mediaSide={mediaSide} bgColor={bgColor} textColor={textColor}/>
  }
  return (
    <FeatureLeftRightImage
      image={image}
      title={title}
      body={body}
      mediaSide={mediaSide}
      gap="xl"
      bgColor={bgColor}
      textColor={textColor}
      isSticky={isSticky}
    />
  )
}

export default FeatureImage
