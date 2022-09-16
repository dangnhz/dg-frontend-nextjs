import React, { useState, useEffect, useRef } from 'react'
import { PostDetailType } from 'types/post'
import { pageCurtainReveal } from '@utils/animations'
import SEO from '@components/common/SEO'
import PreFooter from '@components/common/PreFooter'
import Lottie from 'lottie-react'
import { isMobile, browserName, CustomView } from 'react-device-detect'
import AnimationFadeInUp from '@components/common/AnimationFadeInUp'
import { animationType5 } from '@lib/blob-animations'
import Image from 'next/image'
import { useWindowSize } from 'react-use'
import gsap from 'gsap'
import classNames from 'classnames/bind'
import styles from './PostDetail.module.scss'

const cx = classNames.bind(styles)

const PostDetail: React.FC<PostDetailType> = ({
  post,
  cloudBackground,
  showBlobAnimation,
  blobAnimation,
  blobCloud,
  type,
}) => {
  const [isOnMobile, setIsOnMobile] = useState(false)
  const hasImage = post.image?.length > 0
  const animationRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: blobAnimation || animationType5,
    rendererSettings: {
      preserveAspectRatio: 'xMinYMin meet',
      viewBoxSize: '0 0 400 350',
    },
  }

  useEffect(() => {
    if (post && post.image) {
      gsap.fromTo(
        animationRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          delay: 1,
        }
      )
    }
  }, [post])

  useEffect(() => {
    setIsOnMobile(isMobile)
    pageCurtainReveal()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const cloud = document.querySelector('.js-post-detail-header-animation') as HTMLElement
      if (titleRef.current && cloud) {
        const titleRect = titleRef.current.getBoundingClientRect()
        cloud.style.left = titleRect?.width! - 150 + 'px'
      }
    }, 100)
  }, [width, post])

  return (
    <>
      <SEO
        title={post.meta.tags.title}
        description={post.meta.tags.description || undefined}
        openGraph={{
          type: 'website',
          title: post.title,
          description: post.meta.tags.description || undefined,
          images: [
            {
              url: post.image,
              width: '800',
              height: '600',
              alt: post.title,
            },
          ],
        }}
      />

      <div className="page-inner">
        <article className={cx('post-detail', 'padding-v-10', type, { 'without-image': !hasImage })}>
          <div className={cx('post-detail-wrapper')}>
            <div className={cx('post-detail-header', 'max-width-6 mx-auto padding-horizontal')}>
              {!hasImage && !showBlobAnimation && (
                <div className={cx('post-detail-header-without-image-animation')}>
                  <Image src={cloudBackground?.src} alt="detail-cloud" width={1137} height={1219} priority />
                </div>
              )}
              <div className={cx('post-detail-title-wrapper')}>
                {(hasImage || showBlobAnimation) && (
                  <div ref={animationRef} className={cx('animation-wrapper')}>
                    <CustomView
                      condition={browserName !== 'Safari' && !isOnMobile}
                      className={cx('post-detail-header-animation', 'js-post-detail-header-animation')}
                    >
                      <Lottie {...animationOptions} />
                    </CustomView>
                    <CustomView
                      condition={browserName === 'Safari' || isOnMobile}
                      className={cx('post-detail-header-animation', 'js-post-detail-header-animation', 'cloud-image')}
                    >
                      <Image src={blobCloud?.src} alt="title-cloud" width={240} height={180} />
                    </CustomView>
                  </div>
                )}
                <h2 ref={titleRef} className={cx('post-detail-title', 'my-0')}>
                  {post.title}
                </h2>
              </div>
              <AnimationFadeInUp animationDelay={0.8}>
                {post.category && <div className={cx('post-detail-category')}>{post.category?.text}</div>}
                {post.date && <div className={cx('post-detail-created-at')}>{post.date}</div>}

                {type === 'job-post' && (
                  <>
                    <div className={cx('job-category')}>
                      Job type: <span className={cx('value')}>{post.category}</span>
                    </div>
                    <div className={cx('job-date')}>
                      Close date: <span className={cx('value')}>{post.close_date}</span>
                    </div>
                  </>
                )}
              </AnimationFadeInUp>
            </div>
            <AnimationFadeInUp animationDelay={1.8}>
              <div className={cx('post-detail-main', 'padding-b-10')}>
                <div className={cx('post-detail-main-background')}></div>
                {hasImage && (
                  <div className={cx('post-detail-image')}>
                    <Image src={post.image} alt={post.title} width={1728} height={1112} priority />
                  </div>
                )}
                <div className={cx('post-detail-content', 'max-width-6 padding-horizontal mx-auto')}>
                  {post.author && post.author.name && (
                    <div className={cx('post-detail-content-left')}>
                      <div className={cx('post-detail-author')}>
                        <div className={cx('post-detail-author-avatar')}>
                          {post.author.image && (
                            <div className={cx('author-avatar-animation')}>
                              <Lottie {...animationOptions} />
                            </div>
                          )}
                          {post.author.image && (
                            <Image
                              src={post.author.image}
                              alt={post.author.name}
                              width={180}
                              height={180}
                              layout="responsive"
                            />
                          )}
                          <div className={cx('post-detail-author-name')}>{post.author.name}</div>
                        </div>
                        <div className={cx('post-detail-author-title')}>{post.author.role}</div>
                      </div>
                    </div>
                  )}
                  <div className={cx('post-detail-content-right')}>
                    {post.intro && (
                      <div className={cx('post-detail-intro')} dangerouslySetInnerHTML={{ __html: post.intro }}></div>
                    )}
                    {post.body && (
                      <div
                        className={cx('post-detail-body body-copy')}
                        dangerouslySetInnerHTML={{ __html: post.body }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </AnimationFadeInUp>
          </div>
        </article>
        <PreFooter />
      </div>

      <div className="page-curtain"></div>
    </>
  )
}

export default PostDetail
