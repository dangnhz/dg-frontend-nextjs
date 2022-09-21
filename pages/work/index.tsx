import React, { useState, useEffect } from 'react'
import SEO from '@components/common/SEO'
import PageHeader from '@components/ui/PageHeader'
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query'
import { fetchAllProjects } from '@lib/api/project.service'
import { useUI } from '@context/UIContext'
import InfiniteScroll from 'react-infinite-scroller'
import Filter from '@components/ui/Filter'
import PreFooter from '@components/common/PreFooter'
import AnimationFadeInUp from '@components/common/AnimationFadeInUp'
import { BeatLoader } from 'react-spinners'
import Grid from '@components/ui/Grid'
import ProjectCard from '@components/ui/ProjectCard'
import { ProjectCardType } from '../../types/project'
import Container from '@components/ui/Container'

const QUERY_KEY = 'fetchAllProjects'
const INITIAL_TERM = { id: '0', text: 'All' }

const Work: React.FC = () => {
  const [filterTerm, setFilterTerm] = useState(INITIAL_TERM)
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QUERY_KEY, filterTerm.id],
    ({ pageParam = 0 }) => fetchAllProjects(pageParam, filterTerm.id),
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

  const { theme, setCurrentTheme } = useUI()

  const header = data?.pages[0].header
  const meta = data?.pages[0].meta
  const filterTerms = data?.pages[0].categories

  const projects = data?.pages.reduce((acc: any, current: any) => {
    return [...acc, ...current.projects]
  }, [])

  useEffect(() => {
    setCurrentTheme('pink')
  }, [setCurrentTheme])

  return (
    <>
      <SEO
        title={meta?.tags.title}
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

        <Container padding="padding-horizontal" margin="margin-t-3 margin-b-10" maxWidth="max-width-6">
          <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage || false}
            loader={
              <div key={0} className="mx-auto margin-t-2" style={{ width: 'fit-content' }}>
                <BeatLoader color={theme.primaryColor} size={8} margin={3} />
              </div>
            }
          >
            <Grid>
              {projects?.length > 0 &&
                projects.map((item: ProjectCardType) => (
                  <ProjectCard key={item.id} data={item} hoverColor={theme.primaryColor} />
                ))}
            </Grid>
          </InfiniteScroll>
        </Container>
      </AnimationFadeInUp>

      <PreFooter />
    </>
  )
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient()

  const filterTerm = INITIAL_TERM

  await queryClient.prefetchInfiniteQuery([QUERY_KEY, filterTerm.id], () => fetchAllProjects(0, '0'))

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

export default Work
