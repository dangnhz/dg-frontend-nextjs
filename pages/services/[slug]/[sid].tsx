import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { fetchAllServices, fetchServiceItem } from '@lib/api/services.service'
import ServiceDetail from '@components/ui/ServiceDetail'

const SubService = ({ data }: { data: any }) => {
  return <ServiceDetail data={data} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAllServices()

  const services = data?.services

  const paths = services.reduce((acc: any, current: any) => {
    const slug = current.alias
    const serviceItemsPaths = current.serviceItems
      ?.filter((item: any) => item.link != null)
      .map((item: any) => ({ params: { slug, sid: item.link.alias } }))
    return [...acc, ...serviceItemsPaths]
  }, [])

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug
  const sid = context.params?.sid

  try {
    if (!slug || !sid)
      return {
        notFound: true,
      }
    const data = await fetchServiceItem(slug, sid)

    return {
      props: {
        data,
        revalidate: 60*2,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default SubService
