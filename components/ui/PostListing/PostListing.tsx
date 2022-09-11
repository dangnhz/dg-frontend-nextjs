import React from 'react'
import Post from './Post'
import { PostType } from 'types'
import classNames from 'classnames/bind'
import styles from './PostListing.module.scss'
import { InfiniteQueryObserverResult } from 'react-query'
import { BeatLoader } from 'react-spinners'
import { useUI } from 'context/UIContext';


const cx = classNames.bind(styles)

interface Props {
  posts: Array<PostType>
  link: string
  hasNextPage?: boolean
  fetchNextPage?: () => Promise<InfiniteQueryObserverResult<any, unknown>>
  isFetchingNextPage?: boolean
}

const PostListing: React.FC<Props> = ({ posts, link, hasNextPage, fetchNextPage, isFetchingNextPage }) => {
    const {theme} = useUI()
  return (
    <div className={cx('post-listing', 'padding-horizontal margin-t-2 margin-b-10 padding-t-7')}>
      <div className={cx('background')}></div>
      <div className={cx('wrapper', 'mx-auto max-width-5')}>
        <div className={cx('items')}>
          {posts?.length > 0 ? (
            posts.map((post) => <Post key={post.id} post={post} link={link} type="blog" />)
          ) : (
            <h6 className="padding-b-10 padding-h-5">No post found.</h6>
          )}
        </div>
        {hasNextPage && fetchNextPage && (
          <div className={cx('load-more', 'padding-b-10')}>
            {!isFetchingNextPage && <button onClick={() => fetchNextPage()}>Load more</button>}
            {isFetchingNextPage && <BeatLoader color={theme.primaryColor} size={8} margin={3} />}
          </div>
        )}
      </div>
    </div>
  )
}

export default PostListing
