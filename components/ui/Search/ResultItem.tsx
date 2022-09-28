import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from '@components/ui/Search/ResultItem.module.scss'
import Link from 'next/link'
const cx = classNames.bind(styles)

/**
 * 
 * @content_type
 * team_member
 * webform
 * service
 * client
 * blog_post
 * project
 * landing_page


 */

const ResultItem = ({ data }: any) => {
  const { id, title, type, snippet, alias } = data
  const [path, setPath] = useState('/')
  const [contentType, setContentType] = useState('')

  useEffect(() => {
    if (type) {
      switch (type) {
        case 'blog_post':
          setPath(`/blog${alias ? alias : '/' + id}`)
          setContentType('Blog')
          break
        case 'project':
          setPath(`/work${alias ? alias : '/' + id}`)
          setContentType('Project')
          break
        case 'service':
          setPath(`/services${alias ? alias : '/' + id}`)
          setContentType('Service')
          break
        case 'service_item':
          setPath(`/services${alias ? alias : '/' + id}`)
          setContentType('Service')
          break
        case 'job_post':
          setPath(`/careers${alias ? alias : '/' + id}`)
          setContentType('Jobs')
          break
        case 'team_member':
          setPath(`/about${alias ? alias : '/' + id}`)
          setContentType('Our team')
          break
        case 'basic_page':
          setPath(alias)
          setContentType('Page')
          break
        default:
      }
    }
  }, [type, id, title, alias])
  return (
    <div className={cx('post', 'padding-horizontal padding-b-7')}>
      <div className={cx('wrapper', 'mx-auto max-width-5')}>
        <div className={cx('left')}>{contentType && <div className={cx('category')}>{contentType}</div>}</div>
        <div className={cx('right')}>
          <Link href={path} passHref prefetch={false}>
            <a className={cx('title')}>
              <h2 className="my-0 h3">{title}</h2>
            </a>
          </Link>
          {snippet['#markup'] && (
            <div className={cx('intro')}>
              <p dangerouslySetInnerHTML={{ __html: snippet['#markup'] }}></p>
            </div>
          )}

          {snippet['#plain_text'] && (
            <div className={cx('intro')}>
              <p dangerouslySetInnerHTML={{ __html: snippet['#plain_text'] }}></p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultItem
