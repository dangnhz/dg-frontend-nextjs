import SEO from '@components/common/SEO'
import PageHeader from '@components/ui/PageHeader'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { fetchContactInfo } from '@lib/api/contact.service'
import { useUI } from '@context/UIContext'
import React, { useEffect } from 'react'
import AnimationFadeInUp from '@components/common/AnimationFadeInUp'
import ContactInfo from '@components/ui/ContactInfo'
import dynamic from 'next/dynamic'

const PreFooter = dynamic(() => import('@components/common/PreFooter'))

const QUERY_KEY = 'fetchContactInfo'

const Contact: React.FC = () => {
  const { data } = useQuery(QUERY_KEY, fetchContactInfo, {
    staleTime: 1000 * 60 * 2,
  })

  const { setCurrentTheme } = useUI()

  const meta = data?.meta

  useEffect(() => {
    setCurrentTheme('lime')
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
        title={data?.title}
        subtitle={data?.shortDescription}
        description={data?.intro}
        animationType={data?.animation_type}
      />
      <AnimationFadeInUp y={50} animationDelay={2}>
        <ContactInfo addresses={data?.adresses} />
      </AnimationFadeInUp>

      <PreFooter showContactForm />
    </>
  )
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(QUERY_KEY, fetchContactInfo)

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

export default Contact
