import SEO from '@components/common/SEO'
import PageHeader from '@components/ui/PageHeader'
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query'
import { fetchAllPosts } from '@lib/api/career.service'
import { useUI } from '@context/UIContext'
import React, { useEffect } from 'react'
import PostListing from '@components/ui/PostListing/PostListing'
import AnimationFadeInUp from '@components/common/AnimationFadeInUp'
import NoJobPost from '@components/careers/NoJobPost'
import OurValues from '@components/ui/OurValues'

import dynamic from 'next/dynamic'

const PreFooter = dynamic(() => import('@components/common/PreFooter'))

const QUERY_KEY = 'fetchAllPosts'

const Careers: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    QUERY_KEY,
    ({ pageParam = 0 }) => fetchAllPosts(pageParam),
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
  const empty = data?.pages[0].empty

  const posts = data?.pages.reduce((acc: any, current: any) => {
    return [...acc, ...current.jobs]
  }, [])

  const jobPosts = posts.map(
    (post: { id: string; alias: string; title: string; category: any; close_date: string; intro: string }) => ({
      id: post.id,
      alias: post.alias,
      title: post.title,
      category: {
        text: post.category,
      },
      date: post.close_date,
      shortDescription: post.intro,
    })
  )

  useEffect(() => {
    setCurrentTheme('red')
  }, [setCurrentTheme])

  return (
    <>
      <SEO
        title={meta?.tags?.title}
        description={meta?.tags?.description}
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
        animationType="type6"
      />
      <AnimationFadeInUp y={50} animationDelay={2}>
        {jobPosts?.length > 0 && (
          <PostListing
            posts={jobPosts}
            link="careers"
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}

        {jobPosts?.length === 0 && empty && <NoJobPost text={empty.text} />}

        {header?.colored_items && <OurValues data={header.colored_items} />}
      </AnimationFadeInUp>

      <PreFooter />
    </>
  )
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery(QUERY_KEY, () => fetchAllPosts(0))

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

export default Careers
