import React, { useEffect } from 'react'
import { fetchAllTeamMembers } from '@lib/api/about.service'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { useUI } from '@context/UIContext'
import PageHeader from '@components/ui/PageHeader'
import SEO from '@components/common/SEO'
import PreFooter from '@components/common/PreFooter'
import OurValues from '@components/ui/OurValues'
import Testimonial from '@components/ui/Testimonial'
import AboutListing from '@components/ui/AboutListing'
import {PersonCardType} from 'types/about';

const QUERY_KEY = 'fetchAllTeamMembers'

const About = () => {
  const { data } = useQuery(QUERY_KEY, fetchAllTeamMembers, {
    staleTime: 1000 * 60 * 2,
  })

  const { setCurrentTheme } = useUI()

  const header = data?.header
  const meta = data?.meta

  const formattedTeamData = data?.team.map((member: PersonCardType) => ({
    id: member.id,
    alias: member.alias,
    name: member.name,
    role: member.role,
    image: member.image,
  }));

  useEffect(() => {
    setCurrentTheme('purple')
  }, [setCurrentTheme])

  return (
    <>
      <SEO title={meta?.tags.title} description={meta?.tags.description} />

      <PageHeader
        title={header?.title}
        subtitle={header?.shortDescription}
        description={header?.intro}
        animationType={header?.animation_type}
      />

      <AboutListing intro={header.body} teamData={formattedTeamData}/>
      {header.colored_items && <OurValues data={header.colored_items} />}
      {header.testimonial && <Testimonial testimonial={header.testimonial} />}

      <PreFooter />
    </>
  )
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(QUERY_KEY, fetchAllTeamMembers)

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}
export default About
