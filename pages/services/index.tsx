import React, { useEffect } from 'react'
import { useUI } from '@context/UIContext'
import SEO from '@components/common/SEO'
import PageHeader from '@components/ui/PageHeader'
import { dehydrate, QueryClient, useQuery} from 'react-query'
import {fetchAllServices} from '@lib/api/services.service'
import PreFooter from '@components/common/PreFooter'
import HowWeDo from '@components/ui/HowWeDo'
import AnimationFadeInUp from '@components/common/AnimationFadeInUp'
import ServicesListing from '@components/ui/ServicesListing'

const QUERY_KEY = 'fetchAllServices'



const Services= () => {

  const { setCurrentTheme } = useUI()
  const { data } = useQuery(QUERY_KEY, fetchAllServices, {
    staleTime: 1000 * 60 * 2,
  })

  const header = data?.header
  const meta = data?.meta
  const footer = data?.footer
  const services = data?.services

  useEffect(() => {
    setCurrentTheme('blue')
  }, [setCurrentTheme])

  return (
    <div>
       <SEO title={meta?.tags.title} description={meta?.tags.description} />

      <PageHeader
        title={header?.title}
        subtitle={header?.shortDescription}
        description={header?.intro}
        animationType={header?.animation_type}
      />

 <AnimationFadeInUp animationDelay={1.5}>
              {services && <ServicesListing services={services} />}
              {footer && <HowWeDo data={footer} />}
            </AnimationFadeInUp>

     
       <PreFooter />
    </div>
  )
}


export const getStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(QUERY_KEY, fetchAllServices)

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}


export default Services