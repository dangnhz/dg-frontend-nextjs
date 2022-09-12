import React from 'react'
import classNames from 'classnames/bind'
import styles from './NoJobPost.module.scss'

const cx = classNames.bind(styles)

const NoJobPost = ({ text }: { text: string }) => {
  return (
    <div className={cx("no-job-post", "padding-horizontal padding-v-7")}>
      <div className={cx("background")}></div>
      <div className={cx("inner", "mx-auto max-width-5")}>
        <div className={cx("content")}><div className="body-copy" dangerouslySetInnerHTML={{ __html: text }}></div></div>
      </div>
    </div>
  )
}

export default NoJobPost
