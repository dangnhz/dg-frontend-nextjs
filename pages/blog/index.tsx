import React, { useState, useEffect } from 'react'
import SEO from '@components/common/SEO'
import PageHeader from '@components/ui/PageHeader'
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query'
import { fetchAllBlogPosts } from '@lib/api/blog.service'
import { useUI } from '@context/UIContext'
import PostListing from '@components/ui/PostListing/PostListing'
import Filter from '@components/ui/Filter'
import PreFooter from '@components/common/PreFooter'
import AnimationFadeInUp from '@components/common/AnimationFadeInUp'

const QUERY_KEY = 'fetchAllBlogPosts'
const INITIAL_TERM = { id: '0', text: 'All' }

const Blog: React.FC = () => {
  const [filterTerm, setFilterTerm] = useState(INITIAL_TERM)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    [QUERY_KEY, filterTerm.id],
    ({ pageParam = 0 }) => fetchAllBlogPosts(pageParam, filterTerm.id),
    {
      getNextPageParam: (lastPage) => {
        if (parseInt(lastPage.pager.current_page) < parseInt(lastPage.pager.total_pages) - 1)
          return parseInt(lastPage.pager.current_page) + 1
        return
      },
      keepPreviousData: true,
      staleTime: 1000 * 60 * 2,
    }
  )

  const { setCurrentTheme } = useUI()

  const header = data?.pages[0].header
  const meta = data?.pages[0].meta
  const filterTerms = data?.pages[0].categories

  const posts = data?.pages.reduce((acc: any, current: any) => {
    return [...acc, ...current.posts]
  }, [])

  useEffect(() => {
    setCurrentTheme('orange')
  }, [setCurrentTheme])

  return (
    <>
      <SEO
        title={meta?.tags?.title}
        description={meta?.tags.description}
        openGraph={{
          type: 'website',
          title: meta?.tags?.title,
          description: meta?.tags?.description || undefined,
        }}
      />

      <PageHeader
        title={header?.title}
        subtitle={header?.shortDescription}
        description={header?.intro}
        animationType={header?.animation_type}
      />
      <AnimationFadeInUp y={50} animationDelay={2}>
        <Filter filterTerms={filterTerms} filterTerm={filterTerm} setFilterTerm={setFilterTerm} />
        {posts?.length > 0 && (
          <PostListing
            posts={posts}
            link="blog"
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </AnimationFadeInUp>

      <PreFooter />
    </>
  )
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient()

  const filterTerm = INITIAL_TERM

  await queryClient.prefetchInfiniteQuery([QUERY_KEY, filterTerm.id], () => fetchAllBlogPosts(0, '0'))

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

export default Blog
