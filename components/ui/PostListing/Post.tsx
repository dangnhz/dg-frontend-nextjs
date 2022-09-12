import React from 'react'
import Link from 'next/link'
import classNames from 'classnames/bind'
import {PostType} from 'types/post'
import styles from './Post.module.scss'


const cx = classNames.bind(styles)

interface Props {
  post: PostType,
  type: string
  link: string
}


const Post:React.FC<Props> = ({post, link, type}) => {
  return (
    <div className={cx("post" , type , "padding-horizontal padding-b-7")}>
    <div className={cx("wrapper" , "mx-auto max-width-5")}>
      <div className={cx("left")}>
        {post.category && <div className={cx("category")}>{post.category.text}</div>}
        {post.date && <div className={cx("created-at")}>{post.date}</div>}
      </div>
      <div className={cx("right")}>
        <Link href={`/${link}${post.alias ? post.alias : '/'+post.id}`} >
          <a className={cx("title")} data-cursor-type="none"><h2 className="my-0 h3">{post.title}</h2></a>
        </Link>
       {post.shortDescription && <div className={cx("intro")} dangerouslySetInnerHTML={{__html: post.shortDescription}}></div>}
      </div>
    </div>
  </div>
  )
}

export default Post