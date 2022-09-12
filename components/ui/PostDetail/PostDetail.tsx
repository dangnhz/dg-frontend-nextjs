import React, {useEffect} from 'react'
import {PostDetailType} from 'types/post'
import { pageCurtainReveal } from '@utils/animations'
import classNames from 'classnames/bind'
import styles from './PostDetail.module.scss'
import SEO from '@components/common/SEO'
import PreFooter from '@components/common/PreFooter'

const cx = classNames.bind(styles)

const PostDetail:React.FC<PostDetailType> = ({post}) => {

  useEffect(() => {
    pageCurtainReveal();
  }, [])
  return (
    <>
       <SEO
        title={post.meta.tags.title}
        description={post.meta.tags.description ||  undefined}
        openGraph={{
          type: 'website',
          title: 'test',
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

        <article className={cx("post-detail", "padding-v-10", {'without-image': !post.image})}>

        </article>

    <PreFooter />
    </div>
    
    <div className="page-curtain"></div>
    </>
  )
}

export default PostDetail