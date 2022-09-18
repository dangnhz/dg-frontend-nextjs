import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { fetchAllServices, fetchService } from '@lib/api/services.service'
import ServiceDetail from '@components/ui/ServiceDetail'

const Service = ({ data }: { data: any }) => {
  return <ServiceDetail data={data} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAllServices()

  const paths = data.services.map((item: any) => ({ params: { slug: item.alias } }))

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
    const data = await fetchService(slug)

    return {
      props: {
        data,
        revalidate: 60,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default Service
