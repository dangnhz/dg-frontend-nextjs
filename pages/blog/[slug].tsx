import React, { useEffect } from 'react'
import PostDetail from '@components/ui/PostDetail'
import { GetStaticPaths, GetStaticProps } from 'next'
import { fetchBlogPost, fetchAllBlogPosts } from '@lib/api/blog.service'
import { useUI } from '@context/UIContext'
import { orangeCloud } from '@lib/cloud-images'
import { OrangeDetailCloud } from '@lib/detail-page-clouds'

const BlogDetail = ({ post }: { post: any }) => {
  const { setCurrentTheme } = useUI()

  useEffect(() => {
    setCurrentTheme('orange')
  }, [setCurrentTheme])
  return <PostDetail post={post} cloudBackground={OrangeDetailCloud} blobCloud={orangeCloud} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  let allPosts: Array<any> = []

  const res = await fetchAllBlogPosts(0, '0')

  const totalPages = res?.pager?.total_pages

  for (let page = 0; page < totalPages; page++) {
    const res = await fetchAllBlogPosts(page, '0')
    allPosts = [...allPosts, ...res.posts]
  }

  const paths = allPosts.map((item: any) => ({ params: { slug: item.alias } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug

  try {
    if (!slug)
      return {
        notFound: true,
      }
    const post = await fetchBlogPost(slug)

    return {
      props: {
        post,
        revalidate: 60*2,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default BlogDetail
