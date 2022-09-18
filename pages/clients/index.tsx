import SEO from '@components/common/SEO'
import PageHeader from '@components/ui/PageHeader'
import { dehydrate, QueryClient, useQuery} from 'react-query'
import { fetchAllClients } from '@lib/api/clients.service'
import { useUI } from '@context/UIContext'
import React, { useEffect } from 'react'
import PreFooter from '@components/common/PreFooter'
import AnimationFadeInUp from '@components/common/AnimationFadeInUp'
import ClientListing from '@components/ui/ClientListing'

const QUERY_KEY = 'fetchAllClients'

const Clients: React.FC = () => {
  const { data } = useQuery(QUERY_KEY, fetchAllClients, {
    staleTime: 1000 * 60 * 2,
  })

  const { setCurrentTheme } = useUI()

  const header = data?.header
  const meta = data?.meta

  useEffect(() => {
    setCurrentTheme('green')
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
      <AnimationFadeInUp y={50} animationDelay={2}>
        <div className="clients-listing margin-horizontal padding-b-10">
          <div className="container max-width-5">
            <ClientListing clients={data.clients}/>
          </div>
        </div>
      </AnimationFadeInUp>

      <PreFooter />
    </>
  )
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(QUERY_KEY, fetchAllClients)

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

export default Clients
