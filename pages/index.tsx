import type { NextPage } from 'next'
import SEO from '@components/common/SEO'
import { fetchHomepageData } from '@lib/api/homepage.service'
import PreFooter from '@components/common/PreFooter'
import Hero from '@components/home/Hero'
import ProjectListing from '@components/home/ProjectListing/ProjectListing'
import WhatWeDo from '@components/home/WhatWeDo/WhatWeDo'
import HomePanels from '@components/home/HomePanels'
import HomeClients from '@components/home/HomeClients/HomeClients'
import { useUI } from 'context/UIContext';
import { useEffect } from 'react'
import AnimationFadeInUp from '@components/common/AnimationFadeInUp'

interface Props {
  [key:string]: any
}

const Home: NextPage<Props> = ({ data }) => {

  const {setCurrentTheme} = useUI()

  useEffect(() => {setCurrentTheme('green')}, [setCurrentTheme])

  return (
    <>
      <SEO
        title={data?.meta?.tags?.title}
        description={data?.meta?.tags?.description}
      />

      <Hero banner={data?.banner} />
      <AnimationFadeInUp >
        <ProjectListing
          title="Who we are"
          subtitle={data?.our_work?.title}
          intro={data?.banner?.body}
          projects={data?.our_work?.projects}
        />
        <WhatWeDo title={data?.services_summary?.title} tiles={data?.services_summary?.tiles} backgroundColor="white" />
        <HomePanels data={data?.call_to_action} />
        <HomeClients title={data?.clients?.title} cards={data?.clients?.cards} link={data?.clients?.link} />
      </AnimationFadeInUp>

      <PreFooter />
    </>
  )
}

export const getStaticProps = async () => {
  const data = await fetchHomepageData()

  return {
    props: {
      data,
    },
    revalidate: 60,
  }
}

export default Home
